import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section style={{ background: "linear-gradient(135deg, #e91e8c 0%, #f06292 50%, #ce93d8 100%)", padding: "80px 5%", textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🍰</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#fff", marginBottom: 12 }}>Stay Sweet with Us</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 32 }}>Subscribe for exclusive recipes, seasonal specials, and 10% off your first order.</p>
        {done ? (
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 16, padding: "16px 32px", color: "#fff", fontWeight: 600, fontSize: 16 }}>🎉 Thank you! Check your inbox for your discount code.</div>
        ) : (
          <div style={{ display: "flex", gap: 12, maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={{ flex: "1 1 240px", padding: "14px 20px", borderRadius: 12, border: "none", fontSize: 15, background: "rgba(255,255,255,0.95)" }} />
            <button className="btn-primary" onClick={() => { if (email) setDone(true); }} style={{ padding: "14px 28px", borderRadius: 12, background: "#fff", color: "#e91e8c", fontSize: 15 }}>Subscribe</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
