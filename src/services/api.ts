export async function api() {
  const response = await fetch("/api/subscribe", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro durante a assinatura.");
  }

  return response.json();
}
