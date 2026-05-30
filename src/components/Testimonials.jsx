import { useState } from "react";
import { TESTIMONIALS } from "../data/constants";
import { useInView } from "../hooks/useInView";

function Testimonials() {
  const [ref, inView] = useInView();
  const [idx, setIdx] = useState(0);

  return (
    <section id="testimonials" ref={ref} style={{ padding: "120px 5%", background: "linear-gradient(135deg, #fff5f7 0%, #fce4ec 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 16 }}>Words from Our <em style={{ fontStyle: "italic", color: "#e91e8c" }}>Sweet Family</em></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testimonial-card card-hover fade-up d${(i % 4) + 1} ${inView ? "visible" : ""}`}>
              {/* Stars */}
              <div style={{ marginBottom: 16, paddingTop: 20 }}>
                {"⭐".repeat(t.stars)}
              </div>
              <p style={{ fontSize: 15, color: "#5a3030", lineHeight: 1.75, marginBottom: 24 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #f48fb1, #e91e8c)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 16,
                }}>{t.initial}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a0a0a" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#c2185b" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
