from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
  id: str = Field(primary_key=True)
  name: str
  email: str = Field(unique=True)
  password: str

class UserRegister(SQLModel):
  name: str
  email: str
  password: str = Field(min_length=8)
  confirm_password: str

class UserLogIn(SQLModel):
  email: str
  password: str