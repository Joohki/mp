export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/stores/:id/edit", "/users/likes"],
};
