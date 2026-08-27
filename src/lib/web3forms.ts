// Web3Forms access keys are designed to be used client-side (unlike a private
// API secret), so keeping it directly in frontend code matches Web3Forms' own docs.
export const WEB3FORMS_ACCESS_KEY = "ae15275d-5122-41fb-9133-27e60c6806a6";

export async function submitToWeb3Forms(formData: FormData): Promise<void> {
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) {
      throw new Error(data?.message || "Send failed. Please try again.");
    }
    return;
  }

  // Web3Forms can respond with its own HTML success page instead of JSON
  // (a classic no-JS <form action> fallback) even when JSON was requested.
  // A 2xx status there still means the submission was accepted.
  if (!res.ok) {
    throw new Error("Send failed. Please try again.");
  }
}
