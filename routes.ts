/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

// Função para verificar se a rota é pública
export function isPublicRoute(pathname : string) {
   const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/nightlife",
    "/art",
    "/gaming",
    "/education",
    "/tech",
    "/e/:path*",
  ];
  // Verifica se a rota está na lista pública ou se corresponde ao padrão dinâmico
  return (
    publicRoutes.some((route) => {
      if (route.includes(':path*')) {
        // Transformar o padrão dinâmico em regex
        const regex = new RegExp(`^${route.replace(':path*', '.*')}$`);
        return regex.test(pathname);
      }
      return route === pathname;
    })
  );
}
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";