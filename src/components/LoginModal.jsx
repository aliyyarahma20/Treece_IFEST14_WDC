import { useState } from "react";
import { LogIn, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { Modal } from "./ui/index.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

export default function LoginModal({ open, onClose, onLogin }) {
  const toast = useToast();
  const [email,   setEmail]   = useState("");
  const [pass,    setPass]    = useState("");
  const [showPass,setShowPass]= useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !pass) { toast("Lengkapi email dan password!", "error"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    onLogin({ name: email.split("@")[0] || "Pengguna", email });
    toast("Selamat datang kembali!");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxW={420}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "1.6rem",
            color: "var(--accent)",
            marginBottom: 6,
          }}
        >
          Steady<span style={{ color: "var(--orange)" }}>Rise</span>
        </div>
        <div style={{ fontSize: "0.88rem", color: "var(--text2)" }}>
          Masuk untuk melanjutkan
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          type="email"
          icon={<User size={16} />}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        {/* Password field with toggle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text2)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Masukkan password"
              onKeyDown={(e) => e.key === "Enter" && submit()}
              style={{
                width: "100%",
                padding: "11px 40px 11px 14px",
                border: "1.5px solid var(--border)",
                borderRadius: 10,
                background: "var(--surface2)",
                color: "var(--text)",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
            <button
              onClick={() => setShowPass((p) => !p)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text3)",
                display: "flex",
              }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Button
          onClick={submit}
          size="md"
          style={{ width: "100%", marginTop: 4 }}
          disabled={loading}
        >
          {loading ? <span>...</span> : <LogIn size={16} />}
          {loading ? "Masuk..." : "Masuk"}
        </Button>

        <div style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text3)" }}>
          Belum punya akun?{" "}
          <span style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}>
            Daftar gratis
          </span>
        </div>
      </div>
    </Modal>
  );
}
