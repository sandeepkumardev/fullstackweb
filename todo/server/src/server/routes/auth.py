from fastapi import APIRouter
from server.database.base import users

router = APIRouter()

@router.post("/login")
def login():
  pass

@router.post("/register")
def register(body: dict):
    name = body.get("name")
    email = body.get("email")
    password = body.get("password")
    confirm_password = body.get("confirm_password")

    if name is None:
        return  {"success": False, "error": "Name is required!"}

    if email is None:
        return {"success": False, "error": "Email is required!"}

    if password != confirm_password:
        return {"success": False, "error": "Password do not match!"}

    newUser = {
        "name": name,
        "email": email,
        "password": password
    }

    users.append(newUser)

    return {"success": True, "message": "User registered successfully!"}
