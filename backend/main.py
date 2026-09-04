import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

# 모델을 import 해야 Base.metadata 에 테이블이 등록됨
from app.models import notification as _notification_model  # noqa: F401
from app.models import product as _product_model  # noqa: F401
from app.models import users as _users_model  # noqa: F401
from app.routers.notification import router as notification_router
from app.routers.user import router as user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as exc:  # DB 미연결 시에도 앱은 기동
        print(f"[startup] create_all skipped: {exc}")
    yield


app = FastAPI(lifespan=lifespan)

# CORS 설정 (프론트엔드 개발 서버에서의 요청 허용)
_default_origins = "http://localhost:3000,http://127.0.0.1:3000"
allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOW_ORIGINS", _default_origins).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(user_router)
app.include_router(notification_router)
