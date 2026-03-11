const BASE = "https://www.googleapis.com/calendar/v3";

// Buat event di Google Calendar
export async function createCalendarEvent(accessToken, { summary, description, date, time }) {
  // Gabungkan date + time jika ada, fallback ke seharian
  const hasTime = !!time;
  const start = hasTime
    ? { dateTime: `${date}T${time}:00`, timeZone: "Asia/Jakarta" }
    : { date };
  const end = hasTime
    ? { dateTime: `${date}T${String(Number(time.split(":")[0]) + 1).padStart(2,"0")}:${time.split(":")[1]}:00`, timeZone: "Asia/Jakarta" }
    : { date };

  const res = await fetch(`${BASE}/calendars/primary/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ summary, description, start, end }),
  });

  return res.json();
}