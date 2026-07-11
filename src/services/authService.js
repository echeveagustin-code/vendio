import {
  apiRequest,
  setToken,
  setWorkspaceId,
  removeToken,
} from "../lib/api";

export async function loginUser({ email, password }) {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const tokenData = await apiRequest("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  setToken(tokenData.access_token);

  const workspace = await apiRequest("/workspaces/default");
  setWorkspaceId(workspace.id);

  return {
    token: tokenData.access_token,
    workspace,
  };
}

export async function registerUser({ nombre, email, password }) {
  const data = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      nombre,
      email,
      password,
    }),
  });

  setToken(data.access_token);
  setWorkspaceId(data.workspace.id);

  return data;
}

export async function getCurrentUser() {
  return apiRequest("/auth/me");
}

export function logoutUser() {
  removeToken();
}