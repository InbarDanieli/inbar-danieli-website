import { decodeJwt } from "jose";
import { FormEvent } from "react";
import { toast } from "react-toastify";

const SESSION_COOKIE_NAME = "session_token";

interface AuthUser {
  userId: string;
  email: string;
}

/**
 * Get the JWT token from cookies (client-side)
 */
function getTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SESSION_COOKIE_NAME}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Decode JWT and get user data (client-side, no verification)
 * Note: This only decodes the payload, it doesn't verify the signature
 * Server-side verification still happens for protected API routes
 */
export function getAuthUser(): AuthUser | null {
  const token = getTokenFromCookie();
  if (!token) return null;

  try {
    const payload = decodeJwt(token);

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    return {
      userId: payload.userId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated (client-side)
 */
export function isAuthenticated(): boolean {
  return getAuthUser() !== null;
}

export const handleSubmitSignup = async (
  email: string,
  password: string,
  confirmPassword: string,
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, confirmPassword }),
  });
  const data = await response.json();

  if (data.status !== 200) {
    toast.error(data.message);
  } else {
    window.location.href = "/crochet/dashboard";
  }
};

export const handleSubmitLogin = async (
  email: string,
  password: string,
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (data.status !== 200) {
    toast.error(data.message);
  } else {
    window.location.href = "/crochet/dashboard";
  }
};

export const handleLogout = async (
  e: FormEvent<HTMLFormElement>
): Promise<void> => {
  e.preventDefault();

  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });
  const data = await response.json();

  if (data.status === 200) {
    window.location.href = "/crochet/login";
  } else {
    toast.error(data.message);
  }
};
