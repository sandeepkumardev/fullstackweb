from fastapi import Form, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from slugify import slugify
from pwdlib import PasswordHash
from sqlalchemy import select
from typing import Annotated

from app.schemas.auth import RegisterCollegeSchema, SignInSchema
from app.dependencies.get_db import DbSession
from app.models.college import College
from app.models.user import User
from app.utils.exceptions import handle_exception
from app.utils.jwt import generate_token
from app.dependencies.user import get_current_user

password_hash = PasswordHash.recommended()

def register_college_handler(
    db: DbSession,
    form: Annotated[RegisterCollegeSchema, Form()]
):
  try:
    if form.password != form.confirmPassword:
      raise HTTPException(
        status_code=400,
        detail="Password do not match!"
      )

    slug = slugify(form.collegeName)
    passwordHash = password_hash.hash(form.password)

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
      ownerEmail=form.ownerEmail
    )

    db.add(college)
    db.flush()

    user = User(
      name=form.ownerName,
      email=form.ownerEmail,
      password_hash=passwordHash,
      college_id=college.id
    )

    db.add(user)
    db.commit()

    return { "message": "College register successfully!"}

  except Exception as exc:
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

def me(user: User = Depends(get_current_user)):
  return {
    "id": user.id,
    "name": user.name,
    "email": user.email
  }
