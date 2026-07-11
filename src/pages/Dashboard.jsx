import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import CalendarStrip from "../components/dashboard/CalendarStrip";
import KpiCard from "../components/dashboard/KpiCard";
import TodaySummary from "../components/dashboard/TodaySummary";
import ConnectedAccounts from "../components/dashboard/ConnectedAccounts";
import ContentCard from "../components/dashboard/ContentCard";
import { setWorkspaceId } from "../lib/api";
import {
  getDefaultWorkspace,
  getDashboardSummary,
  getSocialAccounts,
  getContentItems,
  getPosts,
} from "../services/dashboardService";

function formatNumber(value) {
  return Number(value || 0).toLocaleString("es-AR");
}

function buildKpis(summary = {}) {
  const totalPosts = Number(summary.total_posts || 0);
  const scheduledPosts = Number(summary.scheduled_posts || 0);
  const publishedPosts = Number(summary.published_posts || 0);
  const failedPosts = Number(summary.failed_posts || 0);
  const totalViews = Number(summary.total_views || 0);
  const totalLikes = Number(summary.total_likes || 0);

  return [
    {
      id: "total_posts",
      icon: "📦",
      label: "Posts totales",
      value: totalPosts,
      change: "MVP",
      positive: null,
    },
    {
      id: "scheduled_posts",
      icon: "🗓️",
      label: "Programados",
      value: scheduledPosts,
      change: "Pendientes",
      positive: null,
    },
    {
      id: "published_posts",
      icon: "✅",
      label: "Publicados",
      value: publishedPosts,
      change: "+ OK",
      positive: true,
    },
    {
      id: "failed_posts",
      icon: "⚠️",
      label: "Fallidos",
      value: failedPosts,
      change: failedPosts > 0 ? "Revisar" : "Sin errores",
      positive: failedPosts === 0,
    },
    {
      id: "total_views",
      icon: "👁️",
      label: "Vistas",
      value: formatNumber(totalViews),
      change: "Total",
      positive: true,
    },
    {
      id: "total_likes",
      icon: "❤️",
      label: "Likes",
      value: formatNumber(totalLikes),
      change: "Total",
      positive: true,
    },
  ];
}

function getPostMetrics(post) {
  const totals = {
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    clicks: 0,
    ctr: 0,
  };

  const targets = post?.targets || [];
  let ctrCount = 0;

  targets.forEach((target) => {
    const metrics = target.metrics || [];

    if (metrics.length === 0) return;

    const latestMetric = [...metrics].sort(
      (a, b) => new Date(b.captured_at) - new Date(a.captured_at),
    )[0];

    totals.views += Number(latestMetric.views || 0);
    totals.likes += Number(latestMetric.likes || 0);
    totals.comments += Number(latestMetric.comments || 0);
    totals.shares += Number(latestMetric.shares || 0);
    totals.clicks += Number(latestMetric.clicks || 0);

    if (latestMetric.ctr !== null && latestMetric.ctr !== undefined) {
      totals.ctr += Number(latestMetric.ctr || 0);
      ctrCount += 1;
    }
  });

  if (ctrCount > 0) {
    totals.ctr /= ctrCount;
  }

  return totals;
}

function buildFeaturedContent(contentItems = [], posts = []) {
  return contentItems.slice(0, 4).map((item) => {
    const relatedPosts = posts.filter((post) => post.content_id === item.id);
    const latestPost = relatedPosts[0];
    const metrics = latestPost ? getPostMetrics(latestPost) : null;

    return {
      id: item.id,
      title: item.title,
      platform: latestPost?.publish_mode || "contenido",
      status: item.status,
      thumbnail: item.thumbnail_url || item.media_url,
      description: latestPost?.caption || "Contenido cargado en Vendio.",
      score: relatedPosts.length,
      views: metrics ? formatNumber(metrics.views) : "0",
      likes: metrics ? formatNumber(metrics.likes) : "0",
      comments: metrics ? formatNumber(metrics.comments) : "0",
      shares: metrics ? formatNumber(metrics.shares) : "0",
      clicks: metrics ? formatNumber(metrics.clicks) : "0",
      ctr: metrics ? `${metrics.ctr.toFixed(2)}%` : "0%",
      sales: "-",
    };
  });
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workspace, setWorkspace] = useState(null);
  const [kpis, setKpis] = useState([]);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedAccount, setSelectedAccount] = useState("all");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const defaultWorkspace = await getDefaultWorkspace();

      setWorkspace(defaultWorkspace);
      setWorkspaceId(defaultWorkspace.id);

      const [summaryData, accountsData, contentData, postsData] =
        await Promise.all([
          getDashboardSummary(defaultWorkspace.id),
          getSocialAccounts(defaultWorkspace.id),
          getContentItems(defaultWorkspace.id),
          getPosts(defaultWorkspace.id),
        ]);

      setKpis(buildKpis(summaryData));
      setAccounts(accountsData || []);
      setPosts(postsData || []);
      setFeaturedContent(
        buildFeaturedContent(contentData || [], postsData || []),
      );
    } catch (loadError) {
      console.error(loadError);
      setError(loadError.message || "No se pudo cargar el dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-brand-ink">
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage="dashboard"
      />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <DashboardHeader
            onMenuToggle={() => setSidebarOpen(true)}
            accounts={accounts}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            selectedAccount={selectedAccount}
            onAccountChange={setSelectedAccount}
          />

          {workspace && (
            <div className="mb-4 rounded-2xl border border-brand-navy/10 bg-white px-4 py-3 text-sm text-brand-ink/70">
              Workspace activo:{" "}
              <span className="font-bold text-brand-navy">
                {workspace.nombre}
              </span>
            </div>
          )}

          {loading && (
            <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 text-sm font-semibold text-brand-ink/60">
              Cargando dashboard...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <CalendarStrip posts={posts} />

              <section
                className="mb-6"
                aria-label="Indicadores principales"
              >
                <div className="mb-4">
                  <h2 className="font-display text-xl font-extrabold text-brand-navy">
                    Tus estadísticas
                  </h2>
                  <p className="mt-1 text-sm text-brand-ink/55">
                    Datos reales desde el backend
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
                  {kpis.map((kpi) => (
                    <KpiCard
                      key={kpi.id}
                      {...kpi}
                    />
                  ))}
                </div>
              </section>

              <div className="grid gap-6 xl:grid-cols-[minmax(280px,320px)_1fr]">
                <aside className="space-y-5">
                  <TodaySummary
                    posts={posts}
                    accounts={accounts}
                  />
                  <ConnectedAccounts accounts={accounts} />
                </aside>

                <div className="space-y-6">
                  <section>
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h2 className="font-display text-xl font-extrabold text-brand-navy">
                          Contenido destacado
                        </h2>
                        <p className="mt-1 text-sm text-brand-ink/55">
                          Contenido cargado desde la base de datos.
                        </p>
                      </div>

                      <a
                        href="#contenido"
                        className="text-sm font-bold text-brand-navy hover:underline"
                      >
                        Ver todo el contenido
                      </a>
                    </div>

                    {featuredContent.length === 0 ? (
                      <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 text-sm text-brand-ink/60">
                        Todavía no hay contenido cargado.
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {featuredContent.map((item) => (
                          <ContentCard
                            key={item.id}
                            {...item}
                          />
                        ))}
                      </div>
                    )}
                  </section>

                  <section>
                    <div className="mb-4">
                      <h2 className="font-display text-xl font-extrabold text-brand-navy">
                        Últimos posts
                      </h2>
                      <p className="mt-1 text-sm text-brand-ink/55">
                        Publicaciones creadas en Vendio.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-brand-navy/10 bg-white p-4">
                      {posts.length === 0 ? (
                        <p className="text-sm text-brand-ink/60">
                          Todavía no hay posts.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {posts.slice(0, 5).map((post) => {
                            const metrics = getPostMetrics(post);

                            return (
                              <div
                                key={post.id}
                                className="rounded-xl border border-brand-navy/10 p-3"
                              >
                                <p className="text-sm font-bold text-brand-navy">
                                  {post.caption || "Sin caption"}
                                </p>

                                <p className="mt-1 text-xs text-brand-ink/55">
                                  Estado: {post.status} · Modo:{" "}
                                  {post.publish_mode}
                                </p>

                                <div className="mt-3 grid grid-cols-3 gap-2 text-xs sm:grid-cols-6">
                                  {[
                                    ["Views", metrics.views],
                                    ["Likes", metrics.likes],
                                    ["Comentarios", metrics.comments],
                                    ["Shares", metrics.shares],
                                    ["Clicks", metrics.clicks],
                                  ].map(([label, value]) => (
                                    <div key={label}>
                                      <p className="font-bold uppercase tracking-[0.1em] text-brand-ink/35">
                                        {label}
                                      </p>
                                      <p className="font-extrabold text-brand-navy">
                                        {formatNumber(value)}
                                      </p>
                                    </div>
                                  ))}

                                  <div>
                                    <p className="font-bold uppercase tracking-[0.1em] text-brand-ink/35">
                                      CTR
                                    </p>
                                    <p className="font-extrabold text-brand-navy">
                                      {metrics.ctr.toFixed(2)}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}

          <footer className="mt-10 border-t border-brand-navy/8 pt-6 text-center">
            <a
              href="#inicio"
              className="text-sm font-bold text-brand-navy hover:underline"
            >
              ← Volver a la landing
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
