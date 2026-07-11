import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarWeekView from "../components/calendar/CalendarWeekView";
import CalendarKpiCard from "../components/calendar/CalendarKpiCard";
import DayDetailPanel from "../components/calendar/DayDetailPanel";
import ScheduleContentForm from "../components/calendar/ScheduleContentForm";
import { createScheduledPost } from "../services/postSchedulingService";
import AddNoteForm from "../components/calendar/AddNoteForm";
import { getCalendarPosts } from "../services/calendarService";
import {
  filterPosts,
  getMonthLabel,
  getNotesForDay,
  getPostsForDay,
} from "../utils/calendarUtils";
import {
  getCalendarNotes,
  createCalendarNote,
} from "../services/calendarNotesService";

const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth();
const CURRENT_DAY = TODAY.getDate();

function getPostsForCurrentMonth(posts, year, month) {
  return posts.filter((post) => post.year === year && post.month === month);
}

function buildCalendarKpis(posts, year, month) {
  const monthPosts = getPostsForCurrentMonth(posts, year, month);

  const scheduled = monthPosts.filter((post) => {
    const status = String(post.status || "").toLowerCase();
    return status.includes("pendiente") || status.includes("programado");
  });

  const published = monthPosts.filter((post) => {
    const status = String(post.status || "").toLowerCase();
    return status.includes("publicado");
  });

  const failed = monthPosts.filter((post) => {
    const status = String(post.status || "").toLowerCase();
    return (
      status.includes("falló") ||
      status.includes("fallo") ||
      status.includes("failed")
    );
  });

  const platforms = new Set(
    monthPosts.map((post) => post.platform).filter(Boolean),
  );

  return [
    {
      id: "scheduled",
      label: "Programadas",
      value: scheduled.length,
      helper: "Este mes",
      icon: "📅",
    },
    {
      id: "published",
      label: "Publicadas",
      value: published.length,
      helper: "Este mes",
      icon: "✅",
    },
    {
      id: "failed",
      label: "Con error",
      value: failed.length,
      helper: "Revisar",
      icon: "⚠️",
    },
    {
      id: "platforms",
      label: "Plataformas",
      value: platforms.size,
      helper: "Activas",
      icon: "🔗",
    },
  ];
}

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [selectedDay, setSelectedDay] = useState(CURRENT_DAY);
  const [viewMode, setViewMode] = useState("Mes");
  const [platformFilter, setPlatformFilter] = useState("Todas");
  const [posts, setPosts] = useState([]);
  const [notes, setNotes] = useState([]);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [calendarError, setCalendarError] = useState("");
  const [accountFilter, setAccountFilter] = useState("Todas");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setCalendarError("");

        const realPosts = await getCalendarPosts({ year, month });

        setPosts(realPosts);
      } catch (error) {
        console.error(error);
        setCalendarError("No se pudieron cargar las publicaciones reales.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [year, month]);

  async function loadCalendarData(targetYear = year, targetMonth = month) {
    try {
      setLoading(true);
      setCalendarError("");

      const [realPosts, realNotes] = await Promise.all([
        getCalendarPosts({ year: targetYear, month: targetMonth }),
        getCalendarNotes({ year: targetYear, month: targetMonth }),
      ]);

      setPosts(realPosts);
      setNotes(realNotes);
    } catch (error) {
      console.error(error);
      setCalendarError(
        "No se pudieron cargar los datos reales del calendario.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCalendarData(year, month);
  }, [year, month]);

  const filteredPosts = useMemo(() => {
    let result = filterPosts(posts, { platform: platformFilter });

    if (accountFilter !== "Todas") {
      result = result.filter((post) => post.account === accountFilter);
    }

    return result;
  }, [posts, platformFilter, accountFilter]);

  const dayPosts = useMemo(
    () => getPostsForDay(filteredPosts, year, month, selectedDay),
    [filteredPosts, year, month, selectedDay],
  );

  const dayNotes = useMemo(
    () => getNotesForDay(notes, year, month, selectedDay),
    [notes, year, month, selectedDay],
  );
  const monthLabel = getMonthLabel(year, month);

  const calendarKpis = useMemo(
    () => buildCalendarKpis(posts, year, month),
    [posts, year, month],
  );

  const accounts = useMemo(() => {
    return Array.from(
      new Set(
        posts
          .map((post) => post.account)
          .filter(Boolean)
          .filter((account) => account !== "Cuenta sin nombre"),
      ),
    );
  }, [posts]);

  function goToToday() {
    setYear(CURRENT_YEAR);
    setMonth(CURRENT_MONTH);
    setSelectedDay(CURRENT_DAY);
  }

  function changeMonth(delta) {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
    setSelectedDay(1);
  }

  async function handleSavePost(data) {
    try {
      const createdCalendarItems = await createScheduledPost(data);
      const firstItem = createdCalendarItems[0];

      if (firstItem) {
        const changedMonth =
          firstItem.year !== year || firstItem.month !== month;

        setYear(firstItem.year);
        setMonth(firstItem.month);
        setSelectedDay(firstItem.day);

        if (!changedMonth) {
          await loadCalendarData(year, month);
        }
      } else {
        await loadCalendarData(year, month);
      }

      setScheduleOpen(false);
    } catch (error) {
      console.error(error);
      setCalendarError("No se pudo programar el contenido.");
    }
  }

  async function handleSaveNote(data) {
    try {
      const createdNote = await createCalendarNote({
        year: data.year,
        month: data.month,
        day: data.day,
        text: data.text,
        category: data.category,
      });

      setNotes((prev) => [...prev, createdNote]);
      setYear(createdNote.year);
      setMonth(createdNote.month);
      setSelectedDay(createdNote.day);
      setNoteOpen(false);
    } catch (error) {
      console.error(error);
      setCalendarError("No se pudo guardar la nota.");
    }
  }
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-brand-ink">
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage="calendario"
      />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <CalendarHeader
            onMenuToggle={() => setSidebarOpen(true)}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSchedule={() => setScheduleOpen(true)}
            onAddNote={() => setNoteOpen(true)}
            accounts={accounts}
            accountFilter={accountFilter}
            onAccountChange={setAccountFilter}
          />

          {calendarError && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {calendarError}
            </div>
          )}

          <section
            className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4"
            aria-label="Resumen del calendario"
          >
            {calendarKpis.map((kpi) => (
              <CalendarKpiCard
                key={kpi.id}
                {...kpi}
              />
            ))}
          </section>

          <CalendarToolbar
            platform={platformFilter}
            monthLabel={monthLabel}
            onPlatformChange={setPlatformFilter}
            onToday={goToToday}
            onPrevMonth={() => changeMonth(-1)}
            onNextMonth={() => changeMonth(1)}
          />

          {loading ? (
            <div className="rounded-3xl border border-brand-navy/8 bg-white p-8 text-center text-sm font-semibold text-brand-ink/60 shadow-sm">
              Cargando publicaciones reales...
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[1fr_minmax(280px,340px)]">
              <div className="min-w-0 overflow-x-auto">
                {viewMode === "Mes" ? (
                  <CalendarGrid
                    year={year}
                    month={month}
                    selectedDay={selectedDay}
                    posts={filteredPosts}
                    notes={notes}
                    onSelectDay={setSelectedDay}
                  />
                ) : (
                  <CalendarWeekView
                    year={year}
                    month={month}
                    selectedDay={selectedDay}
                    posts={filteredPosts}
                    notes={notes}
                    onSelectDay={setSelectedDay}
                  />
                )}
              </div>

              <DayDetailPanel
                year={year}
                month={month}
                day={selectedDay}
                posts={dayPosts}
                notes={dayNotes}
                onSchedule={() => setScheduleOpen(true)}
                onAddNote={() => setNoteOpen(true)}
              />
            </div>
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

      <ScheduleContentForm
        open={scheduleOpen}
        year={year}
        month={month}
        selectedDay={selectedDay}
        onClose={() => setScheduleOpen(false)}
        onSave={handleSavePost}
      />

      <AddNoteForm
        open={noteOpen}
        year={year}
        month={month}
        selectedDay={selectedDay}
        onClose={() => setNoteOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
}
