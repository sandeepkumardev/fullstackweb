from pydantic import ValidationError
from sqlalchemy.orm import Session
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from app.utils.constraints import UNIQUE_CONSTRAINTS
from fastapi import HTTPException

def handle_exception(exc: Exception, db: Session):
  db.rollback()

  if isinstance(exc, ValidationError):
    raise RequestValidationError(errors=exc.errors())

  if isinstance(exc, IntegrityError):
    diagnostic = getattr(exc.orig, "diag", None)
    constraint_name = getattr(diagnostic, "constraint_name", None)

    message = UNIQUE_CONSTRAINTS.get(constraint_name, "Database Error!")

    raise HTTPException(
      status_code=409,
      detail=message
    )

  if isinstance(exc, SQLAlchemyError):
    raise HTTPException(
      status_code=500,
      detail="Database operation failed!"
    )

  print(exc)
  raise HTTPException(
    status_code=500,
    detail="Something went wrong!"
  )