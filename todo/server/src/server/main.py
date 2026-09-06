from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

todos = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
)

@app.get("/")
def home():
    return {"message": "Welcome to the Todo API!"}

@app.get("/todos")
def get_todos():
    return todos

@app.post("/todos")
def create_todo(body: dict):
    if body.get("title") is None:
        return {"success": False, "message": "Title is required!"}

    newTodo = {
        "id": body.get("id", len(todos) + 1),
        "title": body.get("title", ""),
        "completed": body.get("completed", False)
    }
    todos.append(newTodo)
    return {"success": True, "message": "Todo created successfully!", "todo": newTodo}

@app.put("/todos/{todo_id}")
def update_todo(todo_id: str, body: dict):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["title"] = body.get("title", todo["title"])
            todo["completed"] = body.get("completed", todo["completed"])

    return {"success": True, "message": "Todo updated successfully!"}

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: str):
    for todo in todos:
        if todo["id"] == todo_id:
            todos.remove(todo)
            return {"success": True, "message": "Todo deleted successfully!"}
    return {"success": False, "message": "Todo not found!"}

