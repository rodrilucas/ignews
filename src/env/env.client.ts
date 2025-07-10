export const NEXT_PUBLIC_STRIPE_API_KEY =
  process.env.NEXT_PUBLIC_STRIPE_API_KEY || "";

if (!NEXT_PUBLIC_STRIPE_API_KEY) {
  throw new Error("Variável pública do stripe não definida.");
}
