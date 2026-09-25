from sqlmodel import SQLModel, Field

class Todo(SQLModel, table=True):
  id: str = Field(primary_key=True)
  title: str = Field(max_length=100)
  completed: bool = Field(default=False)
  # user_id: str

class TodoCreate(SQLModel):
  title: str

class TodoUpdate(SQLModel):
  title: str | None = None
  completed: bool | None = None