import { useState } from "react";

// Kredensial admin (dalam produksi nyata: gunakan backend + JWT)
const ADMIN_CREDENTIALS = { username: "admin", password: "bebecakes2026" };

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (form.username === ADMIN_CREDENTIALS.username && form.password === ADMIN_CREDENTIALS.password) {
        onLogin();
      } else {
        setError("Username atau password salah.");
        setLoading(false);
      }
    }, 900);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1a0a0a 0%, #2d1010 40%, #1a0818 100%)",
      position: "relative", overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(221,176,232,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Floating cake emojis */}
      {["🎂", "🧁", "🌸", "🍰"].map((e, i) => (
        <div key={i} style={{
          position: "absolute", fontSize: 28, opacity: 0.12, userSelect: "none",
          top: `${15 + i * 20}%`, left: i % 2 === 0 ? `${5 + i * 3}%` : "auto",
          right: i % 2 !== 0 ? `${5 + i * 3}%` : "auto",
          animation: `float ${3.5 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
        }}>{e}</div>
      ))}

      <div style={{
        background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 28, padding: "52px 48px", width: "100%", maxWidth: 440,
        boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        position: "relative", zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 68, height: 68, borderRadius: "50%",
            background: "linear-gradient(135deg, #f48fb1, #e91e8c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, margin: "0 auto 16px",
            boxShadow: "0 8px 32px rgba(233,30,140,0.4)",
          }}>🎂</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#fff", marginBottom: 6 }}>Admin Panel</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>Bebe Cakes Bakery Management</p>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Username */}
          <div>
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Username</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 17, opacity: 0.5 }}>👤</span>
              <input
                name="username" value={form.username} onChange={handle}
                placeholder="admin" autoComplete="username"
                style={{
                  width: "100%", padding: "14px 16px 14px 46px", borderRadius: 12,
                  background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontSize: 15, outline: "none", transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#e91e8c"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 17, opacity: 0.5 }}>🔒</span>
              <input
                name="password" value={form.password} onChange={handle}
                type={showPass ? "text" : "password"} placeholder="••••••••" autoComplete="current-password"
                style={{
                  width: "100%", padding: "14px 46px 14px 46px", borderRadius: 12,
                  background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontSize: 15, outline: "none", transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#e91e8c"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", fontSize: 16, opacity: 0.5,
              }}>{showPass ? "🙈" : "👁"}</button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "rgba(233,30,140,0.15)", border: "1px solid rgba(233,30,140,0.3)", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#f48fb1", display: "flex", alignItems: "center", gap: 8 }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            marginTop: 8, padding: "15px", borderRadius: 14, border: "none", cursor: loading ? "not-allowed" : "pointer",
            background: loading ? "rgba(233,30,140,0.4)" : "linear-gradient(135deg, #e91e8c 0%, #f06292 100%)",
            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
            boxShadow: loading ? "none" : "0 8px 24px rgba(233,30,140,0.4)",
            transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            {loading ? (
              <><span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin-slow 0.7s linear infinite" }} /> Logging in...</>
            ) : "Masuk ke Dashboard →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
