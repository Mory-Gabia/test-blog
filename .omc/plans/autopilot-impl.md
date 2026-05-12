# React 블로그 구현 계획

## Phase 1: 프로젝트 초기화 및 설정
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] Tailwind CSS 3 + @tailwindcss/typography 설정
- [ ] 패키지 설치 (react-router-dom, zustand, react-markdown, remark-gfm, rehype-sanitize, zod, clsx)
- [ ] tsconfig strict 설정, ESLint + Prettier 설정
- [ ] Vitest 설정

## Phase 2: 타입 + 데이터 레이어
- [ ] src/types/blog.ts (Post, Tag, PostFilter 타입)
- [ ] src/lib/storage.ts (localStorage CRUD + 메모리 폴백)
- [ ] src/lib/validation.ts (zod 스키마)
- [ ] src/lib/posts.ts (검색, 필터, 정렬 순수 함수)
- [ ] src/lib/format.ts (날짜 포맷, 읽기시간)
- [ ] 샘플 데이터 시드 (초기 localStorage 데이터 3~5개)

## Phase 3: 라우팅 + 레이아웃
- [ ] src/routes/router.tsx
- [ ] src/App.tsx (레이아웃 셸)
- [ ] src/components/layout/Header.tsx
- [ ] src/components/layout/Footer.tsx
- [ ] src/components/layout/Container.tsx

## Phase 4: 핵심 컴포넌트
- [ ] src/components/ui/Button.tsx
- [ ] src/components/ui/Spinner.tsx
- [ ] src/components/ui/EmptyState.tsx
- [ ] src/components/ui/ConfirmDialog.tsx
- [ ] src/components/post/TagBadge.tsx
- [ ] src/components/post/PostMeta.tsx
- [ ] src/components/post/PostCard.tsx
- [ ] src/components/post/PostList.tsx
- [ ] src/components/post/PostContent.tsx (react-markdown + rehype-sanitize)

## Phase 5: 훅
- [ ] src/hooks/useDebounce.ts
- [ ] src/hooks/useSearchParamsState.ts
- [ ] src/hooks/usePosts.ts
- [ ] src/hooks/usePost.ts
- [ ] src/hooks/useTags.ts

## Phase 6: 상태 관리
- [ ] src/store/uiStore.ts (Zustand: theme, persist)

## Phase 7: 필터 컴포넌트
- [ ] src/components/filter/SearchBar.tsx
- [ ] src/components/filter/TagFilter.tsx

## Phase 8: 에디터
- [ ] src/components/editor/MarkdownPreview.tsx
- [ ] src/components/editor/PostEditor.tsx

## Phase 9: 페이지
- [ ] src/pages/HomePage.tsx
- [ ] src/pages/PostPage.tsx
- [ ] src/pages/NewPostPage.tsx
- [ ] src/pages/EditPostPage.tsx
- [ ] src/pages/NotFoundPage.tsx

## Phase 10: 테스트
- [ ] src/__tests__/lib/posts.test.ts
- [ ] src/__tests__/lib/format.test.ts
- [ ] src/__tests__/lib/storage.test.ts
- [ ] src/__tests__/components/PostCard.test.tsx
- [ ] src/__tests__/hooks/usePosts.test.ts

## Phase 11: 마무리
- [ ] 다크모드 연동 확인
- [ ] 반응형 확인 (360px)
- [ ] Vercel/Netlify SPA fallback 설정
- [ ] 빌드 확인
