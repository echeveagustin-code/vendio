import { apiRequest, getWorkspaceId } from "../lib/api";

function normalizePlatform(platform) {
  if (!platform) return "Otra";

  const value = String(platform).toLowerCase();

  if (value.includes("instagram")) return "Instagram";
  if (value.includes("tiktok")) return "TikTok";
  if (value.includes("youtube")) return "YouTube";
  if (value.includes("facebook")) return "Facebook";

  return platform;
}

function normalizeStatus(status) {
  if (!status) return "Pendiente";

  const value = String(status).toLowerCase();

  if (value === "published") return "Publicado";
  if (value === "publishing") return "Publicando";
  if (value === "failed") return "Falló";
  if (value === "cancelled") return "Cancelado";
  if (value === "pending") return "Pendiente";
  if (value === "scheduled") return "Programado";

  return status;
}

function getPostDate(post) {
  return (
    post.scheduled_at ||
    post.scheduledAt ||
    post.publish_at ||
    post.publishAt ||
    post.created_at ||
    post.createdAt ||
    null
  );
}

export function mapPostToCalendar(post) {
  const rawDate = getPostDate(post);
  const date = rawDate ? new Date(rawDate) : null;

  return {
    id: post.id,
    day: date ? date.getDate() : null,
    month: date ? date.getMonth() : null,
    year: date ? date.getFullYear() : null,
    time: date
      ? date.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--:--",

    title: post.title || post.caption || post.description || "Publicación sin título",

    type: post.type || post.content_type || "Video",

    platform: normalizePlatform(
      post.platform ||
        post.target_platform ||
        post.social_platform ||
        post.network,
    ),

    account:
      post.account?.username ||
      post.account?.name ||
      post.account_username ||
      post.account_name ||
      post.account ||
      "Cuenta sin nombre",

    status: normalizeStatus(post.status),

    raw: post,
  };
}

export async function getCalendarPosts({ year, month } = {}) {
  const workspaceId = getWorkspaceId();

  if (!workspaceId) {
    throw new Error("No hay workspace activo.");
  }

  const targetDate = new Date();
  const targetYear = year ?? targetDate.getFullYear();
  const targetMonth = month ?? targetDate.getMonth();

  const dateFrom = new Date(targetYear, targetMonth, 1, 0, 0, 0);
  const dateTo = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

  const params = new URLSearchParams({
    workspace_id: workspaceId,
    date_from: dateFrom.toISOString(),
    date_to: dateTo.toISOString(),
  });

  const data = await apiRequest(`/posts/calendar?${params.toString()}`);

  const posts = Array.isArray(data) ? data : data.items || data.posts || [];

  return posts
    .flatMap((post) => {
      if (!Array.isArray(post.targets) || post.targets.length === 0) {
        return [mapPostToCalendar(post)];
      }

      return post.targets.map((target) => {
        const socialAccount =
          target.social_account ||
          target.socialAccount ||
          null;

        return mapPostToCalendar({
          ...post,
          id: `${post.id}-${target.id}`,
          platform:
            socialAccount?.platform ||
            target.platform ||
            post.platform,
          status: target.status || post.status,
          account:
            socialAccount?.username ||
            socialAccount?.display_name ||
            socialAccount?.name ||
            socialAccount?.handle ||
            `Cuenta #${target.social_account_id}`,
          target,
          social_account: socialAccount,
        });
      });
    })
    .filter((post) => {
      return post.day !== null && post.month !== null && post.year !== null;
    });
}