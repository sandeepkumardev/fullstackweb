from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# import uvicorn

app = FastAPI()

# def main():
#   uvicorn.run("server101.main:app", reload=True)

users = [
  {"id": 1, "name": "John"},
  {"id": 2, "name": "Jane"},
  {"id": 3, "name": "Doe"},
  {"id": 4, "name": "John"},
  {"id": 5, "name": "Jane"},
]

@app.get("/")
def home():
  return {"message": "Hello Python FastAPI"}

@app.get("/users")
def get_users(page: int = 1, limit: int = 2):
  start = (page - 1) * limit
  end = start + limit

  data = users[start:end]

  if len(data) == 0:
    return {"message": "No users found"}
  
  return {"users": data}

@app.get("/users/{id}")
def get_user(id: int):
  filtered_users = list(filter(lambda u: u["id"] == id , users))

  if len(filtered_users) == 0:
    raise HTTPException(status_code=404, detail="User not found")

  return {"user": filtered_users[0]}

class CreateUserBody(BaseModel):
  name: str
  age: int

@app.post("/users")
def create_user(newUser: CreateUserBody):
  users.append(newUser)
  return {"message": "User created successfully"}