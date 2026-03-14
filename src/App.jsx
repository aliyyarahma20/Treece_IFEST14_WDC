import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import GlobalStyle from "./components/GlobalStyle.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Topbar from "./components/layout/Topbar.jsx";
import LoginModal from "./components/LoginModal.jsx";

// Pages
import Landing      from "./pages/Landing.jsx";
import Dashboard    from "./pages/Dashboard.jsx";
import TodoPage     from "./pages/TodoPage.jsx";
import TargetPage   from "./pages/TargetPage.jsx";
import RecapPage    from "./pages/RecapPage.jsx";
import NotesPage    from "./pages/NotesPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

const INITIAL_TASKS = [
  { id: 1, name: "Kerjakan laporan Pemweb",       priority: "high",   deadline: "2026-03-12", category: "tugas",  done: false, createdAt: "2026-03-09T00:00:00Z" },
  { id: 2, name: "Baca materi Kalkulus Bab 4",    priority: "medium", deadline: "2026-03-14", category: "kuliah", done: false, createdAt: "2026-03-09T00:00:00Z" },
  { id: 3, name: "Review slide Basis Data",        priority: "low",    deadline: "2026-03-15", category: "kuliah", done: true,  createdAt: "2026-03-08T00:00:00Z" },
  { id: 4, name: "Buat PPT presentasi Alpro",      priority: "high",   deadline: "2026-03-11", category: "tugas",  done: false, createdAt: "2026-03-07T00:00:00Z" },
  { id: 5, name: "Latihan soal UTS Statistika",   priority: "medium", deadline: "2026-03-18", category: "kuliah", done: false, createdAt: "2026-03-10T00:00:00Z" },
];

function AppContent() {
  const [user,      setUser]      = useLocalStorage("sr_user",  null);
  const [tasks,     setTasks]     = useLocalStorage("sr_tasks", INITIAL_TASKS);
  const [view,      setView]      = useState("landing");
  const [page,      setPage]      = useState("dashboard");
  const [sideOpen,  setSideOpen]  = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleEnter = () => {
    if (user) { setView("app"); }
    else       { setShowLogin(true); }
  };

  const handleLogin = (u) => {
    setUser(u);
    setView("app");
  };

  const handleLogout = () => {
    setUser(null);
    setView("landing");
  };

  const PAGE_MAP = {
    dashboard: <Dashboard    tasks={tasks} />,
    todo: <TodoPage tasks={tasks} setTasks={setTasks} user={user} />,
    target:    <TargetPage   />,
    recap:     <RecapPage    />,
    notes:     <NotesPage    />,
    settings:  <SettingsPage />,
  };

  return (
    <>
      <GlobalStyle />

      {view === "landing" ? (
        <Landing onEnter={handleEnter} />
      ) : (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
          <Sidebar
            activePage={page}
            setPage={setPage}
            open={sideOpen}
            onClose={() => setSideOpen(false)}
            user={user}
            onLogout={handleLogout}
          />
          <Topbar page={page} onMenuClick={() => setSideOpen(true)} />
          <main
            style={{
              marginLeft: 220,
              padding: "28px 32px",
              minHeight: "100vh",
            }}
          >
            <style>{`
              @media (max-width: 768px) {
                main { margin-left: 0 !important; padding: 72px 16px 28px !important; }
              }
            `}</style>
            {PAGE_MAP[page]}
          </main>
        </div>
      )}

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
