import re
from fastapi import Request
from fastapi.responses import JSONResponse

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

  return JSONResponse({
    "success": False,
    "message": "Validation error",
    "errors": errors
  })

def http_exception_handler(req: Request, exc: Exception):
  return JSONResponse(
    status_code=exc.status_code,
    content={
      "success": False,
      "message": exc.detail,
    }
  )