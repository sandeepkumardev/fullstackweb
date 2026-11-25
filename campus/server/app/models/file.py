import uuid
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, String

from app.models.base import Base

class File(Base):
  __tablename__ = "files"

  id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
  public_id: Mapped[str] = mapped_column(String, nullable=False)
  resource_type: Mapped[str] = mapped_column(String, nullable=False)
  url: Mapped[str] = mapped_column(String, nullable=False)