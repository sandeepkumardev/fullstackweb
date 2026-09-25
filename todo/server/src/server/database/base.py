from sqlmodel import Session, create_engine

DATABASE_URL = "postgresql+psycopg://neondb_owner:npg_GErvQn5lVw0e@ep-young-bird-b4cnk62g-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

engine = create_engine(DATABASE_URL, echo=False)
session = Session(engine)

def get_db():
  with Session(engine) as session:
    yield session


