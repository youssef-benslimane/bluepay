const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export function isRecaptchaConfigured(): boolean {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY);
}

export async function verifyRecaptchaToken(
  token: string | undefined,
  remoteIp?: string
): Promise<{ success: boolean; message?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { success: true };

  if (!token) {
    return { success: false, message: "Veuillez confirmer que vous n'êtes pas un robot." };
  }

  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp) params.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = (await response.json()) as { success?: boolean };
    if (!data.success) {
      return { success: false, message: "Vérification de sécurité échouée. Réessayez." };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Impossible de vérifier le captcha. Réessayez." };
  }
}

export function getRequestIp(request: Request): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? undefined;
}
