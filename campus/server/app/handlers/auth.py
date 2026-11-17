from fastapi import Form, HTTPException, Request
from slugify import slugify
from pwdlib import PasswordHash

from app.schemas.auth import RegisterCollegeSchema, SignInSchema
from app.dependencies.get_db import DbSession
from app.models.college import College
from app.models.user import User
from app.utils.exceptions import handle_exception

password_hash = PasswordHash.recommended()

def register_college_handler(
    db: DbSession,
    collegeName: str = Form(),
    collegeEmail: str = Form(),
    website: str = Form(),
    phone: str = Form(),
    address: str = Form(),
    city: str = Form(),
    state: str = Form(),
    ownerName: str = Form(),
    ownerEmail: str = Form(),
    password: str = Form(),
    confirmPassword: str = Form(),
):
  try:
    RegisterCollegeSchema.model_validate({
      "collegeName": collegeName,
      "collegeEmail": collegeEmail,
      "website": website,
      "phone": phone,
      "address": address,
      "city": city,
      "state": state,
      "ownerName": ownerName,
      "ownerEmail": ownerEmail,
      "password": password,
      "confirmPassword": confirmPassword
    })

    if password != confirmPassword:
      raise HTTPException(
        status_code=400,
        detail="Password do not match!"
      )

    slug = slugify(collegeName)
    passwordHash = password_hash.hash(password)

    college = College(
      name=collegeName,
      slug=slug,
      email=collegeEmail,
      website=website,
      phone=phone,
      address=address,
      city=city,
      state=state,
      ownerName=ownerName,
      ownerEmail=ownerEmail
    )

    db.add(college)
    db.flush()

    user = User(
      name=ownerName,
      email=ownerEmail,
      password_hash=passwordHash,
      college_id=college.id
    )

    db.add(user)
    db.commit()

    return { "message": "College register successfully!"}

  except Exception as exc:
    db.rollback()
    handle_exception(exc)

async def signin_handler(db: DbSession, body: SignInSchema):
  try:
    # find email in db
    # if user found-> match password
    # if match -> reutrn success

    return {"message": "Signin successfully!"}
  except Exception as exc:
    handle_exception(exc)