import { useState } from "react";
import { useProducts } from "../context/ProductsContext";

const ORDER_STATUSES = [
  { id: "new",        label: "Pesanan Diterima",  desc: "Pesananmu sudah kami terima",           icon: "🆕", color: "#2196f3" },
  { id: "processing", label: "Sedang Diproses",   desc: "Tim kami sedang mempersiapkan pesananmu", icon: "👨‍🍳", color: "#ff9800" },
  { id: "ready",      label: "Siap Diambil",      desc: "Pesananmu sudah siap!",                  icon: "📦", color: "#9c27b0" },
  { id: "done",       label: "Selesai",            desc: "Pesanan telah diserahkan. Terima kasih!",icon: "✅", color: "#4caf50" },
  { id: "cancelled",  label: "Dibatalkan",         desc: "Pesanan ini telah dibatalkan",           icon: "❌", color: "#f44336" },
];

const PAY_LABELS = {
  transfer: "🏦 Transfer Bank",
  qris:     "📲 QRIS",
  cod:      "🚚 Bayar di Tempat",
  cc:       "💳 Kartu Kredit",
};

function OrderTracker({ onClose }) {
  const { orders } = useProducts();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null); // null | "not-found" | order object
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const q = query.trim().toUpperCase();
    if (!q) return;
    const found = orders.find(o => o.id === q || o.customer.phone.replace(/\D/g, "").includes(q.replace(/\D/g, "")));
    setResult(found || "not-found");
    setSearched(true);
  };

  const order = result && result !== "not-found" ? result : null;
  const statusIdx = order ? ORDER_STATUSES.findIndex(s => s.id === order.status) : -1;
  const statusInfo = order ? ORDER_STATUSES.find(s => s.id === order.status) : null;
  const isCancelled = order?.status === "cancelled";

  const inputStyle = {
    width: "100%", padding: "13px 18px", borderRadius: 12,
    border: "2px solid #f9c5d1", background: "#fff", fontSize: 15,
    outline: "none", fontFamily: "'DM Mono', monospace", letterSpacing: 1,
    boxSizing: "border-box", textTransform: "uppercase",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2500 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,10,10,0.55)", backdropFilter: "blur(6px)" }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "min(520px, calc(100vw - 32px))", background: "#fffaf9", borderRadius: 24,
        boxShadow: "0 32px 80px rgba(233,30,140,0.2)", maxHeight: "90vh", overflowY: "auto",
        animation: "bounce-in 0.3s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid #fce4ec", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1a0a0a", marginBottom: 4 }}>
              🔍 Lacak Pesananmu
            </h2>
            <p style={{ fontSize: 13, color: "#8a5c5c" }}>Masukkan ID pesanan atau nomor telepon</p>
          </div>
          <button onClick={onClose} style={{ background: "#fce4ec", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#c2185b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }}>✕</button>
        </div>

        <div style={{ padding: "24px 28px" }}>
          {/* Search input */}
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setSearched(false); }}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Contoh: FC123456 atau +628123456789"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#e91e8c"}
              onBlur={e => e.target.style.borderColor = "#f9c5d1"}
            />
            <button onClick={handleSearch} style={{
              padding: "13px 20px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #e91e8c, #f06292)", color: "#fff",
              fontWeight: 700, fontSize: 15, flexShrink: 0,
              boxShadow: "0 4px 16px rgba(233,30,140,0.35)",
            }}>Cari</button>
          </div>

          {/* Not found */}
          {searched && result === "not-found" && (
            <div style={{ marginTop: 24, background: "#ffebee", border: "1px solid #f9c5d1", borderRadius: 16, padding: "20px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>😔</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#c62828", marginBottom: 6 }}>Pesanan tidak ditemukan</div>
              <div style={{ fontSize: 13, color: "#8a5c5c" }}>Pastikan ID pesanan atau nomor telepon sudah benar.</div>
            </div>
          )}

          {/* Order found */}
          {order && (
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Order ID + Current status */}
              <div style={{ background: `${statusInfo?.color}10`, border: `2px solid ${statusInfo?.color}40`, borderRadius: 18, padding: "20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 13, color: "#8a5c5c", marginBottom: 4 }}>Nomor Pesanan</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 28, fontWeight: 900, color: "#e91e8c", letterSpacing: 2, marginBottom: 12 }}>{order.id}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: statusInfo?.bg, color: statusInfo?.color, padding: "8px 18px", borderRadius: 24, fontWeight: 800, fontSize: 15, border: `1.5px solid ${statusInfo?.color}40` }}>
                  {statusInfo?.icon} {statusInfo?.label}
                </div>
                <div style={{ fontSize: 13, color: "#8a5c5c", marginTop: 10 }}>{statusInfo?.desc}</div>
              </div>

              {/* Progress bar — only for non-cancelled */}
              {!isCancelled && (
                <div style={{ background: "#fff", borderRadius: 16, padding: "20px 20px", border: "1px solid #fce4ec" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#1a0a0a", marginBottom: 16 }}>Progress Pesanan</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 0, position: "relative" }}>
                    {ORDER_STATUSES.filter(s => s.id !== "cancelled").map((s, i, arr) => {
                      const sIdx = ORDER_STATUSES.filter(s2 => s2.id !== "cancelled").findIndex(s2 => s2.id === order.status);
                      const done = i <= sIdx;
                      const active = i === sIdx;
                      return (
                        <div key={s.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                          {/* Connector line */}
                          {i > 0 && (
                            <div style={{
                              position: "absolute", top: 16, left: "-50%", width: "100%", height: 3,
                              background: done ? "#e91e8c" : "#fce4ec", zIndex: 0,
                              transition: "background 0.3s",
                            }} />
                          )}
                          {/* Circle */}
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%", zIndex: 1,
                            background: done ? (active ? "#e91e8c" : "#f06292") : "#fce4ec",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: active ? 16 : 14,
                            boxShadow: active ? "0 0 0 4px rgba(233,30,140,0.2)" : "none",
                            transition: "all 0.3s",
                          }}>{done ? (active ? s.icon : "✓") : <span style={{ color: "#ccc", fontSize: 12 }}>{i + 1}</span>}</div>
                          {/* Label */}
                          <div style={{ fontSize: 10, marginTop: 6, color: done ? "#e91e8c" : "#aaa", fontWeight: done ? 700 : 400, textAlign: "center", lineHeight: 1.3 }}>{s.label.split(" ")[0]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customer info */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", border: "1px solid #fce4ec" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#1a0a0a", marginBottom: 10 }}>📋 Detail Pesanan</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#5a3030" }}>
                  <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80 }}>Nama:</span>{order.customer.name}</div>
                  <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80 }}>Telepon:</span>{order.customer.phone}</div>
                  <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80 }}>Acara:</span>{order.customer.occasion}</div>
                  {order.customer.notes && <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80 }}>Catatan:</span>{order.customer.notes}</div>}
                  <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#8a5c5c", fontWeight: 600, minWidth: 80 }}>Pembayaran:</span>{PAY_LABELS[order.payMethod] || order.payMethod}</div>
                </div>
              </div>

              {/* Items */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", border: "1px solid #fce4ec" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#1a0a0a", marginBottom: 10 }}>🧾 Item Pesanan</div>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < order.items.length - 1 ? "1px solid #fce4ec" : "none" }}>
                    <span style={{ fontSize: 13, color: "#5a3030" }}>{item.emoji} {item.name} <span style={{ color: "#aaa" }}>×{item.qty}</span></span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#e91e8c" }}>Rp {item.subtotal.toLocaleString("id-ID")}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, marginTop: 6, borderTop: "1.5px dashed #fce4ec" }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16, color: "#e91e8c" }}>Rp {order.total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div style={{ textAlign: "center", fontSize: 12, color: "#aaa", paddingBottom: 4 }}>
                Ada pertanyaan? Hubungi kami via WhatsApp <strong>+62 274 555 0123</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderTracker;
