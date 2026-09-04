import uuid

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..core.security import hash_password, verify_password
from ..models.notification import Notification
from ..models.product import Products
from ..models.users import Users
from ..schemas.user import LoginRequest, PurchaseRequest, SignupRequest


def signup(db: Session, payload: SignupRequest) -> Users:
    """1. 회원가입 - 비밀번호는 해싱하여 저장."""
    exists = db.scalar(select(Users).where(Users.email == payload.email))
    if exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="이미 가입된 이메일입니다.",
        )

    user = Users(
        id=str(uuid.uuid4()),
        name=payload.name,
        email=payload.email,
        password=hash_password(payload.password),
        profile_img=payload.profile_img,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def login(db: Session, payload: LoginRequest) -> Users:
    """2. 로그인 - 저장된 해시와 비교."""
    user = db.scalar(select(Users).where(Users.email == payload.email))
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="이메일 또는 비밀번호가 올바르지 않습니다.",
        )
    return user


def create_purchase(db: Session, payload: PurchaseRequest) -> Notification:
    """3. 내가 구매한 상품 입력 - products db 로 연결.

    - 상품 정보는 products 테이블에 없으면 새로 저장(upsert)
    - 거래/구매 레코드는 notification 테이블에 저장
    - customer / email / profile 은 유저 정보에서 채운다 (profile = users.profile_img)
    """
    user = db.get(Users, payload.user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 유저입니다.",
        )

    product = db.get(Products, payload.product.id)
    if product is None:
        product = Products(
            id=payload.product.id,
            name=payload.product.name,
            color=payload.product.color,
            option=payload.product.option,
            image=payload.product.image,
        )
        db.add(product)
    else:
        product.name = payload.product.name
        product.color = payload.product.color
        product.option = payload.product.option
        product.image = payload.product.image

    purchase = Notification(
        id=str(uuid.uuid4()),
        user_id=user.id,
        product_id=product.id,
        price=payload.price,
        customer=user.name,
        method=payload.method,
        card=payload.card,
        email=user.email,
        profile=user.profile_img,
    )
    db.add(purchase)
    db.commit()
    db.refresh(purchase)
    return purchase
