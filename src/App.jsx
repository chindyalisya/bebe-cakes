import { useState } from "react";

// Context
import { ProductsProvider, useProducts } from "./context/ProductsContext";

// Styles
import GlobalStyles from "./styles/GlobalStyles";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

// Components (sections)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";

// UI (shared/floating)
import CartDrawer from "./ui/CartDrawer";
import OrderTracker from "./ui/OrderTracker";
import Toast from "./ui/Toast";
import ScrollTop from "./ui/ScrollTop";
import Footer from "./ui/Footer";

// Inner app that has access to context
function AppInner() {
  // ── SEMUA hooks harus di atas, SEBELUM kondisi apapun ──
  const { placeOrder, loading } = useProducts();
  const [page, setPage] = useState("storefront");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [orderTrackerOpen, setOrderTrackerOpen] = useState(false);

  // ── Baru boleh return kondisional SETELAH semua hooks ──
  if (loading) return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "100vh", fontFamily: "'DM Sans', sans-serif",
      background: "#fff5f7", flexDirection: "column", gap: 16,
    }}>
        <img src="/logo.png" alt="Bebe Cakes" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} />
      <p style={{ color: "#e91e8c", fontWeight: 600, fontSize: 18 }}>Memuat data...</p>
    </div>
  );

  const addToCart = (product) => {
    const pid = product.firestoreId || product.id;
    setCart((prev) => {
      const existing = prev.find((p) => (p.firestoreId || p.id) === pid);
      if (existing) return prev.map((p) => (p.firestoreId || p.id) === pid ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`🎂 ${product.name} ditambahkan ke keranjang!`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => (p.firestoreId || p.id) !== id));

  const changeQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart((prev) => prev.map((p) => (p.firestoreId || p.id) === id ? { ...p, qty } : p));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      setToast(has ? "Dihapus dari wishlist" : "❤️ Ditambahkan ke wishlist!");
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const handleOrderPlace = ({ cart, orderForm, payMethod, total }) => {
    const orderId = placeOrder({ cart, orderForm, payMethod, total });
    return orderId;
  };

  const cartCount = cart.reduce((s, p) => s + p.qty, 0);

  return (
    <>
      <GlobalStyles />

      {page === "admin-login" && (
        <AdminLogin onLogin={() => setPage("admin")} />
      )}

      {page === "admin" && (
        <AdminDashboard onLogout={() => setPage("storefront")} onViewStore={() => setPage("storefront")} />
      )}

      {page === "storefront" && (
        <>
          <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onTrackOrder={() => setOrderTrackerOpen(true)} />
          <Hero onAddToCart={addToCart} />
          <About />
          <Menu onAddToCart={addToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
          <Gallery />
          <Testimonials />
          <Team />
          <Contact />
          <Newsletter />
          <Footer />

          {cartOpen && (
            <CartDrawer
              cart={cart}
              onClose={() => setCartOpen(false)}
              onRemove={removeFromCart}
              onQtyChange={changeQty}
              onOrderPlace={handleOrderPlace}
              onClearCart={clearCart}
            />
          )}
          {orderTrackerOpen && <OrderTracker onClose={() => setOrderTrackerOpen(false)} />}
          <Toast msg={toast} onDone={() => setToast("")} />
          <ScrollTop />

          <button
            onClick={() => setPage("admin-login")}
            title="Admin Panel"
            style={{
              position: "fixed", bottom: 32, left: 32, zIndex: 1400,
              width: 46, height: 46, borderRadius: "50%",
              background: "rgba(26,10,10,0.75)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(244,143,177,0.25)",
              cursor: "pointer", fontSize: 20, color: "#f48fb1",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e91e8c"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,10,10,0.75)"; e.currentTarget.style.color = "#f48fb1"; }}
          >
            ⚙️
          </button>
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <ProductsProvider>
      <AppInner />
    </ProductsProvider>
  );
}
