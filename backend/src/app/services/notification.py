from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from ..models.notification import Notification
from ..models.users import Users
from ..schemas.notification import TransactionRow


def _to_transaction_row(n: Notification) -> TransactionRow:
    product = n.product
    detail = " · ".join(part for part in (product.option, product.color) if part)
    initials = "".join(word[0] for word in n.customer.split()[:2]).upper()
    return TransactionRow(
        id=n.id,
        product=product.name,
        detail=detail,
        price=f"{n.price:.2f}",
        customer=n.customer,
        initials=initials or "?",
        date=n.date.strftime("%d %b %Y, %I:%M %p"),
        method=n.method,
        card=n.card,
        email=n.email,
        image=product.image or "",
    )


def list_transactions(db: Session) -> list[TransactionRow]:
    """Recent Transaction 테이블용 - 전체 거래 내역을 최신순으로 조회."""
    stmt = (
        select(Notification)
        .options(joinedload(Notification.product))
        .order_by(Notification.date.desc())
    )
    return [_to_transaction_row(n) for n in db.scalars(stmt).all()]


def get_user_purchases(db: Session, user_id: str) -> list[Notification]:
    """4. 사용자가 구매한 제품 정보를 불러와서 조회.

    notification 레코드와 연결된 product 정보를 함께 로드한다.
    각 항목의 profile 값은 구매 시점의 유저 프로필 이미지다.
    """
    user = db.get(Users, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 유저입니다.",
        )

    stmt = (
        select(Notification)
        .options(joinedload(Notification.product))
        .where(Notification.user_id == user_id)
        .order_by(Notification.date.desc())
    )
    return list(db.scalars(stmt).all())
