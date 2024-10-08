import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/my-blogs/:path*'
    , '/my-profile/:path*'
    , '/setup/:path*'
    , '/api/auth/:path*'
    ,]
};