from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from server.models.user import UserRegister, User, UserLogIn
from server.database.base import get_db
import uuid

router = APIRouter()

@router.post("/login")
def login(body: UserLogIn, db: Session = Depends(get_db)):
  try:
     user = db.exec(select(User).where(User.email == body.email)).first()

     if user is None:
        return {"success": False, "message": "User not found!"}

     if user.password != body.password:
        return {"success": False, "message": "Incorrect password!"}

     # generate token
     # set cookie

     return {"success": True, "message": "User logged in successfully!"}
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
         password = body.password # hash password
      )

      db.add(newUser)
      db.commit()
      
      return {"success": True, "message": "User registered successfully!"}
   except Exception as e:
      return {"success": False, "message": str(e)}