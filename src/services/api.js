/**
 * src/services/api.js
 *
 * Reusable API client for the FastAPI backend.
 *
 * Base URL:
 *   - Uses VITE_API_BASE_URL when set (e.g. http://127.0.0.1:8000/api/v1).
 *   - Defaults to the relative "/api/v1" path, which the Vite dev server
 *     proxies to the local FastAPI server (see vite.config.js).
 *
 * Authentication:
 *   - When a genuine Firebase Auth user is available, AuthContext registers a
 *     token provider via setAuthTokenProvider() and every request sends:
 *
 *         Authorization: Bearer <Firebase ID Token>   (from user.getIdToken())
 *
 *   - No fake/demo tokens are ever generated here. If no real Firebase user
 *     exists, no Authorization header is sent and the backend's documented
 *     local-development fallback UID (demo_firebase_uid_123) applies.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

// Async function registered by AuthContext that returns a real Firebase
// ID token (await user.getIdToken()) or null when Firebase is not configured.
let authTokenProvider = null;

export function setAuthTokenProvider(provider) {
  authTokenProvider = typeof provider === "function" ? provider : null;
}

/**
 * Error thrown for failed API requests. Carries the HTTP status so callers
 * can handle 401 / 404 / 422 / 500 / network errors distinctly.
 */
export class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function extractDetail(payload) {
  if (!payload) return null;

  if (typeof payload.detail === "string") {
    return payload.detail;
  }

  // FastAPI 422 validation errors: detail is a list of { loc, msg, ... }
  if (Array.isArray(payload.detail)) {
    return payload.detail
      .map((item) => item?.msg || JSON.stringify(item))
      .join(", ");
  }

  return null;
}

function friendlyMessage(status, detail) {
  if (detail) return detail;

  switch (status) {
    case 401:
      return "You are not authenticated. Please log in again.";
    case 404:
      return "The requested item was not found.";
    case 422:
      return "The data sent was invalid. Please check your input.";
    case 500:
      return "Something went wrong on the server. Please try again.";
    default:
      return `Request failed (status ${status}).`;
  }
}

/**
 * Core request helper used by all services.
 */
async function request(path, { method = "GET", body } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Attach a REAL Firebase ID token when one is available.
  if (authTokenProvider) {
    try {
      const token = await authTokenProvider();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to get Firebase ID token:", err);
    }
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    // Network failure (backend down, CORS, DNS, etc.)
    throw new ApiError(
      "Cannot reach the server. Make sure the backend is running.",
      0
    );
  }

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = extractDetail(payload);
    throw new ApiError(
      friendlyMessage(response.status, detail),
      response.status,
      payload?.detail ?? null
    );
  }

  return payload;
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export { API_BASE_URL };
