import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { CATEGORIES } from "../data/constants";

const EMOJI_OPTIONS = ["🎂","🧁","🍰","🌹","💜","🍓","🍵","🌸","🍋","🏰","🫐","🎉","💍","🍩","🍪","🥐","🍫","🍬","🥧","🎁"];
const COLOR_OPTIONS = ["#f9c5d1","#ddb0e8","#ffb3ba","#b5e4c0","#f7b3c8","#ffe0b2","#f5d0a9","#c8b4e8","#ffd6e0","#d4f1f9"];
const BADGE_OPTIONS = ["", "Best Seller", "New", "Popular", "Limited", "Premium"];

const MENU_CATEGORIES = CATEGORIES.filter((c) => c !== "All");

const EMPTY_PRODUCT = {
  name: "", cat: "Cakes", price: "", badge: "", color: "#f9c5d1",
  emoji: "🎂", desc: "", imageUrl: "",
};

const ORDER_STATUSES = [
  { id: "new",        label: "Baru",      color: "#2196f3", bg: "#e3f2fd", icon: "🆕" },
  { id: "processing", label: "Diproses",  color: "#ff9800", bg: "#fff3e0", icon: "⏳" },
  { id: "ready",      label: "Siap",      color: "#9c27b0", bg: "#f3e5f5", icon: "📦" },
  { id: "done",       label: "Selesai",   color: "#4caf50", bg: "#e8f5e9", icon: "✅" },
  { id: "cancelled",  label: "Dibatalkan",color: "#f44336", bg: "#ffebee", icon: "❌" },
];

const PAY_LABELS = {
  transfer: "🏦 Transfer Bank",
  qris:     "📲 QRIS",
  cod:      "🚚 COD",
  cc:       "💳 Kartu Kredit",
};

// ── Stat Card ──────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "24px 28px",
      boxShadow: "0 2px 16px rgba(233,30,140,0.08)",
      border: "1px solid rgba(249,197,209,0.3)",
      display: "flex", alignItems: "center", gap: 18,
    }}>
      <div style={{ width: 52, height: 52, borderRadius: 16, background: `${color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#1a0a0a", fontFamily: "'Playfair Display', serif" }}>{value}</div>
        <div style={{ fontSize: 13, color: "#8a5c5c", marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

// ── Product Form Modal ─────────────────────────────────────
function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || EMPTY_PRODUCT);
  const [imgPreview, setImgPreview] = useState(product?.imageUrl || "");
  const [tab, setTab] = useState("info");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgPreview(ev.target.result);
      setForm((f) => ({ ...f, imageUrl: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price.trim()) return;
    onSave({ ...form, imageUrl: imgPreview });
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10,
    border: "1.5px solid #f9c5d1", background: "#fffaf9",
    fontSize: 14, color: "#1a0a0a", outline: "none",
    fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,10,10,0.6)", backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "relative", background: "#fffaf9", borderRadius: 24,
        width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(233,30,140,0.2)", animation: "bounce-in 0.3s ease",
      }}>
        <div style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fffaf9", zIndex: 1, borderBottom: "1px solid #fce4ec", paddingBottom: 16 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1a0a0a" }}>
            {product ? "✏️ Edit Menu" : "➕ Tambah Menu Baru"}
          </h2>
          <button onClick={onClose} style={{ background: "#fce4ec", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#c2185b", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ display: "flex", gap: 0, padding: "0 28px", borderBottom: "1px solid #fce4ec" }}>
          {[["info", "📋 Info"], ["appearance", "🎨 Tampilan"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "12px 20px", background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
              color: tab === key ? "#e91e8c" : "#8a5c5c",
              borderBottom: `2px solid ${tab === key ? "#e91e8c" : "transparent"}`,
              marginBottom: -1, transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          {tab === "info" ? (
            <>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Nama Menu *</label>
                <input name="name" value={form.name} onChange={handle} placeholder="Contoh: Rose Velvet Dream" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Deskripsi</label>
                <textarea name="desc" value={form.desc} onChange={handle} rows={3} placeholder="Deskripsi singkat menu..." style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Harga *</label>
                  <input name="price" value={form.price} onChange={handle} placeholder="Rp 150.000" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Kategori</label>
                  <select name="cat" value={form.cat} onChange={handle} style={{ ...inputStyle, cursor: "pointer" }}>
                    {MENU_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Badge Label</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {BADGE_OPTIONS.map((b) => (
                    <button key={b} onClick={() => setForm({ ...form, badge: b })} style={{
                      padding: "6px 14px", borderRadius: 20, border: "1.5px solid",
                      borderColor: form.badge === b ? "#e91e8c" : "#f9c5d1",
                      background: form.badge === b ? "#e91e8c" : "#fff",
                      color: form.badge === b ? "#fff" : "#8a5c5c",
                      cursor: "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s",
                    }}>{b || "— Tidak ada —"}</button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Foto Menu</label>
                <div style={{ border: "2px dashed #f9c5d1", borderRadius: 16, padding: 20, textAlign: "center", background: "#fff5f7", position: "relative" }}>
                  {imgPreview ? (
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <img src={imgPreview} alt="preview" style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 12, objectFit: "cover" }} />
                      <button onClick={() => { setImgPreview(""); setForm((f) => ({ ...f, imageUrl: "" })); }} style={{
                        position: "absolute", top: -10, right: -10, background: "#e91e8c", border: "none",
                        borderRadius: "50%", width: 28, height: 28, cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 14,
                      }}>✕</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 40, marginBottom: 10 }}>📷</div>
                      <p style={{ fontSize: 13, color: "#8a5c5c", marginBottom: 12 }}>Upload foto menu (JPG, PNG, WebP)</p>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageFile} style={{ display: "none" }} id="img-upload" />
                  <label htmlFor="img-upload" style={{
                    display: "inline-block", padding: "9px 20px", borderRadius: 10,
                    background: "#e91e8c", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13,
                    marginTop: imgPreview ? 12 : 0,
                  }}>{imgPreview ? "Ganti Foto" : "Pilih Foto"}</label>
                </div>
                <div style={{ marginTop: 10 }}>
                  <input name="imageUrl" value={imgPreview && !imgPreview.startsWith("data:") ? form.imageUrl : ""} onChange={(e) => { setImgPreview(e.target.value); setForm((f) => ({ ...f, imageUrl: e.target.value })); }} placeholder="Atau masukkan URL gambar..." style={{ ...inputStyle, fontSize: 13 }}
                    onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Emoji (jika tidak ada foto)</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {EMOJI_OPTIONS.map((em) => (
                    <button key={em} onClick={() => setForm({ ...form, emoji: em })} style={{
                      width: 44, height: 44, borderRadius: 12, border: "2px solid",
                      borderColor: form.emoji === em ? "#e91e8c" : "#f9c5d1",
                      background: form.emoji === em ? "#fce4ec" : "#fff",
                      fontSize: 22, cursor: "pointer", transition: "all 0.2s",
                    }}>{em}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Warna Kartu</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  {COLOR_OPTIONS.map((col) => (
                    <button key={col} onClick={() => setForm({ ...form, color: col })} style={{
                      width: 36, height: 36, borderRadius: "50%", background: col, border: `3px solid ${form.color === col ? "#e91e8c" : "transparent"}`,
                      cursor: "pointer", outline: form.color === col ? "2px solid #e91e8c" : "none", outlineOffset: 2, transition: "all 0.2s",
                    }} />
                  ))}
                  <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0 }} title="Pilih warna custom" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Preview Kartu</label>
                <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(244,143,177,0.15)", maxWidth: 220 }}>
                  <div style={{ height: 130, background: `${form.color}40`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {imgPreview ? (
                      <img src={imgPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 56 }}>{form.emoji}</span>
                    )}
                    {form.badge && (
                      <span style={{ position: "absolute", top: 8, left: 8, background: "#e91e8c", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{form.badge}</span>
                    )}
                  </div>
                  <div style={{ padding: "14px 14px 16px" }}>
                    <div style={{ fontSize: 10, color: "#e91e8c", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{form.cat}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#1a0a0a", marginTop: 4 }}>{form.name || "Nama Menu"}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#e91e8c", marginTop: 8 }}>{form.price || "Rp 0"}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "13px", borderRadius: 12, border: "1.5px solid #f9c5d1", background: "#fff", color: "#8a5c5c", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Batal</button>
            <button onClick={handleSave} style={{ flex: 2, padding: "13px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #e91e8c, #f06292)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(233,30,140,0.3)" }}>
              {product ? "💾 Simpan Perubahan" : "✨ Tambah Menu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm ─────────────────────────────────────────
function DeleteConfirm({ product, onConfirm, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,10,10,0.6)", backdropFilter: "blur(6px)" }} />
      <div style={{ position: "relative", background: "#fffaf9", borderRadius: 24, padding: 36, maxWidth: 400, width: "100%", boxShadow: "0 32px 80px rgba(0,0,0,0.2)", textAlign: "center", animation: "bounce-in 0.3s ease" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🗑️</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1a0a0a", marginBottom: 10 }}>Hapus Menu?</h3>
        <p style={{ color: "#8a5c5c", fontSize: 14, marginBottom: 28 }}>
          Menu <strong style={{ color: "#1a0a0a" }}>"{product.name}"</strong> akan dihapus permanen dan tidak bisa dikembalikan.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1.5px solid #f9c5d1", background: "#fff", color: "#8a5c5c", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Batal</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #e53935, #ef5350)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Hapus</button>
        </div>
      </div>
    </div>
  );
}

// ── Order Detail Modal ─────────────────────────────────────
function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  // Baris statusInfo sudah dihapus karena tidak dipakai
  const dateStr = new Date(order.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,10,10,0.6)", backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "relative", background: "#fffaf9", borderRadius: 24,
        width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(233,30,140,0.2)", animation: "bounce-in 0.3s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #fce4ec", position: "sticky", top: 0, background: "#fffaf9", zIndex: 1 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#1a0a0a", marginBottom: 4 }}>Detail Pesanan</h2>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 800, color: "#e91e8c" }}>{order.id}</div>
            <div style={{ fontSize: 12, color: "#8a5c5c", marginTop: 4 }}>{dateStr}</div>
          </div>
          <button onClick={onClose} style={{ background: "#fce4ec", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#c2185b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status Update */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "1px solid #fce4ec" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 12 }}>Status Pesanan</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ORDER_STATUSES.map(s => (
                <button key={s.id} onClick={() => onUpdateStatus(order.id, s.id)} style={{
                  padding: "7px 14px", borderRadius: 20, border: `2px solid ${order.status === s.id ? s.color : "#f9c5d1"}`,
                  background: order.status === s.id ? s.bg : "#fff",
                  color: order.status === s.id ? s.color : "#8a5c5c",
                  cursor: "pointer", fontWeight: 700, fontSize: 12, transition: "all 0.2s",
                }}>{s.icon} {s.label}</button>
              ))}
            </div>
          </div>

          {/* Customer */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "1px solid #fce4ec" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 10 }}>📋 Data Pemesan</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#5a3030" }}>
              <div><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80, display: "inline-block" }}>Nama:</span> {order.customer.name}</div>
              <div><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80, display: "inline-block" }}>Telepon:</span> {order.customer.phone}</div>
              {order.customer.email && <div><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80, display: "inline-block" }}>Email:</span> {order.customer.email}</div>}
              <div><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80, display: "inline-block" }}>Acara:</span> {order.customer.occasion}</div>
              {order.customer.notes && <div><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80, display: "inline-block" }}>Catatan:</span> {order.customer.notes}</div>}
            </div>
          </div>

          {/* Items */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "1px solid #fce4ec" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 10 }}>🧾 Item Pesanan</div>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < order.items.length - 1 ? "1px solid #fce4ec" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#1a0a0a" }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#8a5c5c" }}>{item.price} × {item.qty}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#e91e8c" }}>Rp {item.subtotal.toLocaleString("id-ID")}</div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "2px dashed #fce4ec" }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: "#e91e8c" }}>Rp {order.total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Payment */}
          <div style={{ background: "#fff0f5", borderRadius: 16, padding: 18, border: "1px solid #fce4ec" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a" }}>Metode Pembayaran</div>
            <div style={{ fontSize: 14, color: "#5a3030", marginTop: 6 }}>{PAY_LABELS[order.payMethod] || order.payMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────
function AdminDashboard({ onLogout, onViewStore }) {
  const { products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus } = useProducts();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebar, setSidebar] = useState("menu");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSearch, setOrderSearch] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || p.cat === catFilter;
    return matchSearch && matchCat;
  });

  const filteredOrders = orders.filter((o) => {
    const matchStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    const q = orderSearch.toLowerCase();
    const matchSearch = !q || o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q) || o.customer.phone.includes(q);
    return matchStatus && matchSearch;
  });

  const handleSave = (form) => {
    if (modal.mode === "add") { addProduct(form); showToast("✅ Menu berhasil ditambahkan!"); }
    else { updateProduct(modal.product.firestoreId, form); showToast("✅ Menu berhasil diperbarui!"); }
    setModal(null);
  };

  const handleDelete = () => {
    deleteProduct(deleteTarget.firestoreId);
    showToast("🗑 Menu berhasil dihapus.");
    setDeleteTarget(null);
  };

  const handleStatusUpdate = (orderId, status) => {
    updateOrderStatus(orderId, status);
    const label = ORDER_STATUSES.find(s => s.id === status)?.label || status;
    showToast(`✅ Status pesanan diubah ke "${label}"`);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status }));
    }
  };

  const sidebarItems = [
    { id: "menu", icon: "🍰", label: "Kelola Menu" },
    { id: "orders", icon: "📋", label: "Pesanan Masuk", badge: orders.filter(o => o.status === "new").length },
  ];

  const inputStyle2 = {
    width: "100%", padding: "11px 14px 11px 42px", borderRadius: 12,
    border: "1.5px solid #f9c5d1", background: "#fff", fontSize: 14,
    outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#f8f0f2" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, background: "linear-gradient(180deg, #1a0a0a 0%, #2d1010 100%)",
        display: "flex", flexDirection: "column",
        boxShadow: "4px 0 24px rgba(0,0,0,0.15)", flexShrink: 0,
      }}>
        <div style={{ padding: "28px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #f48fb1, #e91e8c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎂</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Frosty Cake</div>
              <div style={{ fontSize: 10, color: "#f48fb1", letterSpacing: 1.5, textTransform: "uppercase" }}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "20px 12px" }}>
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setSidebar(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", borderRadius: 12, border: "none", cursor: "pointer",
              background: sidebar === item.id ? "rgba(233,30,140,0.2)" : "transparent",
              color: sidebar === item.id ? "#f48fb1" : "rgba(255,255,255,0.5)",
              fontSize: 14, fontWeight: sidebar === item.id ? 700 : 400, fontFamily: "'DM Sans', sans-serif",
              marginBottom: 4, transition: "all 0.2s", textAlign: "left",
              borderLeft: sidebar === item.id ? "3px solid #e91e8c" : "3px solid transparent",
              justifyContent: "space-between",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>{item.label}
              </span>
              {item.badge > 0 && (
                <span style={{ background: "#e91e8c", color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 800, padding: "2px 8px", minWidth: 20, textAlign: "center" }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={onLogout} style={{
            width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid rgba(233,30,140,0.3)",
            background: "rgba(233,30,140,0.08)", color: "#f48fb1", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
          }}>
            <span>🚪</span> Keluar
          </button>
          <button onClick={onViewStore} style={{
            width: "100%", marginTop: 8, padding: "11px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10,
          }}>
            <span>🌐</span> Lihat Toko
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>

        {sidebar === "menu" ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#1a0a0a", marginBottom: 4 }}>Kelola Menu 🍰</h1>
                <p style={{ fontSize: 14, color: "#8a5c5c" }}>Tambah, edit, atau hapus item menu toko</p>
              </div>
              <button onClick={() => setModal({ mode: "add" })} style={{
                padding: "13px 24px", borderRadius: 14, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #e91e8c, #f06292)", color: "#fff",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15,
                boxShadow: "0 4px 20px rgba(233,30,140,0.35)", display: "flex", alignItems: "center", gap: 8,
              }}>
                ＋ Tambah Menu Baru
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
              <StatCard icon="🍰" label="Total Menu" value={products.length} color="#f9c5d1" />
              <StatCard icon="🎂" label="Kue" value={products.filter(p => p.cat === "Cakes").length} color="#ddb0e8" />
              <StatCard icon="🧁" label="Cupcakes" value={products.filter(p => p.cat === "Cupcakes").length} color="#ffb3ba" />
              <StatCard icon="🥐" label="Pastries" value={products.filter(p => p.cat === "Pastries").length} color="#ffe0b2" />
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ position: "relative", flex: "1 1 240px" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>🔍</span>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama menu..." style={inputStyle2} />
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["All", ...MENU_CATEGORIES].map((c) => (
                  <button key={c} onClick={() => setCatFilter(c)} style={{
                    padding: "9px 18px", borderRadius: 24, border: "none", cursor: "pointer",
                    background: catFilter === c ? "linear-gradient(135deg, #e91e8c, #f06292)" : "#fff",
                    color: catFilter === c ? "#fff" : "#8a5c5c",
                    fontWeight: 600, fontSize: 13, boxShadow: catFilter === c ? "0 4px 12px rgba(233,30,140,0.25)" : "0 2px 6px rgba(0,0,0,0.06)",
                    transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                  }}>{c}</button>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(233,30,140,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 120px 110px 100px 120px", padding: "14px 20px", background: "#fff5f7", borderBottom: "1px solid #fce4ec" }}>
                {["", "Nama Menu", "Kategori", "Harga", "Badge", "Aksi"].map((h) => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#c2185b", textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</div>
                ))}
              </div>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#8a5c5c" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                  <p>Tidak ada menu yang ditemukan.</p>
                </div>
              ) : filtered.map((product) => (
                <div key={product.firestoreId} style={{ display: "grid", gridTemplateColumns: "64px 1fr 120px 110px 100px 120px", padding: "14px 20px", borderBottom: "1px solid #fce4ec", alignItems: "center", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fffaf9"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${product.color}30`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {product.imageUrl ? <img src={product.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 24 }}>{product.emoji}</span>}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1a0a0a" }}>{product.name}</div>
                    <div style={{ fontSize: 12, color: "#8a5c5c", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 240 }}>{product.desc}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "#5a3030" }}>{product.cat}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14, color: "#e91e8c" }}>{product.price}</div>
                  <div>
                    {product.badge ? (
                      <span style={{ background: "#fce4ec", color: "#c2185b", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{product.badge}</span>
                    ) : <span style={{ color: "#ddd", fontSize: 12 }}>—</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setModal({ mode: "edit", product })} style={{ padding: "6px 14px", borderRadius: 10, border: "none", background: "#fce4ec", color: "#c2185b", cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>✏️ Edit</button>
                    <button onClick={() => setDeleteTarget(product)} style={{ padding: "6px 10px", borderRadius: 10, border: "none", background: "#ffebee", color: "#e53935", cursor: "pointer", fontSize: 13 }}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ── Orders Tab ── */
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#1a0a0a", marginBottom: 4 }}>Pesanan Masuk 📋</h1>
                <p style={{ fontSize: 14, color: "#8a5c5c" }}>Kelola dan pantau status pesanan dari pelanggan</p>
              </div>
            </div>

            {/* Order Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Total", value: orders.length, color: "#e91e8c", icon: "📋" },
                { label: "Baru", value: orders.filter(o => o.status === "new").length, color: "#2196f3", icon: "🆕" },
                { label: "Diproses", value: orders.filter(o => o.status === "processing").length, color: "#ff9800", icon: "⏳" },
                { label: "Siap", value: orders.filter(o => o.status === "ready").length, color: "#9c27b0", icon: "📦" },
                { label: "Selesai", value: orders.filter(o => o.status === "done").length, color: "#4caf50", icon: "✅" },
              ].map(s => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", boxShadow: "0 2px 12px rgba(233,30,140,0.07)", border: "1px solid rgba(249,197,209,0.3)", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#8a5c5c" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter + Search */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ position: "relative", flex: "1 1 220px" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>🔍</span>
                <input value={orderSearch} onChange={e => setOrderSearch(e.target.value)} placeholder="Cari ID / nama / telepon..." style={inputStyle2} />
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setOrderStatusFilter("all")} style={{
                  padding: "8px 16px", borderRadius: 24, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12,
                  background: orderStatusFilter === "all" ? "linear-gradient(135deg,#e91e8c,#f06292)" : "#fff",
                  color: orderStatusFilter === "all" ? "#fff" : "#8a5c5c",
                  boxShadow: orderStatusFilter === "all" ? "0 4px 12px rgba(233,30,140,0.25)" : "0 2px 6px rgba(0,0,0,0.06)",
                }}>Semua</button>
                {ORDER_STATUSES.map(s => (
                  <button key={s.id} onClick={() => setOrderStatusFilter(s.id)} style={{
                    padding: "8px 16px", borderRadius: 24, cursor: "pointer", fontWeight: 600, fontSize: 12,
                    background: orderStatusFilter === s.id ? s.bg : "#fff",
                    color: orderStatusFilter === s.id ? s.color : "#8a5c5c",
                    border: orderStatusFilter === s.id ? `1.5px solid ${s.color}` : "1.5px solid transparent",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}>{s.icon} {s.label}</button>
                ))}
              </div>
            </div>

            {/* Orders list */}
            {filteredOrders.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 20, padding: "80px 40px", textAlign: "center", boxShadow: "0 2px 16px rgba(233,30,140,0.08)" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1a0a0a", marginBottom: 8 }}>
                  {orders.length === 0 ? "Belum ada pesanan" : "Tidak ada pesanan ditemukan"}
                </h3>
                <p style={{ color: "#8a5c5c" }}>
                  {orders.length === 0 ? "Pesanan dari pelanggan akan tampil di sini setelah checkout" : "Coba ubah filter atau kata kunci pencarian"}
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filteredOrders.map((order) => {
                  const statusInfo = ORDER_STATUSES.find(s => s.id === order.status);
                  const dateStr = new Date(order.createdAt).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" });
                  return (
                    <div key={order.id} onClick={() => setSelectedOrder(order)}
                      style={{ background: "#fff", borderRadius: 16, padding: "18px 22px", boxShadow: "0 2px 12px rgba(233,30,140,0.07)", border: "1px solid #fce4ec", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(233,30,140,0.15)"; e.currentTarget.style.borderColor = "#f9c5d1"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(233,30,140,0.07)"; e.currentTarget.style.borderColor = "#fce4ec"; }}>

                      {/* Order ID + date */}
                      <div style={{ flex: "0 0 auto" }}>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 800, fontSize: 16, color: "#e91e8c" }}>{order.id}</div>
                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{dateStr}</div>
                      </div>

                      {/* Customer */}
                      <div style={{ flex: 1, minWidth: 140 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a" }}>{order.customer.name}</div>
                        <div style={{ fontSize: 12, color: "#8a5c5c", marginTop: 2 }}>{order.customer.phone}</div>
                      </div>

                      {/* Items summary */}
                      <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ fontSize: 13, color: "#5a3030" }}>
                          {order.items.map(i => `${i.emoji} ${i.name} ×${i.qty}`).join(", ").slice(0, 60)}{order.items.length > 1 ? "..." : ""}
                        </div>
                      </div>

                      {/* Total */}
                      <div style={{ flex: "0 0 auto", textAlign: "right" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16, color: "#e91e8c" }}>Rp {order.total.toLocaleString("id-ID")}</div>
                        <div style={{ fontSize: 11, color: "#8a5c5c", marginTop: 2 }}>{PAY_LABELS[order.payMethod]?.split(" ").slice(1).join(" ") || order.payMethod}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <span style={{
                          padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                          background: statusInfo?.bg, color: statusInfo?.color,
                          border: `1.5px solid ${statusInfo?.color}40`,
                        }}>{statusInfo?.icon} {statusInfo?.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {modal && <ProductModal product={modal.product} onSave={handleSave} onClose={() => setModal(null)} />}
      {deleteTarget && <DeleteConfirm product={deleteTarget} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />}
      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={handleStatusUpdate} />}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #e91e8c, #f06292)", color: "#fff",
          padding: "13px 26px", borderRadius: 14, fontWeight: 600, fontSize: 15,
          boxShadow: "0 8px 28px rgba(233,30,140,0.4)", zIndex: 4000,
          animation: "bounce-in 0.3s ease", whiteSpace: "nowrap",
        }}>{toast}</div>
      )}
    </div>
  );
}

export default AdminDashboard;