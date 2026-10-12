import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid, String, DateTime

from app.models.base import Base

if TYPE_CHECKING:
  from app.models.college import College

class User(Base):
  __tablename__ = "users"

  id: Mapped[uuid.UUID] = mapped_column(
    Uuid(as_uuid=True), 
    primary_key=True,
    default=uuid.uuid4
  )
  name: Mapped[str] = mapped_column(
    String(150),
    nullable=False
  )
  email: Mapped[str] = mapped_column(
    String(100),
    unique=True,
    index=True,
    nullable=False
  )
  password_hash: Mapped[str] = mapped_column(
    String,
    nullable=False
  )

  created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    default=lambda: datetime.now(timezone.utc),
    nullable=False
  )

  updated_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    default=lambda: datetime.now(timezone.utc),
    nullable=False
  )

  college_id: Mapped[uuid.UUID] = mapped_column(
    Uuid(as_uuid=True),
    nullable=False
  )
  college: Mapped["College"] = relationship("College", back_populates="users")