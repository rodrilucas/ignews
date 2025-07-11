import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.string(),

  GITHUB_SECRET: z.string(),
  GITHUB_ID: z.string(),

  STRIPE_API_KEY: z.string(),
  STRIPE_SUCCESS_URL: z.string(),
  STRIPE_CANCEL_URL: z.string(),
  STRIPE_PRICE: z.coerce.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),

  AUTH_SECRET: z.string(),

  FIREBASE_API_ID: z.coerce.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.coerce.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_PROJECT_ID: z.string(),

  PRISMIC_ACCESS_TOKEN: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Variáveis de ambiente inválidas", _env.error.format());

  throw new Error("Variáveis de ambiente inválidas");
}

export const env = _env.data;
