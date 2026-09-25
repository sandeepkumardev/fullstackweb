from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from server.database.base import get_db
from server.models.todo import Todo, TodoCreate, TodoUpdate
import uuid

router = APIRouter()

@router.get("/todos")
def get_todos(db: Session = Depends(get_db)):
    try:
        todos = db.exec(select(Todo)).all()
        return {"success": True, "todos": todos}
    except Exception as e:
        return {"success": False, "message": str(e)}
    
@router.post("/todos")
def create_todo(body: TodoCreate, db: Session = Depends(get_db)):
    try:
        newTodo = Todo(
            id = uuid.uuid4(),
            title = body.title
        )
    
        db.add(newTodo)
        db.commit()
        
        return {"success": True, "message": "Todo created successfully!"}
    except Exception as e:
        return {"success": False, "message": str(e)}

@router.put("/todos/{todo_id}")
def update_todo(todo_id: str, body: TodoUpdate, db: Session = Depends(get_db)):
    try:
        todo = db.get(Todo, todo_id)

        if todo is None:
            return {"success": False, "message": "Todo not found!"}

        if body.title is not None:
            todo.title = body.title

        if body.completed is not None:
            todo.completed = body.completed

        db.commit()
        
        return {"success": True, "message": "Todo updated successfully!"}
    except Exception as e:
        return {"success": False, "message": str(e)}


@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: str, db: Session = Depends(get_db)):
    try:
        todo = db.get(Todo, todo_id)

        if todo is None:
            return {"success": False, "message": "Todo not found!"}

        db.delete(todo)
        db.commit()
        
        return {"success": True, "message": "Todo deleted successfully!"}
    except Exception as e:
        return {"success": False, "message": str(e)}
