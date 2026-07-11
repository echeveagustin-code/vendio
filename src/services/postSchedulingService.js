import { apiRequest, getWorkspaceId } from "../lib/api";
import { mapPostToCalendar } from "./calendarService";

export async function createScheduledPost({
  title,
  caption,
  media_url,
  media_type = "video",
  publication_type = "reel",
  scheduled_at,
  social_account_ids,
  note,
}) {
  const workspaceId = getWorkspaceId();

  if (!workspaceId) {
    throw new Error("No hay workspace activo.");
  }

  if (!media_url) {
    throw new Error("Falta la URL del contenido.");
  }

  const content = await apiRequest("/content-items/", {
    method: "POST",
    body: JSON.stringify({
      workspace_id: Number(workspaceId),
      title,
      media_url,
      type: media_type,
      publication_type,
      thumbnail_url: null,
      original_filename: null,
      file_size: null,
      duration_seconds: null,
      mime_type: null,
    }),
  });

  const post = await apiRequest("/posts/", {
    method: "POST",
    body: JSON.stringify({
      workspace_id: Number(workspaceId),
      content_id: content.id,
      caption,
      publish_mode: "scheduled",
      scheduled_at,
      social_account_ids,
    }),
  });

  if (!Array.isArray(post.targets) || post.targets.length === 0) {
    return [mapPostToCalendar(post)];
  }

  return post.targets.map((target) => {
    const socialAccount = target.social_account || null;

    return mapPostToCalendar({
      ...post,
      id: `${post.id}-${target.id}`,
      platform: socialAccount?.platform,
      status: target.status || post.status,
      account:
        socialAccount?.username ||
        socialAccount?.display_name ||
        `Cuenta #${target.social_account_id}`,
      social_account: socialAccount,
      target,
    });
  });
}