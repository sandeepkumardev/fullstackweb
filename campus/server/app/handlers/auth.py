from fastapi import Form, HTTPException, UploadFile, Depends
from fastapi.responses import JSONResponse
from slugify import slugify
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import load_only, joinedload
from typing import Annotated

from app.schemas.auth import RegisterCollegeSchema, SignInSchema
from app.dependencies.get_db import DbSession
from app.models.college import College
from app.models.user import User
from app.models.file import File
from app.models.enums import UserRole
from app.utils.exceptions import handle_exception
from app.utils.jwt import generate_token
from app.dependencies.user import get_current_user
from app.utils.file import validate_file, upload_file, delete_file

password_hash = PasswordHash.recommended()

async def register_college_handler(
    db: DbSession,
    form: Annotated[RegisterCollegeSchema, Form()],
    collegeLogo: UploadFile,
    collegeIDProof: UploadFile
):
  try:
    if form.password != form.confirmPassword:
      raise HTTPException(
        status_code=400,
        detail="Password do not match!"
      )

    slug = slugify(form.collegeName)
  
    # validate file
    logo = await validate_file(collegeLogo, "College Logo")
    idProof = await validate_file(collegeIDProof, "College ID Proof")

    # upload file
    logoRes = await upload_file(logo["content"], f"campus/college_docs/{slug}")
    idProofRes = await upload_file(idProof["content"], f"campus/college_docs/{slug}")

    # save in db
    logoFile = File(
      public_id=logoRes["public_id"],
      resource_type=logoRes["resource_type"],
      url=logoRes["secure_url"]
    )

    idProofFile = File(
      public_id=idProofRes["public_id"],
      resource_type=idProofRes["resource_type"],
      url=idProofRes["secure_url"]
    )

    db.add_all([logoFile, idProofFile])
    db.flush()

    college = College(
      name=form.collegeName,
      slug=slug,
      email=form.collegeEmail,
      website=str(form.website),
      phone=form.phone,
      address=form.address,
      city=form.city,
      state=form.state,
      ownerName=form.ownerName,
      ownerEmail=form.ownerEmail,
      logo_file_id=logoFile.id,
      id_proof_file_id=idProofFile.id
    )

    db.add(college)
    db.flush()

    passwordHash = password_hash.hash(form.password)

    user = User(
      name=form.ownerName,
      email=form.ownerEmail,
      password_hash=passwordHash,
      college_id=college.id
    )

    db.add(user)
    db.commit()

    return { "success": True, "message": "College register successfully!"}

  except Exception as exc:
    await delete_file(logoRes["public_id"], logoRes["resource_type"])
    await delete_file(idProofRes["public_id"], idProofRes["resource_type"])
    
    db.rollback()
    handle_exception(exc)

def signin_handler(db: DbSession, body: SignInSchema):
  try:
    user = db.scalar(select(User).where(User.email == body.email))

    if not user:
      raise HTTPException(
        status_code=401,
        detail="Invalid email!"
      )

    if not password_hash.verify(body.password, user.password_hash):
      raise HTTPException(
        status_code=401,
        detail="Invalid password!"
      )

    access_token = generate_token({
      "sub": str(user.id),
      "college_id": str(user.college_id)
    })

    return JSONResponse({
      "success": True,
      "message": "Singged in successfully",
      "data": {
        "access_token": access_token,
        "token_type": "bearer"
      }
    })
  except Exception as exc:
    handle_exception(exc)

def me(db: DbSession, user: User = Depends(get_current_user)):
  college = db.scalar(select(College)
                      .options(
                        load_only(College.name),
                        joinedload(College.logo_file).load_only(File.url)
                      )
                      .where(College.id == User.college_id)
                    )

  return {
    "success": True,
    "data": {
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "is_active": user.is_active,
      "avatar": user.avatar,
      "college": college
    }
  }
