from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from ..models.notification import Notification
from ..models.users import Users


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
