from fastapi import APIRouter

from app.handlers.auth import register_college_handler, signin_handler, me

router = APIRouter(prefix="/auth")

router.post("/register-college", status_code=201)(register_college_handler)
router.post("/sign-in", status_code=200)(signin_handler)
router.post("/me")(me)