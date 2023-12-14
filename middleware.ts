export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/stores/new", "/stores/:id/edit", "/users/likes"],
};
