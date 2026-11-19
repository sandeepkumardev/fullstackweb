import jwt
import logging
from fastapi import HTTPException
from datetime import datetime, timezone, timedelta

from app.config.settings import settings

logger = logging.getLogger(__name__)

ALGORITHM = "HS256"

def generate_token(data: dict):
  payload = data.copy()

  now = datetime.now(timezone.utc)

  payload.update({
    "iat": now,
    "exp": now + timedelta(days=30)
  })

  token = jwt.encode(payload, settings.SECRET_KEY, ALGORITHM)

  return token

def verify_token(token: str):
  try:
    payload = jwt.decode(token, settings.SECRET_KEY, [ALGORITHM])

    return payload

  except jwt.ExpiredSignatureError:
    raise HTTPException(
      status_code=401,
      detail="Session expired! Please login again."
    )

  except jwt.InvalidTokenError:
    raise HTTPException(
      status_code=401,
      detail="Invalid token!"
    )

  except Exception as exc:
    logger.exception(
      "JWT token error - ",
      exc_info=exc
    )

    raise HTTPException(
      status_code=401,
      detail="Invalid authentication token"
    )