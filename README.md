# Dashboard-app

Team **Prism-Sprint1**의 협업 대시보드 프로젝트입니다.
AI 도움 없이 직접 코드를 작성하며 레이아웃 구조를 이해하고, Git 협업 워크플로우를 익히는 것을 목표로 합니다.

## 🎯 프로젝트 목표

- 이전 스프린트에서 각자 만들었던 대시보드를 참고해, 팀 전체가 함께 하나의 대시보드 화면을 완성
- 컴포넌트 단위로 역할을 나눠 작업하며 레이아웃 파악 및 최적화 연습
- Git 브랜치 전략, 커밋 컨벤션, PR/머지 흐름을 실습하며 협업 방식 체득

## 🛠 기술 스택

- Next.js
- shadcn/ui
- tailwind.css

## 👥 담당 컴포넌트

| 담당자 | 컴포넌트     |
| ------ | ------------ |
| 동주   | Sidebar      |
| 승열   | Table        |
| 민정   | Bar Chart    |
| 해승   | Pie Chart    |
| 현지   | Progress Bar |
| 현주   | Area Chart   |

## 📁 폴더 컨벤션

```
components/
  ui/                 (shadcn 기본 컴포넌트 - CLI로 자동 생성, 직접 수정 지양)
    table.tsx
    sidebar.tsx
    ...

  common/              (여러 담당 컴포넌트가 공유하는 것들 - 로딩, 빈 상태 등)
    PageHeader.tsx
    EmptyState.tsx

  dashboard/            (담당별 기능 컴포넌트 전부 - shadcn ui/와 이름 겹쳐도 경로로 구분됨)
    sidebar/
      Sidebar.tsx
    table/
      index.ts
      Table.tsx
      TableHeader.tsx
      TableRow.tsx
      TableEmpty.tsx
    bar-chart/
    pie-chart/
    progress-bar/
    area-chart/
```

**규칙**

- `ui/`는 shadcn CLI가 생성하는 원자 단위 컴포넌트 전용 — 직접 새 파일 추가하지 않기
- 담당 기능 컴포넌트는 전부 `dashboard/` 하위에 kebab-case 폴더로 생성
- 여러 담당 컴포넌트에서 공통으로 쓰는 요소는 `common/`에 배치
- 폴더 내부가 여러 파일로 나뉘는 경우, `index.ts`에서 export 진입점을 통일
  ```ts
  export { Table } from "./Table";
  ```
  → 사용할 때는 `import { Table } from "@/components/dashboard/table"`

## 🌿 브랜치 전략

```
main
  dev
    feature/sidebar
    feature/table
    feature/bar-chart
    feature/pie-chart
    feature/progress-bar
    feature/area-chart
```

1. 각자 담당 컴포넌트 기준으로 `feature/컴포넌트명` 브랜치 생성
2. 본인 브랜치에서 작업 및 커밋
3. 작업 완료 후 `dev` 브랜치로 merge
4. 금요일 팀 리뷰 후 `dev` → `main` merge & push

## 📝 커밋 컨벤션

| 타입       | 설명                                  |
| ---------- | ------------------------------------- |
| `feat`     | 새로운 기능/컴포넌트 추가             |
| `fix`      | 버그 수정                             |
| `style`    | 스타일/레이아웃 수정 (기능 변경 없음) |
| `refactor` | 코드 구조 개선 (기능 변경 없음)       |
| `docs`     | 문서 수정                             |
| `chore`    | 설정, 빌드 등 기타 변경               |

예시:

```
feat: Table 컴포넌트 기본 구조 작성
style: Sidebar 메뉴 hover 스타일 추가
fix: Bar Chart 데이터 렌더링 오류 수정
```

## 🚀 시작하기

```bash
# 저장소 클론
git clone <repo-url>
cd Dashboard-app

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📌 작업 규칙

- 담당 컴포넌트 외의 코드는 임의로 수정하지 않기
- 커밋은 작업 단위로 자주, 명확하게
- 막히는 부분은 팀 채널에 공유하고 함께 해결
