import { TEAM } from "../data/constants";
import { useInView } from "../hooks/useInView";

function Team() {
  const [ref, inView] = useInView();

  return (
    <section id="team" ref={ref} style={{ padding: "120px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-tag">Our Team</span>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 16 }}>The Artists Behind <em style={{ fontStyle: "italic", color: "#e91e8c" }}>the Magic</em></h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>Meet our passionate team of pastry chefs and cake designers who make every creation extraordinary.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {TEAM.map((member, i) => (
            <div key={i} className={`team-card card-hover fade-up d${i + 1} ${inView ? "visible" : ""}`}>
              <div style={{ height: 200, background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: 100, height: 100, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${member.color}, ${member.color}bb)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, fontWeight: 700, color: "#fff",
                  boxShadow: `0 8px 32px ${member.color}60`,
                  fontFamily: "'Playfair Display', serif",
                }}>{member.initial}</div>
              </div>
              <div style={{ padding: "24px 20px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1a0a0a", marginBottom: 6 }}>{member.name}</h3>
                <div style={{ fontSize: 13, color: "#e91e8c", fontWeight: 600, marginBottom: 8 }}>{member.role}</div>
                <div style={{ fontSize: 13, color: "#8a5c5c" }}>{member.exp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
