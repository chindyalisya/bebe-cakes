import { useInView } from "../hooks/useInView";

function About() {
  const [ref, inView] = useInView();
  const features = [
    { icon: "🌿", title: "100% Natural", desc: "No artificial preservatives or flavors. Only the finest natural ingredients." },
    { icon: "👩‍🍳", title: "Expert Artisans", desc: "Our Le Cordon Bleu trained chefs bring decades of patisserie expertise." },
    { icon: "🎨", title: "Custom Designs", desc: "Every cake is a unique artwork tailored to your vision and occasion." },
    { icon: "🚚", title: "Same-Day Delivery", desc: "Fresh delivery within Semarang & surrounding areas. Order by 12 PM." },
  ];

  return (
    <section id="about" ref={ref} style={{ padding: "120px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Visual side */}
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ position: "relative" }}>
          <div style={{
            background: "linear-gradient(135deg, #fff5f7, #fce4ec)",
            borderRadius: 32, padding: "60px 40px", textAlign: "center",
            boxShadow: "0 20px 60px rgba(244,143,177,0.2)",
          }}>
            <div style={{ fontSize: 120, marginBottom: 20, filter: "drop-shadow(0 10px 20px rgba(233,30,140,0.2))" }}>🎂</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontStyle: "italic", color: "#c2185b" }}>
              "Baking happiness,<br />one slice at a time"
            </div>
          </div>
          {/* Floating card */}
          <div className="float-anim" style={{
            position: "absolute", bottom: -20, right: -20,
            background: "#fff", borderRadius: 20, padding: "20px 28px",
            boxShadow: "0 12px 40px rgba(244,143,177,0.25)",
          }}>
            <div style={{ fontSize: 36 }}>🏆</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1a0a0a", marginTop: 8 }}>50+ Awards</div>
            <div style={{ fontSize: 13, color: "#8a5c5c" }}>Regional & National</div>
          </div>
          {/* Floating pill */}
          <div className="float-anim-2" style={{
            position: "absolute", top: 20, right: -30,
            background: "linear-gradient(135deg, #e91e8c, #f06292)",
            borderRadius: 20, padding: "12px 20px", color: "#fff",
            boxShadow: "0 8px 24px rgba(233,30,140,0.35)",
          }}>
            <div style={{ fontWeight: 700, fontSize: 22 }}>8+ Years</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>of Excellence</div>
          </div>
        </div>

        {/* Text side */}
        <div>
          <div className={`fade-up d1 ${inView ? "visible" : ""}`}>
            <span className="section-tag">Our Story</span>
            <h2 className="section-title" style={{ marginTop: 8, marginBottom: 20 }}>
              A Passion Born<br /><em style={{ fontStyle: "italic", color: "#e91e8c" }}>in the Kitchen</em>
            </h2>
            <p className="section-sub" style={{ marginBottom: 20 }}>
              Founded in 2026 by Chef Chindy Alieisyia, Bebe Cakes began as a small home bakery with one mission: to bring genuine joy through extraordinary pastry craftsmanship.
            </p>
            <p className="section-sub" style={{ marginBottom: 40 }}>
              Today, we are Semarang most beloved artisan bakery — combining classical French techniques with bold, local-inspired flavors that celebrate Indonesia's rich culinary heritage.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className={`fade-up d${i + 1} ${inView ? "visible" : ""}`} style={{
                background: "#fff5f7", borderRadius: 16, padding: "20px",
                border: "1px solid rgba(244,143,177,0.2)",
                transition: "all 0.3s ease",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#1a0a0a", marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#8a5c5c", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
