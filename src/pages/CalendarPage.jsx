import { useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarWeekView from "../components/calendar/CalendarWeekView";
import CalendarKpiCard from "../components/calendar/CalendarKpiCard";
import DayDetailPanel from "../components/calendar/DayDetailPanel";
import ScheduleContentForm from "../components/calendar/ScheduleContentForm";
import AddNoteForm from "../components/calendar/AddNoteForm";
import {
  CALENDAR_YEAR,
  CALENDAR_MONTH,
  MOCK_TODAY,
  calendarKpis,
  scheduledPosts as initialPosts,
  calendarNotes as initialNotes,
  filterPosts,
  getMonthLabel,
  getNotesForDay,
  getPostsForDay,
} from "../data/calendarMockData";

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [year, setYear] = useState(CALENDAR_YEAR);
  const [month, setMonth] = useState(CALENDAR_MONTH);
  const [selectedDay, setSelectedDay] = useState(14);
  const [viewMode, setViewMode] = useState("Mes");
  const [platformFilter, setPlatformFilter] = useState("Todas");
  const [posts, setPosts] = useState(initialPosts);
  const [notes, setNotes] = useState(initialNotes);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const filteredPosts = useMemo(
    () => filterPosts(posts, { platform: platformFilter }),
    [posts, platformFilter],
  );

  const dayPosts = getPostsForDay(filteredPosts, selectedDay);
  const dayNotes = getNotesForDay(notes, selectedDay);
  const monthLabel = getMonthLabel(year, month);

  function goToToday() {
    setYear(CALENDAR_YEAR);
    setMonth(CALENDAR_MONTH);
    setSelectedDay(MOCK_TODAY);
  }

  function changeMonth(delta) {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
    setSelectedDay(1);
  }

  function handleSavePost(data) {
    const platform = data.platform === "YouTube" ? "YouTube" : data.platform;
    setPosts((prev) => [
      ...prev,
      {
        id: Date.now(),
        day: data.day,
        time: data.time,
        title: data.title,
        type: data.type,
        platform,
        account: data.account,
      },
    ]);
    setSelectedDay(data.day);
    setScheduleOpen(false);
  }

  function handleSaveNote(data) {
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        day: data.day,
        text: data.text,
        category: data.category,
      },
    ]);
    setSelectedDay(data.day);
    setNoteOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-brand-ink">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage="calendario" />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <CalendarHeader
            onMenuToggle={() => setSidebarOpen(true)}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSchedule={() => setScheduleOpen(true)}
            onAddNote={() => setNoteOpen(true)}
          />

          <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Resumen del calendario">
            {calendarKpis.map((kpi) => (
              <CalendarKpiCard key={kpi.id} {...kpi} />
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

          <footer className="mt-10 border-t border-brand-navy/8 pt-6 text-center">
            <a href="#inicio" className="text-sm font-bold text-brand-navy hover:underline">
              ← Volver a la landing
            </a>
          </footer>
        </main>
      </div>

      <ScheduleContentForm
        open={scheduleOpen}
        selectedDay={selectedDay}
        onClose={() => setScheduleOpen(false)}
        onSave={handleSavePost}
      />

      <AddNoteForm
        open={noteOpen}
        selectedDay={selectedDay}
        onClose={() => setNoteOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
}
