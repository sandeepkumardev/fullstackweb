import uvicorn
import logging
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from app.routes.base import router
from app.utils.exceptions import request_validation_handler, http_exception_handler, unexpected_exception_handeler

logging.basicConfig(
  filename="exceptions.log"
)

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_methods=["*"],
  allow_headers=["*"]
)

app.add_exception_handler(
  RequestValidationError,
  request_validation_handler
)

app.add_exception_handler(
  HTTPException,
  http_exception_handler
)

app.add_exception_handler(
  Exception,
  unexpected_exception_handeler
)

@app.get("/")
def root():
  return {"message": "Server is up!"}

app.include_router(router)

def start():
  uvicorn.run("app.main:app", port=5000, reload=True)