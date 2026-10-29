from fastapi import Form, HTTPException
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from slugify import slugify
from pwdlib import PasswordHash
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from app.schemas.auth import RegisterCollege
from app.dependencies.get_db import DbSession
from app.models.college import College
from app.models.user import User
from app.utils.constraints import UNIQUE_CONSTRAINTS

password_hash = PasswordHash.recommended()

def register_college(
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
    RegisterCollege.model_validate({
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

  except ValidationError as exc:
    raise RequestValidationError(errors=exc.errors())

  except IntegrityError as exc:
    diagnostic = getattr(exc.orig, "diag", None)
    constraint_name = getattr(diagnostic, "constraint_name", None)

    message = UNIQUE_CONSTRAINTS.get(constraint_name, "Database Error!")

    raise HTTPException(
      status_code=409,
      detail=message
    )

  except SQLAlchemyError as exc:
    raise HTTPException(
      status_code=500,
      detail="Database operation failed!"
    )

  except Exception as exc:
    print(exc)
    raise HTTPException(
      status_code=500,
      detail="Something went wrong!"
    )
