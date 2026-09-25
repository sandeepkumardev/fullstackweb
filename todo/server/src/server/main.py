from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routes.base import router as baseRoutes
from server.routes.auth import router as authRoutes
from server.routes.todo import router as todoRoutes
from sqlmodel import SQLModel
from server.database.base import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
)

@app.on_event("startup")
def create_tables():
  SQLModel.metadata.create_all(engine)

app.include_router(baseRoutes)
app.include_router(authRoutes)
app.include_router(todoRoutes)
