import { betterAuth } from "better-auth";

import type { Env } from "./types";

export type BetterAuthSession = {
  user?: {
    id?: string;
    email?: string;
    name?: string | null;
    image?: string | null;
  };
};

export function createAuth(env: Env) {
  return betterAuth({
    database: env.DB,
    baseURL: env.BETTER_AUTH_URL,
    basePath: "/api/auth",
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        prompt: "select_account",
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
  });
}

export async function getBetterAuthSession(env: Env, headers: Headers): Promise<BetterAuthSession | null> {
  const auth = createAuth(env);
  const api = auth.api as {
    getSession(input: { headers: Headers }): Promise<BetterAuthSession | null>;
  };
  return api.getSession({ headers });
}
