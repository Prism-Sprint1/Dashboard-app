from datetime import datetime

from sqlalchemy import String, DateTime, Float, ForeignKey, func, Enum as SqlEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core.database import Base
from ..schemas.notification import MethodEnum
from .product import Products
from .users import Users

class Notification(Base):
    """유저가 구매한 상품 1건에 대한 거래/알림 레코드."""

    __tablename__ = "notification"

    id: Mapped[str] = mapped_column(primary_key=True)

    user_id: Mapped[str] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"), index=True)

    price: Mapped[float] = mapped_column(Float)
    customer: Mapped[str] = mapped_column(String(50))
    date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    method: Mapped[MethodEnum] = mapped_column(
        SqlEnum(MethodEnum, native_enum=False)
    )
    card: Mapped[str] = mapped_column(String(4))  # 카드번호 뒤 4자리
    email: Mapped[str] = mapped_column(String(255))
    # 유저 프로필 이미지 (users.profile_img 값이 연결됨)
    profile: Mapped[str] = mapped_column(String(500), default="")

    user: Mapped["Users"] = relationship(back_populates="purchases")
    product: Mapped["Products"] = relationship(back_populates="purchases")
