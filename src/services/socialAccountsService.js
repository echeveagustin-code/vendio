import { apiRequest, getWorkspaceId } from "../lib/api";

export async function getSocialAccounts() {
  const workspaceId = getWorkspaceId();

  if (!workspaceId) {
    throw new Error("No hay workspace activo.");
  }

  const data = await apiRequest(
    `/social-accounts/?workspace_id=${encodeURIComponent(workspaceId)}`,
  );

  const accounts = Array.isArray(data) ? data : data.items || data.accounts || [];

  return accounts;
}