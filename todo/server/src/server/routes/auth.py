from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from server.models.user import UserRegister, User, UserLogIn
from server.database.base import get_db
import uuid
from pwdlib import PasswordHash
from server.services.jwt import generate_token

router = APIRouter()
password_hash = PasswordHash.recommended()

@router.post("/login")
def login(body: UserLogIn, db: Session = Depends(get_db)):
  try:
     user = db.exec(select(User).where(User.email == body.email)).first()

     if user is None:
        return {"success": False, "message": "User not found!"}

     if not password_hash.verify(body.password, user.password):
        return {"success": False, "message": "Incorrect password!"}

     token = generate_token(user.id)

     if token is None:
        return {"success": False, "message": "Something went wrong!"}

     return {"success": True, "message": "User logged in successfully!", "access_token": token}
  except Exception as e:
     return {"success": False, "message": str(e)}

@router.post("/register")
def register(body: UserRegister, db: Session = Depends(get_db)):
   try:
      if body.password != body.confirm_password:
         return {"success": False, "message": "Passwords do not match!"}

      user = db.exec(select(User).where(User.email == body.email)).first()

      if user is not None:
         return {"success": False, "message": "User already exists!"}

      newUser = User(
         id = uuid.uuid4(),
         name = body.name,
         email = body.email,
         password = password_hash.hash(body.password)
      )

      db.add(newUser)
      db.commit()
      
      return {"success": True, "message": "User registered successfully!"}
   except Exception as e:
      return {"success": False, "message": str(e)}