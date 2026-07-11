export function isSameCalendarDay(post, year, month, day) {
  return post.year === year && post.month === month && post.day === day;
}

export function getPostsForDay(posts, year, month, day) {
  return posts.filter((post) => {
    return post.year === year && post.month === month && post.day === day;
  });
}

export function getNotesForDay(notes, year, month, day) {
  return notes.filter((note) => {
    if (note.year == null || note.month == null) {
      return note.day === day;
    }

    return note.year === year && note.month === month && note.day === day;
  });
}

export function getPostsForMonth(posts, year, month) {
  return posts.filter((post) => post.year === year && post.month === month);
}

export function getNotesForMonth(notes, year, month) {
  return notes.filter((note) => {
    if (note.year == null || note.month == null) {
      return true;
    }

    return note.year === year && note.month === month;
  });
}

export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startWeekDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < startWeekDay; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(day);
  }

  return days;
}

export function getWeekDays(year, month, selectedDay) {
  const selectedDate = new Date(year, month, selectedDay);
  const dayOfWeek = selectedDate.getDay();

  const startDate = new Date(year, month, selectedDay - dayOfWeek);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      date,
    };
  });
}

export function getMonthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });
}

export function filterPosts(posts, { platform }) {
  if (!platform || platform === "Todas") return posts;

  return posts.filter((post) => post.platform === platform);
}