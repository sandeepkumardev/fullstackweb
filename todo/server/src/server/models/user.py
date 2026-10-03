from sqlmodel import SQLModel, Field
import uuid

class User(SQLModel, table=True):
  id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
  name: str
  email: str = Field(unique=True)
  password: str

class UserRegister(SQLModel):
  name: str
  email: str
  password: str
  confirm_password: str

class UserLogIn(SQLModel):
  email: str
  password: str