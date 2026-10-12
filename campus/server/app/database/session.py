from sqlalchemy.orm import Session, sessionmaker
from app.database.engine import engine

SessionLocal = sessionmaker(
  bind=engine,
  autoflush=False,
  expire_on_commit=False
)
