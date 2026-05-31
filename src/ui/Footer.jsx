import { NAV_LINKS } from "../data/constants";

function Footer() {
  return (
    <footer id="footer" style={{ background: "#1a0a0a", color: "#d4a0a0", padding: "80px 5% 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #f48fb1, #e91e8c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎂</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>Bebe Cakes</div>
                <div style={{ fontSize: 10, color: "#f48fb1", letterSpacing: 2, textTransform: "uppercase" }}>Artisan Bakery</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 24, color: "#a07070" }}>Merajut kelezatan kue dan pastri istimewa dengan cinta, ketelitian, dan bahan alami terbaik sejak 2026.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["📸", "🎵", "💬", "👍"].map((icon, i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", transition: "all 0.3s ease" }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fff", marginBottom: 20 }}>Quick Links</h4>
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} style={{ display: "block", background: "none", border: "none", color: "#a07070", fontSize: 14, cursor: "pointer", padding: "6px 0", transition: "color 0.3s", textAlign: "left" }}>
                → {link}
              </button>
            ))}
          </div>

          {/* Menu Categories */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fff", marginBottom: 20 }}>Our Specialties</h4>
            {["Custom Wedding Cakes", "Birthday Creations", "Cupcake Collections", "Seasonal Pastries", "Corporate Gifting", "Dessert Tables"].map((item) => (
              <div key={item} style={{ fontSize: 14, color: "#a07070", padding: "6px 0" }}>🎂 {item}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fff", marginBottom: 20 }}>Get in Touch</h4>
            {[
              { icon: "📍", text: "Jl. Candi Golf No. 88, Semarang" },
              { icon: "📞", text: "+62 821 3321 3974" },
              { icon: "✉️", text: "hello@bebecakes.id" },
              { icon: "🕐", text: "Senin–Sabtu: 08:00–20:00" },
            ].map((info, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", fontSize: 14, color: "#a07070" }}>
                <span>{info.icon}</span><span>{info.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "#6a3a3a" }}>2025 Bebe Cakes Bakery. All rights reserved.</div>
          <div style={{ fontSize: 13, color: "#6a3a3a" }}>Made with ❤️ & 🧁 in Semarang</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
