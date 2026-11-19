from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select

from app.dependencies.get_db import DbSession
from app.utils.jwt import verify_token
from app.models.user import User

httpBearer = HTTPBearer()

def get_current_user(db: DbSession, credentials: HTTPAuthorizationCredentials = Depends(httpBearer)):
  token = credentials.credentials

  payload = verify_token(token)
  user_id = payload.get("sub")
  college_id = payload.get("college_id")

  if not user_id or not college_id:
    raise HTTPException(
      status_code=401,
      detail="Invalid token!"
    )

  user = db.scalar(select(User).where(User.id == user_id, User.college_id == college_id))
  if not user:
    raise HTTPException(
      status_code=401,
      detail="Invalid token!"
    )

  return user
