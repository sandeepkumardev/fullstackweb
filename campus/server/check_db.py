from sqlalchemy import text
from app.database.engine import engine

with engine.connect() as conn:
    conn.execute(text("SELECT 1"))

print("Database connection successful")