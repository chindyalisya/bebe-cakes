import { useState } from "react";
import { CATEGORIES } from "../data/constants";
import { useProducts } from "../context/ProductsContext";
import { useInView } from "../hooks/useInView";

function Menu({ onAddToCart, wishlist, onToggleWishlist }) {
  const { products } = useProducts();
  const [cat, setCat] = useState("All");
  const [ref, inView] = useInView();
  const filtered = cat === "All" ? products : products.filter((p) => p.cat === cat);

  return (
    <section id="menu" ref={ref} style={{ padding: "120px 5%", background: "linear-gradient(180deg, #fff0f3 0%, #fffaf9 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-tag">Our Menu</span>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 16 }}>Handcrafted with <em style={{ fontStyle: "italic", color: "#e91e8c" }}>Heart</em></h2>
          <p className="section-sub" style={{ margin: "0 auto 40px" }}>Each creation is made fresh daily using premium ingredients and a whole lot of love.</p>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: "10px 24px", borderRadius: 24, border: "none", cursor: "pointer",
                background: cat === c ? "linear-gradient(135deg, #e91e8c, #f06292)" : "#fff",
                color: cat === c ? "#fff" : "#8a5c5c",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
                boxShadow: cat === c ? "0 4px 16px rgba(233,30,140,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {filtered.map((product, i) => (
            <div key={product.firestoreId} className={`product-card card-hover fade-up d${(i % 4) + 1} ${inView ? "visible" : ""}`}>
              {/* Image */}
              <div className="img-area" style={{ background: `${product.color}30` }}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ fontSize: 80, filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}>{product.emoji}</div>
                )}
                {/* Badge */}
                {product.badge && (
                  <span style={{
                    position: "absolute", top: 12, left: 12,
                    background: product.badge === "New" ? "#e91e8c" : product.badge === "Limited" ? "#9c27b0" : product.badge === "Premium" ? "#ff6f00" : "#e91e8c",
                    color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                  }}>{product.badge}</span>
                )}
                {/* Wishlist */}
                <button onClick={() => onToggleWishlist(product.firestoreId)} style={{
                  position: "absolute", top: 12, right: 12, background: "#fff",
                  border: "none", borderRadius: "50%", width: 36, height: 36,
                  cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transition: "transform 0.2s ease",
                }}>
                  {wishlist.includes(product.firestoreId) ? "❤️" : "🤍"}
                </button>
                {/* Quick add overlay */}
                <div className="quick-add" onClick={() => onAddToCart(product)} style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(0deg, rgba(233,30,140,0.92), transparent)",
                  padding: "16px", opacity: 0, transform: "translateY(8px)",
                  transition: "all 0.3s ease", cursor: "pointer", display: "flex", justifyContent: "center",
                }}>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, letterSpacing: 0.5 }}>+ Add to Cart</span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "20px" }}>
                <div style={{ fontSize: 12, color: "#e91e8c", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{product.cat}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: "#1a0a0a", marginBottom: 8 }}>{product.name}</h3>
                <p style={{ fontSize: 13, color: "#8a5c5c", lineHeight: 1.6, marginBottom: 16 }}>{product.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#e91e8c" }}>{product.price}</span>
                  <button className="btn-primary" onClick={() => onAddToCart(product)} style={{ padding: "9px 20px", borderRadius: 12, fontSize: 13 }}>
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#8a5c5c" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🍰</div>
            <p>Tidak ada menu dalam kategori ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
