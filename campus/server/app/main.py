import uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.routes.base import router
from app.utils.exceptions import request_validation_handler

app = FastAPI()

app.add_exception_handler(
  RequestValidationError,
  request_validation_handler
)

@app.get("/")
def root():
  return {"message": "Server is up!"}

app.include_router(router)

def start():
  uvicorn.run("app.main:app", port=5000, reload=True)