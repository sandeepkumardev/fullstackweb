import re
import logging
from fastapi import Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from app.utils.constraints import UNIQUE_CONSTRAINTS
from fastapi import HTTPException

logger = logging.getLogger(__name__)

def to_title_case(text):
    return re.sub(r'([a-z])([A-Z])', r'\1 \2', text).title()

def request_validation_handler(request: Request, exc: Exception):
  errors = {}

  for err in exc.errors():
    error_type = err['type']
    field = err["loc"][-1]

    title_field = to_title_case(field)

    if error_type == "missing":
      message = f"{title_field} is required!"
    elif error_type == "string_too_short":
      message = f"{title_field} is too short!"
    elif error_type == "string_too_long":
         message = f"{title_field} is too long!"
    elif error_type == "value_error":
      message = err["msg"].replace("Value error, ", "")
    else:
      message = err.get("msg", "invalid value")

    errors[field] = message

  return JSONResponse(
    status_code=422,
    content={
      "success": False,
      "message": "Validation error",
      "errors": errors
    }
  )

def http_exception_handler(req: Request, exc: Exception):
  return JSONResponse(
    status_code=exc.status_code,
    content={
      "success": False,
      "message": exc.detail,
    }
  )

def unexpected_exception_handeler(req: Request, exc: Exception):
  logger.exception(
    f"Unexpected exception on {req.method} {req.url.path}",
    exc_info=exc
  )

  return JSONResponse(
    status_code=500,
    content={
      "success": False,
      "message": "Something went wrong!",
    }
  )

def handle_exception(exc: Exception):
  if isinstance(exc, HTTPException):
    raise exc
  
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

  raise exc