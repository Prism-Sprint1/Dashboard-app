from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..schemas.notification import NotificationItem, NotificationListResponse
from ..services import notification as notification_service

router = APIRouter(prefix="/notification", tags=["Notification"])


@router.get("/{user_id}", response_model=NotificationListResponse)
def get_user_purchases(user_id: str, db: Session = Depends(get_db)):
    """4. 사용자가 구매한 제품 정보를 조회 (product 정보 + 유저 profile 포함)"""
    purchases = notification_service.get_user_purchases(db, user_id)
    items = [NotificationItem.model_validate(p) for p in purchases]
    return NotificationListResponse(
        user_id=user_id, count=len(items), items=items
    )
