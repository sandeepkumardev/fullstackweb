import jwt
from datetime import datetime, timedelta, timezone

secret_key = "glijsj9tuy9hrg9rh"
alg = "HS256"

def generate_token(user_id):
    payload = {
        "sub": user_id,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(days=1),
    }

    token = jwt.encode(payload, secret_key, algorithm=alg)

    return token

def verify_token(token):
    payload = jwt.decode(token, secret_key, algorithms=[alg])
    return payload
