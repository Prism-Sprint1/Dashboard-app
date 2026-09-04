import os
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# .env 파일 로드
load_dotenv(override=True)
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL이 .env 파일에 설정되지 않았습니다.")

# 설치된 드라이버(psycopg v3)에 맞게 스킴 정규화
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

# psycopg v3 가 인식하지 못하는 쿼리 파라미터 제거 (예: Supabase pooler 의 pgbouncer=true)
_url = urlsplit(DATABASE_URL)
if _url.query:
    _kept = [
        (k, v)
        for k, v in parse_qsl(_url.query, keep_blank_values=True)
        if k not in {"pgbouncer"}
    ]
    DATABASE_URL = urlunsplit(_url._replace(query=urlencode(_kept)))

# DB 엔진 생성
engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,  # 끊어진 DB 연결 자동 감지 및 재연결
    pool_recycle=300,    # 5분 이상 비활성화된 커넥션 자동 재활성화 (Supabase 타임아웃 방지)
)

# DB 세션 생성기
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 엔티티들이 상속받을 공통 Base 클래스
class Base(DeclarativeBase):
    pass


# FastAPI 엔드포인트에서 사용할 DB 세션 의존성(Dependency)
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()