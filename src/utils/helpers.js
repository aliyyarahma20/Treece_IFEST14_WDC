export const cls = (...args) => args.filter(Boolean).join(" ");

export const fmt = (n, dec = 0) => Number(n).toFixed(dec);

export const todayStr = () => new Date().toISOString().slice(0, 10);

export const MONTHS = [
  "Jan","Feb","Mar","Apr","Mei","Jun",
  "Jul","Ags","Sep","Okt","Nov","Des",
];

export const WEEKDAYS = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const getStreak = (completions) => {
  let streak = 0;
  const d = new Date();
  while (true) {
    const s = d.toISOString().slice(0, 10);
    if (completions.includes(s)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
};
