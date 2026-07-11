import { useMemo, useState } from "react";

function getDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function getPostDate(post) {
  const rawDate =
    post.scheduled_at ||
    post.publish_at ||
    post.published_at ||
    post.created_at;

  if (!rawDate) return null;

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) return null;

  return date;
}



function buildCalendarDays(posts = [], amount = 10) {
  const today = new Date();

  const postsByDate = posts.reduce((acc, post) => {
    const date = getPostDate(post);

    if (!date) return acc;

    const key = getDateKey(date);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(post);

    return acc;
  }, {});

  return Array.from({ length: amount }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const key = getDateKey(date);
    const dayPosts = postsByDate[key] || [];

    const scheduledCount = dayPosts.filter(
      (post) => post.status === "scheduled"
    ).length;

    const publishedCount = dayPosts.filter(
      (post) => post.status === "published"
    ).length;

    const failedCount = dayPosts.filter(
      (post) => post.status === "failed"
    ).length;

    const totalCount = dayPosts.length;

    let label = "Sin posts";

    if (totalCount > 0) {
      if (scheduledCount > 0) {
        label = `${scheduledCount} programado${scheduledCount === 1 ? "" : "s"}`;
      } else if (publishedCount > 0) {
        label = `${publishedCount} publicado${publishedCount === 1 ? "" : "s"}`;
      } else if (failedCount > 0) {
        label = `${failedCount} fallido${failedCount === 1 ? "" : "s"}`;
      } else {
        label = `${totalCount} post${totalCount === 1 ? "" : "s"}`;
      }
    }

    return {
      id: key,
      date,
      dayLabel: date.toLocaleDateString("es-AR", { weekday: "short" }),
      dayNumber: date.getDate(),
      month: date.toLocaleDateString("es-AR", { month: "short" }),
      posts: dayPosts,
      schedule: {
        total: totalCount,
        scheduled: scheduledCount,
        published: publishedCount,
        failed: failedCount,
        label,
      },
    };
  });
}

export default function CalendarStrip({ posts = [] }) {
  const days = useMemo(() => buildCalendarDays(posts, 10), [posts]);
  const [selectedId, setSelectedId] = useState(days[0]?.id ?? "");

  const selectedDay = days.find((day) => day.id === selectedId);

  return (
    <section className="mb-6" aria-label="Calendario editorial">
      <div className="flex items-center justify-between gap-3 px-0.5 pb-3">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand-ink/45">
          Calendario
        </h2>

        <a
          href="#calendario"
          className="text-xs font-bold text-brand-navy hover:underline"
        >
          Ver calendario completo →
        </a>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-thin">
        {days.map((day) => {
          const isSelected = day.id === selectedId;
          const dotCount = day.schedule.total;

          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setSelectedId(day.id)}
              className={`min-w-[88px] shrink-0 rounded-2xl border px-3 py-3 text-left transition ${
                isSelected
                  ? "border-brand-navy bg-brand-navy text-white shadow-soft"
                  : "border-brand-navy/8 bg-white text-brand-ink shadow-sm hover:border-brand-navy/20 hover:shadow-soft"
              }`}
            >
              <p
                className={`text-[11px] font-bold uppercase tracking-wide ${
                  isSelected ? "text-white/70" : "text-brand-ink/45"
                }`}
              >
                {day.dayLabel}
              </p>

              <p className="mt-0.5 font-display text-2xl font-extrabold leading-none">
                {day.dayNumber}
              </p>

              <p
                className={`mt-1 text-[10px] font-semibold capitalize ${
                  isSelected ? "text-white/55" : "text-brand-ink/38"
                }`}
              >
                {day.month}
              </p>

              <div className="mt-2 flex min-h-[18px] items-center gap-1">
                {dotCount > 0 ? (
                  <>
                    {Array.from({ length: Math.min(dotCount, 3) }).map(
                      (_, index) => (
                        <span
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? "bg-white/80" : "bg-brand-navy/50"
                          }`}
                        />
                      )
                    )}

                    <span
                      className={`ml-0.5 text-[10px] font-bold ${
                        isSelected ? "text-white/75" : "text-brand-ink/50"
                      }`}
                    >
                      {day.schedule.label}
                    </span>
                  </>
                ) : (
                  <span
                    className={`text-[10px] font-bold ${
                      isSelected ? "text-white/60" : "text-brand-ink/40"
                    }`}
                  >
                    {day.schedule.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedDay?.posts?.length > 0 && (
        <div className="mt-3 rounded-2xl border border-brand-navy/10 bg-white p-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-ink/45">
            Posts del día
          </p>

          <div className="mt-3 space-y-2">
            {selectedDay.posts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-brand-navy/8 px-3 py-2"
              >
                <p className="text-sm font-bold text-brand-navy">
                  {post.caption || "Sin caption"}
                </p>

                <p className="mt-1 text-xs text-brand-ink/55">
                  Estado: {post.status || "sin estado"} · Modo:{" "}
                  {post.publish_mode || "sin modo"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}