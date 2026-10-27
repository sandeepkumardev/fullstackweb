from fastapi import APIRouter

from app.handlers.auth import register_college

router = APIRouter(prefix="/auth")

router.post("/register-college")(register_college)