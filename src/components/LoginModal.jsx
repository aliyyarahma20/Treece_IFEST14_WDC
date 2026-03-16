import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { LogIn, User, Eye, EyeOff, Calendar } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Modal } from "./ui/index.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

export default function LoginModal({ open, onClose, onLogin }) {
  const toast = useToast();
  const { t, lang } = useLanguage();

  const [email,    setEmail]    = useState("");
  const [pass,     setPass]     = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const submit = async () => {
    if (!email || !pass) {
      toast(lang === "id" ? "Lengkapi email dan password!" : "Please fill in email and password!", "error");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    onLogin({ name: email.split("@")[0] || "Pengguna", email });
    toast(lang === "id" ? "Selamat datang kembali!" : "Welcome back!");
    onClose();
  };

  const loginWithGoogle = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.events",
    onSuccess: async (tokenResponse) => {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      const profile = await res.json();
      onLogin({
        name: profile.name,
        email: profile.email,
        avatar: profile.picture,
        accessToken: tokenResponse.access_token,
      });
      onClose();
      toast(`${lang === "id" ? "Selamat datang" : "Welcome"}, ${profile.name}! 👋`);
    },
    onError: () => toast(
      lang === "id" ? "Login Google gagal, coba lagi." : "Google login failed, please try again.",
      "error"
    ),
  });

  return (
    <Modal open={open} onClose={onClose} maxW={400}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "1.5rem", color: "var(--accent)", marginBottom: 4,
        }}>
          Steady<span style={{ color: "var(--highlight)" }}>Rise</span>
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text2)" }}>
          {lang === "id" ? "Masuk untuk melanjutkan" : "Sign in to continue"}
        </div>
      </div>

      {/* Google Login */}
      <button
        onClick={() => loginWithGoogle()}
        style={{
          width: "100%", padding: "10px", borderRadius: 10,
          border: "1.5px solid var(--border)",
          background: "var(--surface2)", color: "var(--text)",
          fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          marginBottom: 6, transition: "all 0.15s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
      >
        <img src="https://www.google.com/favicon.ico" width={16} height={16} alt="Google" />
        {lang === "id" ? "Masuk dengan Google" : "Sign in with Google"}
      </button>

      {/* Info Google Calendar */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 7,
        padding: "8px 10px", borderRadius: 8,
        background: "var(--mute)", border: "1px solid var(--border)",
        marginBottom: 12,
      }}>
        <Calendar size={13} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
        <span style={{ fontSize: "0.74rem", color: "var(--text2)", lineHeight: 1.45 }}>
          {lang === "id"
            ? "Login dengan Google untuk mengaktifkan sinkronisasi otomatis ke Google Calendar."
            : "Sign in with Google to enable automatic sync with your Google Calendar."}
        </span>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>
          {lang === "id" ? "atau masuk dengan email" : "or sign in with email"}
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {/* Email + Password Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          type="email"
          icon={<User size={15} />}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{
            fontSize: "0.76rem", fontWeight: 600,
            color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder={lang === "id" ? "Masukkan password" : "Enter password"}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              style={{
                width: "100%", padding: "10px 40px 10px 14px",
                border: "1.5px solid var(--border)", borderRadius: 10,
                background: "var(--surface2)", color: "var(--text)",
                fontSize: "0.88rem", outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={() => setShowPass((p) => !p)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                color: "var(--text3)", display: "flex",
              }}
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <Button
          onClick={submit}
          size="md"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={loading}
        >
          {!loading && <LogIn size={15} />}
          {loading ? t.common.loading : t.auth.loginBtn}
        </Button>
      </div>
    </Modal>
  );
}