import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes', '/notes/filter'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken && refreshToken) {
    try {
      const response = await checkServerSession();
      const setCookieHeader = response.headers['set-cookie'];
      const newResponse = NextResponse.next();

      if (setCookieHeader) {
        const cookiesArray = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];

        cookiesArray.forEach(cookieStr => {
          const parsed = parse(cookieStr);

          if (parsed.accessToken) {
            newResponse.cookies.set('accessToken', parsed.accessToken, {
              path: parsed.Path,
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            });
          }

          if (parsed.refreshToken) {
            newResponse.cookies.set('refreshToken', parsed.refreshToken, {
              path: parsed.Path,
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            });
          }
        });

        // Якщо оновлено токени і юзер на публічному маршруті — редирект на /
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url));
        }

        // Інакше — дозволити доступ
        return newResponse;
      }
    } catch {
      // refresh не спрацював — переходимо до обробки нижче
    }
  }

  // Якщо немає accessToken і не вийшло оновити — redirect
  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }

  // Якщо користувач авторизований і йде на публічний маршрут — редиректимо на /
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/notes/filter/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
