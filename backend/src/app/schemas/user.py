from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from .notification import MethodEnum, NotificationItem


# ---------- 1. 회원가입 ----------
class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    name: str = Field(min_length=1, max_length=50)
    profile_img: str = Field(default="", max_length=500)


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    name: str
    profile_img: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------- 2. 로그인 ----------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    message: str = "로그인 성공"
    user: UserResponse


# ---------- 3. 내가 구매한 상품 입력 ----------
class PurchaseProductInput(BaseModel):
    id: str
    name: str
    color: str = ""
    option: str = ""
    image: str = ""


class PurchaseRequest(BaseModel):
    user_id: str
    product: PurchaseProductInput
    price: float = Field(ge=0)
    method: MethodEnum
    card: str = Field(min_length=4, max_length=4, pattern=r"^\d{4}$")


class PurchaseResponse(BaseModel):
    message: str = "구매 내역이 등록되었습니다."
    item: NotificationItem
