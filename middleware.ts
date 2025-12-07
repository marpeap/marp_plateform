import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return Boolean(token);
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};

