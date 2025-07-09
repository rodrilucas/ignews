import z from "zod";

const envSchema = z.object({
  GITHUB_SECRET: z.string(),
  GITHUB_ID: z.string(),
  STRIPE_API_KEY: z.string(),
  NEXTAUTH_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Variáveis de ambiente inválidas", _env.error.format());

  throw new Error("Variáveis de ambiente inválidas");
}

export const env = _env.data;
