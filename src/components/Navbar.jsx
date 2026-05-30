import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/constants";
import { useScrollSpy } from "../hooks/useScrollSpy";

function Navbar({ cartCount, onCartOpen, onTrackOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,250,249,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(244,143,177,0.15)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #f48fb1, #e91e8c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎂</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a0a0a", lineHeight: 1.1 }}>Bebe Cakes</div>
              <div style={{ fontSize: 10, color: "#f06292", letterSpacing: 2, textTransform: "uppercase" }}>Artisan Bakery</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hide-mobile" style={{ display: "flex", gap: 32, listStyle: "none" }}>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button onClick={() => scrollTo(link)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: active === link ? 600 : 400,
                  color: active === link ? "#e91e8c" : "#5a3030",
                  position: "relative", padding: "4px 0",
                  transition: "color 0.3s",
                }}>
                  {link}
                  {active === link && (
                    <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "#e91e8c", borderRadius: 1 }} />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={onCartOpen} style={{
              position: "relative", background: "#fff0f3", border: "none", borderRadius: 12, padding: "8px 16px",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#c2185b", fontWeight: 600,
              transition: "all 0.3s ease",
            }}>
              🛒 <span className="hide-mobile">Keranjang</span>
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -6, right: -6, background: "#e91e8c", color: "#fff",
                  width: 20, height: 20, borderRadius: "50%", fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "bounce-in 0.3s ease",
                }}>{cartCount}</span>
              )}
            </button>
            <button onClick={onTrackOrder} style={{
              background: "none", border: "1.5px solid #f9c5d1", borderRadius: 12, padding: "8px 16px",
              cursor: "pointer", fontSize: 13, color: "#c2185b", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.3s ease",
            }} className="hide-mobile">
              📦 Lacak Pesanan
            </button>
            <button onClick={() => scrollTo("contact")} className="btn-primary hide-mobile" style={{ padding: "10px 24px", borderRadius: 12, fontSize: 14 }}>
              Order Now
            </button>
            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 24 }} className="show-mobile">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(255,250,249,0.98)", backdropFilter: "blur(12px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
          animation: "slide-in 0.3s ease",
        }}>
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 600,
              color: active === link ? "#e91e8c" : "#1a0a0a",
            }}>{link}</button>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
