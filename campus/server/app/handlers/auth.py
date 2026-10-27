from fastapi import Form
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError

from app.schemas.auth import RegisterCollege

def register_college(
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

    return { "message": "College register successfully!"}

  except ValidationError as exc:
    raise RequestValidationError(errors=exc.errors())

  except Exception as exc:
    print("Error")