import { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

const ToastCtx = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = (msg, type = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3200);
  };

  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="scale-in"
            style={{
              background: t.type === "error" ? "var(--highlight)" : "var(--accent)",
              color: t.type === "error" ? "#fff" : "var(--bg)",
              padding: "12px 18px",
              borderRadius: 12,
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow: "var(--shadow-lg)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              maxWidth: 300,
            }}
          >
            {t.type === "error" ? (
              <AlertCircle size={16} />
            ) : (
              <CheckCircle2 size={16} />
            )}
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
