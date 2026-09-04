from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core.database import Base

if TYPE_CHECKING:
    from .notification import Notification


class Products(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    color: Mapped[str] = mapped_column(String(100), default="")
    option: Mapped[str] = mapped_column(String(100), default="")
    image: Mapped[str] = mapped_column(String(500), default="")

    purchases: Mapped[list["Notification"]] = relationship(back_populates="product")
