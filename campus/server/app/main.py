from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def root():
  return {"message": "Server is up!"}

def start():
  uvicorn.run("app.main:app", port=5000, reload=True)