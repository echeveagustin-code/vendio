const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export function getToken() {
  return localStorage.getItem("vendio_token");
}

export function setToken(token) {
  localStorage.setItem("vendio_token", token);
}

export function removeToken() {
  localStorage.removeItem("vendio_token");
  localStorage.removeItem("vendio_workspace_id");
}

export function getWorkspaceId() {
  return localStorage.getItem("vendio_workspace_id");
}

export function setWorkspaceId(workspaceId) {
  localStorage.setItem("vendio_workspace_id", String(workspaceId));
}

export async function apiRequest(path, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    throw new Error("No autorizado. Iniciá sesión de nuevo.");
  }

  if (!response.ok) {
  let message = "Error en la request";

  try {
    const errorData = await response.json();

    if (typeof errorData.detail === "string") {
      message = errorData.detail;
    } else if (Array.isArray(errorData.detail)) {
      message = errorData.detail
        .map((error) => {
          const field = error.loc?.join(".");
          return field ? `${field}: ${error.msg}` : error.msg;
        })
        .join(" | ");
    }
  } catch {
    // ignore
  }

  throw new Error(message);
}

  if (response.status === 204) {
    return null;
  }

  return response.json();
}