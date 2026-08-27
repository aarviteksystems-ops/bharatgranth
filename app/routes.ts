import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("book/:bookId", "routes/book.$bookId.tsx"),
  route("read/:bookId/:chapterId", "routes/read.$bookId.$chapterId.tsx"),
  route("search", "routes/search.tsx"),
  route("bookmarks", "routes/bookmarks.tsx"),
  route("characters", "routes/characters.tsx"),
  route("admin", "routes/admin.tsx"),
  route("api/auth", "routes/api.auth.ts"),
] satisfies RouteConfig;
