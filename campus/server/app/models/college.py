import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid, String, DateTime, UniqueConstraint

from app.models.base import Base

if TYPE_CHECKING:
  from app.models.user import User

class College(Base):
  __tablename__ = "colleges"

  __table_args__ = (
    UniqueConstraint("email", name="uq_colleges_email"),
    UniqueConstraint("slug", name="uq_colleges_slug")
  )

  id: Mapped[uuid.UUID] = mapped_column(
    Uuid(as_uuid=True), 
    primary_key=True,
    default=uuid.uuid4
  )
  name: Mapped[str] = mapped_column(
    String(150),
    nullable=False
  )
  slug: Mapped[str] = mapped_column(
    String(150),
    index=True,
    nullable=False
  )

  email: Mapped[str] = mapped_column(
    String(100),
    index=True,
    nullable=False
  )

  website: Mapped[str] = mapped_column(
    String(150),
    nullable=True
  )

  phone: Mapped[str] = mapped_column(
    String(15),
    nullable=True
  )

  address: Mapped[str] = mapped_column(
    String(200),
    nullable=True
  )

  city: Mapped[str] = mapped_column(
    String(30),
    nullable=True
  )

  state: Mapped[str] = mapped_column(
    String(30),
    nullable=True
  )

  ownerName: Mapped[str] = mapped_column(
    String(100),
    nullable=True
  )

  ownerEmail: Mapped[str] = mapped_column(
    String(100),
    nullable=True
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

  users: Mapped[list["User"]] = relationship("User", back_populates="college")
