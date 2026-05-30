import { useState } from "react";
import { GALLERY } from "../data/constants";
import { useInView } from "../hooks/useInView";

function Gallery() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" ref={ref} style={{ padding: "120px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-tag">Gallery</span>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 16 }}>A Feast for the <em style={{ fontStyle: "italic", color: "#e91e8c" }}>Eyes</em></h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>Browse our portfolio of custom cakes, pastry art, and seasonal creations.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {GALLERY.map((item, i) => (
            <div key={i} className={`card-hover fade-up d${(i % 3) + 1} ${inView ? "visible" : ""}`}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                borderRadius: 20, overflow: "hidden", cursor: "pointer", position: "relative",
                height: i === 0 || i === 3 ? 320 : 240,
                background: `linear-gradient(135deg, ${item.color}50, ${item.color}20)`,
                boxShadow: active === i ? `0 16px 48px ${item.color}60` : "0 4px 20px rgba(0,0,0,0.08)",
                border: active === i ? `3px solid ${item.color}` : "3px solid transparent",
                transition: "all 0.3s ease",
              }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 80, filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))", transition: "transform 0.3s ease", transform: active === i ? "scale(1.15)" : "scale(1)" }}>{item.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: "#1a0a0a" }}>{item.label}</div>
              </div>
              {active === i && (
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${item.color}40, transparent)`, display: "flex", alignItems: "flex-end", padding: 20 }}>
                  <button className="btn-primary" onClick={(e) => { e.stopPropagation(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ padding: "10px 22px", borderRadius: 10, fontSize: 13, width: "100%" }}>
                    Order Similar →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
