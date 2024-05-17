import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/my-blogs/:path*'
  , '/my-profile/:path*'
  , '/setup/:path*'
  , '/api/auth/logout'
  , '/api/auth/callback'
  , '/api/auth/me'
  , '/api/auth/login'
  , '/api/auth/signup'
  , '/api/auth/user'
  , '/api/auth/session'
  , '/api/auth/csrf'
  , '/api/auth/refresh'
  ,]
};