from pydantic import BaseModel, Field, EmailStr, field_validator, HttpUrl

class RegisterCollege(BaseModel):
  collegeName: str = Field(min_length=3, max_length=150)
  collegeEmail: EmailStr
  website: HttpUrl
  phone: str = Field(min_length=10, max_length=15)
  address: str = Field(min_length=5, max_length=100)
  city: str = Field(min_length=3, max_length=50)
  state: str = Field(min_length=2, max_length=50)
  ownerName: str = Field(min_length=3, max_length=100)
  ownerEmail: EmailStr
  password: str = Field(min_length=8, max_length=50)
  confirmPassword: str = Field(min_length=8, max_length=50)

  @field_validator(
      "collegeName",
      "collegeEmail"
  )
  @classmethod
  def remove_whitespace(cls, value):
    value = value.strip()
    if not value:
      raise ValueError("This field is required!")
    return value

  @field_validator(
    "phone"
  )
  @classmethod
  def validate_phone(cls, value):
    if not value.isdigit():
      raise ValueError("Phone number must be a number!")
    return value

  @field_validator(
    "password",
    "confirmPassword"
  )
  @classmethod
  def validate_password(cls, value):
    if not any(char.isdigit() for char in value):
      raise ValueError("Password should contain a number")
    if not any(char.isupper() for char in value):
      raise ValueError("Password should contain a uppercase")
    return value