export const NEXT_PUBLIC_STRIPE_API_KEY =
  process.env.NEXT_PUBLIC_STRIPE_API_KEY || "";

export const NEXT_PUBLIC_PRISMIC_ENVIRONMENT =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "";

if (!NEXT_PUBLIC_STRIPE_API_KEY || !NEXT_PUBLIC_PRISMIC_ENVIRONMENT) {
  throw new Error("Variável pública do stripe não definida.");
}
