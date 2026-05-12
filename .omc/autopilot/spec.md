# React 블로그 앱 - 기술 스펙

## 기술 스택
- **빌드**: Vite 5 + React 18 + TypeScript 5 (strict)
- **라우팅**: React Router v6 (createBrowserRouter)
- **상태관리**: Zustand (UI state) + URL search params (필터 SSOT)
- **데이터**: localStorage 기반 CRUD (백엔드 없음)
- **스타일**: Tailwind CSS 3 + @tailwindcss/typography
- **마크다운**: react-markdown + remark-gfm + rehype-sanitize (XSS 방지)
- **검증**: zod
- **테스트**: Vitest + React Testing Library

## 핵심 기능 (MVP)
1. 글 목록 (최신순, 태그 필터, 검색)
2. 글 상세 (마크다운 렌더링, rehype-sanitize 적용)
3. 글 작성/수정/삭제 (localStorage 영속화)
4. 태그 필터 (URL 쿼리 기반)
5. 빈 상태 / 404 처리
6. 다크모드
7. 반응형 (360px ~ 1280px+)

## 데이터 모델
```ts
interface Post {
  id: string;           // crypto.randomUUID()
  title: string;        // 필수, 1~120자
  excerpt: string;      // 목록용 요약
  content: string;      // 마크다운 본문
  tags: string[];       // trim+lowercase+dedupe 정규화
  createdAt: string;    // ISO 8601
  updatedAt: string;    // ISO 8601
}
```

## 라우팅
- `/` - 글 목록 (q, tag, sort 쿼리)
- `/posts/:id` - 글 상세
- `/posts/new` - 글 작성
- `/posts/:id/edit` - 글 수정
- `*` - 404

## 프로젝트 구조
```
src/
├── main.tsx
├── App.tsx
├── index.css
├── routes/router.tsx
├── pages/ (HomePage, PostPage, NewPostPage, EditPostPage, NotFoundPage)
├── components/
│   ├── layout/ (Header, Footer, Container)
│   ├── post/ (PostCard, PostList, PostContent, PostMeta, TagBadge)
│   ├── editor/ (PostEditor, MarkdownPreview)
│   ├── filter/ (SearchBar, TagFilter)
│   └── ui/ (Spinner, EmptyState, ConfirmDialog, Button)
├── hooks/ (usePosts, usePost, useTags, useDebounce, useSearchParamsState)
├── store/ (uiStore - theme, Zustand)
├── lib/ (storage, posts, format, validation)
└── types/ (blog.ts)
```

## 보안
- rehype-sanitize로 마크다운 렌더링 시 XSS 방지 (react-markdown의 안전한 렌더러 사용)
- zod로 입력 검증
- localStorage try/catch + 메모리 폴백

## 비기능
- 파일당 200-400줄 (최대 800줄)
- 불변성 패턴 준수
- 초기 로드 2초 미만
- Lighthouse Accessibility 90+
