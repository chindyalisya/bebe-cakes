import { useState, useEffect } from "react";
import { HERO_SLIDES, STATS } from "../data/constants";

function Hero({ onAddToCart }) {
  const [slide, setSlide] = useState(0);
  const s = HERO_SLIDES[slide];

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", paddingTop: 72 }}>
      {/* Animated BG */}
      <div className="hero-bg" style={{
        position: "absolute", inset: 0, background: s.bg,
        transition: "background 1.2s ease",
        zIndex: 0,
      }} />

      {/* Decorative blobs */}
      <div className="float-anim" style={{ position: "absolute", top: "10%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: "rgba(249,197,209,0.35)", filter: "blur(60px)", zIndex: 0 }} />
      <div className="float-anim-2" style={{ position: "absolute", bottom: "15%", left: "5%", width: 250, height: 250, borderRadius: "50%", background: "rgba(221,176,232,0.3)", filter: "blur(50px)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "60px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap", minHeight: "calc(100vh - 72px)" }}>
        {/* Text */}
        <div style={{ flex: "1 1 480px", maxWidth: 560 }}>
          <span className="section-tag" style={{ animation: "bounce-in 0.5s ease" }}>{s.tag}</span>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            fontWeight: 700, lineHeight: 1.15, color: "#1a0a0a",
            marginTop: 12, marginBottom: 20,
            whiteSpace: "pre-line",
          }}>{s.title}</h1>
          <p style={{ fontSize: 17, color: "#6b3c3c", lineHeight: 1.75, marginBottom: 40, maxWidth: 460 }}>{s.desc}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 36px", borderRadius: 14, fontSize: 16, letterSpacing: 0.5 }}>
              {s.cta} →
            </button>
            <button className="btn-outline" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 36px", borderRadius: 14, fontSize: 16 }}>
              Our Story
            </button>
          </div>

          {/* Slide dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} style={{
                width: i === slide ? 32 : 8, height: 8, borderRadius: 4,
                background: i === slide ? "#e91e8c" : "#f9c5d1",
                border: "none", cursor: "pointer", transition: "all 0.4s ease",
              }} />
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          <div className="float-anim" style={{ fontSize: 180, userSelect: "none", filter: "drop-shadow(0 20px 40px rgba(233,30,140,0.2))", lineHeight: 1, textAlign: "center" }}>
            {s.emoji}
          </div>
          {/* Floating badges */}
          <div className="float-anim-2" style={{ position: "absolute", top: "5%", right: "0%", background: "#fff", borderRadius: 16, padding: "12px 20px", boxShadow: "0 8px 32px rgba(244,143,177,0.3)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>⭐</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1a0a0a" }}>4.9/5.0</div>
              <div style={{ fontSize: 12, color: "#8a5c5c" }}>12K+ Reviews</div>
            </div>
          </div>
          <div className="float-anim-3" style={{ position: "absolute", bottom: "10%", left: "0%", background: "#fff", borderRadius: 16, padding: "12px 20px", boxShadow: "0 8px 32px rgba(244,143,177,0.3)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🚚</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a0a0a" }}>Free Delivery</div>
              <div style={{ fontSize: 12, color: "#8a5c5c" }}>Orders 500K+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(244,143,177,0.2)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 5%", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#e91e8c" }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "#8a5c5c", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
