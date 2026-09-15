from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routes.base import router as baseRoutes
from server.routes.auth import router as authRoutes
from server.routes.todo import router as todoRoutes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
)

app.include_router(baseRoutes)
app.include_router(authRoutes)
app.include_router(todoRoutes)
