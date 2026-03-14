const SESSION_KEY = "sr_session";
const SESSION_DURATION = 1 * 60 * 60 * 1000; // 1 jam

export function createSession() {
  const session = {
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
    lastPage: "dashboard",
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function saveLastPage(page) {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const session = JSON.parse(raw);
    session.lastPage = page;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {}
}