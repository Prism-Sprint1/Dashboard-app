from datetime import datetime
from enum import Enum

from pydantic import BaseModel, EmailStr


class MethodEnum(str, Enum):
    visa = "VISA"
    master = "Master"


class ProductInfo(BaseModel):
    id: str
    name: str
    color: str = ""
    option: str = ""
    image: str = ""

    model_config = {"from_attributes": True}


class NotificationItem(BaseModel):
    """유저가 구매한 상품 1건 조회 응답."""

    id: str
    product: ProductInfo
    price: float
    customer: str
    date: datetime
    method: MethodEnum
    card: str
    email: EmailStr
    profile: str  # 유저 프로필 이미지

    model_config = {"from_attributes": True}


class NotificationListResponse(BaseModel):
    user_id: str
    count: int
    items: list[NotificationItem]


class TransactionRow(BaseModel):
    """프론트엔드 Recent Transaction 테이블 행."""

    id: str
    product: str
    detail: str
    price: str
    customer: str
    initials: str
    date: str
    method: MethodEnum
    card: str
    email: EmailStr
    image: str
