import { apiRequest } from "../lib/api";

export async function getDefaultWorkspace() {
  return apiRequest("/workspaces/default");
}

export async function getDashboardSummary(workspaceId, selectedPeriod, selectedAccount) {
  return apiRequest(`/dashboard/summary?workspace_id=${workspaceId}`);
}

export async function getSocialAccounts(workspaceId) {
  return apiRequest(`/social-accounts/?workspace_id=${workspaceId}`);
}

export async function getContentItems(workspaceId) {
  return apiRequest(`/content-items/?workspace_id=${workspaceId}`);
}

export async function getPosts(workspaceId, selectedPeriod, selectedAccount) {
  return apiRequest(`/posts/?workspace_id=${workspaceId}`);
}