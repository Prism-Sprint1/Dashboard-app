from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..schemas.notification import NotificationItem
from ..schemas.user import (
    LoginRequest,
    LoginResponse,
    PurchaseRequest,
    PurchaseResponse,
    SignupRequest,
    UserResponse,
)
from ..services import user as user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    """1. 회원가입 (비밀번호 해싱 저장, profile_img 저장)"""
    return user_service.signup(db, payload)


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """2. 로그인"""
    user = user_service.login(db, payload)
    return LoginResponse(user=user)


@router.post(
    "/purchases", response_model=PurchaseResponse, status_code=status.HTTP_201_CREATED
)
def create_purchase(payload: PurchaseRequest, db: Session = Depends(get_db)):
    """3. 내가 구매한 상품 입력 (products db 로 연결)"""
    purchase = user_service.create_purchase(db, payload)
    return PurchaseResponse(item=NotificationItem.model_validate(purchase))
