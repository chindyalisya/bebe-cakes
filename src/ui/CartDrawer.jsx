import { useState } from "react";

const PAYMENT_METHODS = [
  { id: "transfer", icon: "🏦", label: "Transfer Bank", detail: "BCA · BNI · Mandiri · BRI" },
  { id: "qris", icon: "📲", label: "QRIS", detail: "GoPay · OVO · Dana · ShopeePay" },
  { id: "cod", icon: "🚚", label: "Bayar di Tempat", detail: "Hanya untuk area Semarang" },
  { id: "cc", icon: "💳", label: "Kartu Kredit/Debit", detail: "Visa · Mastercard · JCB" },
];

const BANK_ACCOUNTS = [
  { bank: "BCA", no: "1234 5678 9012", name: "Bebe Cakes Bakery" },
  { bank: "BNI", no: "9876 5432 1000", name: "Bebe Cakes Bakery" },
  { bank: "Mandiri", no: "1170 0087 6543 21", name: "Bebe Cakes Bakery" },
];

// step: "cart" → "custom-order" → "payment" → "confirm"
const STEPS = ["cart", "custom-order", "payment", "confirm"];
const STEP_LABELS = { "cart": "Keranjang", "custom-order": "Data Pesanan", "payment": "Pembayaran", "confirm": "Selesai" };

function CartDrawer({ cart, onClose, onRemove, onQtyChange, onOrderPlace, onClearCart }) {
  const [step, setStep] = useState("cart");
  const [payMethod, setPayMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState(BANK_ACCOUNTS[0]);
  const [copied, setCopied] = useState(false);
  const [ccForm, setCcForm] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", email: "", occasion: "Birthday", notes: "" });
  const [orderFormError, setOrderFormError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState(null);

  const total = cart.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/\D/g, ""));
    return sum + num * item.qty;
  }, 0);

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text.replace(/\s/g, "")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceed = () => {
    if (step === "cart") { setStep("custom-order"); return; }
    if (step === "custom-order") {
      if (!orderForm.name.trim() || !orderForm.phone.trim()) {
        setOrderFormError("Nama dan nomor telepon wajib diisi.");
        return;
      }
      setOrderFormError("");
      setStep("payment");
      return;
    }
    if (step === "payment" && payMethod) {
      // Place order when moving to confirm
      const orderId = onOrderPlace({ cart, orderForm, payMethod, total });
      setPlacedOrderId(orderId);
      setStep("confirm");
    }
  };

  const handleBack = () => {
    if (step === "custom-order") setStep("cart");
    if (step === "payment") setStep("custom-order");
    if (step === "confirm") setStep("payment");
  };

  const handleFinish = () => {
    if (onClearCart) onClearCart();
    onClose();
    setStep("cart");
    setPayMethod(null);
    setOrderForm({ name: "", phone: "", email: "", occasion: "Birthday", notes: "" });
    setPlacedOrderId(null);
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: "1.5px solid #f9c5d1", background: "#fffaf9", fontSize: 14,
    outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000 }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,10,10,0.5)", backdropFilter: "blur(4px)" }} />

      {/* Drawer */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "min(460px, 100vw)",
        background: "#fffaf9", boxShadow: "-20px 0 60px rgba(244,143,177,0.2)",
        display: "flex", flexDirection: "column", animation: "slide-in 0.3s ease",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #fce4ec", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: step !== "cart" ? 12 : 0 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, color: "#1a0a0a", display: "flex", alignItems: "center", gap: 8 }}>
              {step === "cart" && "🛒 Keranjang"}
              {step === "custom-order" && "📋 Data Pesanan"}
              {step === "payment" && "💳 Metode Pembayaran"}
              {step === "confirm" && "✅ Konfirmasi"}
            </h2>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#8a5c5c", lineHeight: 1 }}>✕</button>
          </div>

          {/* Step indicator */}
          {step !== "cart" && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "nowrap", overflowX: "auto" }}>
              {STEPS.filter(s => s !== "cart").map((s, i, arr) => {
                const globalIdx = STEPS.indexOf(s);
                const currentIdx = STEPS.indexOf(step);
                const done = currentIdx > globalIdx;
                const active = step === s;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: active || done ? "#e91e8c" : "#f9c5d1",
                      color: "#fff",
                    }}>{done ? "✓" : i + 1}</div>
                    <span style={{ fontSize: 11, color: active ? "#e91e8c" : "#8a5c5c", fontWeight: active ? 700 : 400 }}>{STEP_LABELS[s]}</span>
                    {i < arr.length - 1 && <div style={{ width: 16, height: 1, background: "#f9c5d1", marginRight: 2 }} />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* ── STEP 1: Cart Items ── */}
          {step === "cart" && (
            <div style={{ padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🎂</div>
                  <p style={{ color: "#8a5c5c", fontSize: 15 }}>Keranjang kosong.<br />Tambahkan produk favoritmu!</p>
                </div>
              ) : cart.map((item) => (
                <div key={item.firestoreId || item.id} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #fce4ec" }}>
                  <div style={{ width: 60, height: 60, borderRadius: 12, background: `${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, overflow: "hidden" }}>
                    {item.imageUrl ? <img src={item.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1a0a0a", marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 14, color: "#e91e8c", marginBottom: 8 }}>{item.price}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => onQtyChange(item.firestoreId || item.id, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid #f9c5d1", background: "none", cursor: "pointer", fontWeight: 700, color: "#e91e8c" }}>−</button>
                      <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center", fontSize: 15 }}>{item.qty}</span>
                      <button onClick={() => onQtyChange(item.firestoreId || item.id, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid #f9c5d1", background: "none", cursor: "pointer", fontWeight: 700, color: "#e91e8c" }}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 24 }}>
                      Rp {(parseInt(item.price.replace(/\D/g, "")) * item.qty).toLocaleString("id-ID")}
                    </div>
                    <button onClick={() => onRemove(item.firestoreId || item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#f48fb1" }}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── STEP 2: Data Pesanan ── */}
          {step === "custom-order" && (
            <div style={{ padding: "20px 24px" }}>
              <p style={{ fontSize: 13, color: "#8a5c5c", marginBottom: 20 }}>
                Lengkapi data diri dan detail pesanan kamu sebelum melanjutkan ke pembayaran.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Nama Lengkap *</label>
                  <input value={orderForm.name} onChange={e => setOrderForm({ ...orderForm, name: e.target.value })} placeholder="Contoh: Siti Rahma" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Nomor Telepon / WhatsApp *</label>
                  <input value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} placeholder="+62 812 xxxx xxxx" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Email</label>
                  <input type="email" value={orderForm.email} onChange={e => setOrderForm({ ...orderForm, email: e.target.value })} placeholder="email@contoh.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Acara / Kesempatan</label>
                  <select value={orderForm.occasion} onChange={e => setOrderForm({ ...orderForm, occasion: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                    {["Birthday", "Wedding", "Anniversary", "Corporate Event", "Baby Shower", "Other"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#8a5c5c", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "block" }}>Catatan Tambahan</label>
                  <textarea value={orderForm.notes} onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })}
                    placeholder="Tuliskan desain, rasa, ukuran, tanggal pengambilan, atau permintaan khusus lainnya..."
                    rows={4} style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#e91e8c"} onBlur={e => e.target.style.borderColor = "#f9c5d1"} />
                </div>
                {orderFormError && (
                  <div style={{ background: "#ffebee", border: "1px solid #f9c5d1", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#c62828", fontWeight: 600 }}>
                    ⚠️ {orderFormError}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 3: Pilih Metode Pembayaran ── */}
          {step === "payment" && (
            <div style={{ padding: "20px 24px" }}>
              <p style={{ fontSize: 13, color: "#8a5c5c", marginBottom: 16 }}>Pilih metode pembayaran untuk melanjutkan pesananmu</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PAYMENT_METHODS.map((m) => (
                  <button key={m.id} onClick={() => setPayMethod(m.id)} style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", borderRadius: 16,
                    border: `2px solid ${payMethod === m.id ? "#e91e8c" : "#f9c5d1"}`,
                    background: payMethod === m.id ? "#fff0f5" : "#fff",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                    boxShadow: payMethod === m.id ? "0 4px 16px rgba(233,30,140,0.15)" : "none",
                  }}>
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#1a0a0a", fontFamily: "'DM Sans', sans-serif" }}>{m.label}</div>
                      <div style={{ fontSize: 12, color: "#8a5c5c", marginTop: 3 }}>{m.detail}</div>
                    </div>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", border: `2px solid ${payMethod === m.id ? "#e91e8c" : "#f9c5d1"}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {payMethod === m.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e91e8c" }} />}
                    </div>
                  </button>
                ))}
              </div>

              {payMethod === "cc" && (
                <div style={{ marginTop: 20, padding: 18, background: "#fff5f7", borderRadius: 14, border: "1px solid #fce4ec" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 14 }}>Detail Kartu</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <input value={ccForm.number} onChange={e => setCcForm({...ccForm, number: e.target.value})} placeholder="Nomor Kartu (16 digit)" maxLength={19} style={inputStyle} />
                    <input value={ccForm.name} onChange={e => setCcForm({...ccForm, name: e.target.value})} placeholder="Nama Pemegang Kartu" style={inputStyle} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <input value={ccForm.expiry} onChange={e => setCcForm({...ccForm, expiry: e.target.value})} placeholder="MM/YY" maxLength={5} style={inputStyle} />
                      <input value={ccForm.cvv} onChange={e => setCcForm({...ccForm, cvv: e.target.value})} placeholder="CVV" maxLength={4} type="password" style={inputStyle} />
                    </div>
                  </div>
                </div>
              )}

              {payMethod === "transfer" && (
                <div style={{ marginTop: 20, padding: 18, background: "#fff5f7", borderRadius: 14, border: "1px solid #fce4ec" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 12 }}>Pilih Bank Tujuan</div>
                  {BANK_ACCOUNTS.map((b) => (
                    <button key={b.bank} onClick={() => setSelectedBank(b)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "12px 14px", borderRadius: 10, marginBottom: 8,
                      border: `1.5px solid ${selectedBank.bank === b.bank ? "#e91e8c" : "#f9c5d1"}`,
                      background: selectedBank.bank === b.bank ? "#fff0f5" : "#fff",
                      cursor: "pointer", transition: "all 0.2s",
                    }}>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#1a0a0a" }}>{b.bank}</div>
                        <div style={{ fontSize: 12, color: "#8a5c5c" }}>{b.name}</div>
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#e91e8c", fontWeight: 700 }}>{b.no}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 4: Confirm ── */}
          {step === "confirm" && (
            <div style={{ padding: "20px 24px" }}>
              {/* Order ID Banner */}
              {placedOrderId && (
                <div style={{ background: "linear-gradient(135deg, #e91e8c15, #f0629215)", border: "1.5px solid #e91e8c40", borderRadius: 16, padding: "16px 20px", marginBottom: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#8a5c5c", marginBottom: 4 }}>Nomor Pesanan Kamu</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 24, fontWeight: 800, color: "#e91e8c", letterSpacing: 2 }}>{placedOrderId}</div>
                  <div style={{ fontSize: 12, color: "#8a5c5c", marginTop: 6 }}>Simpan nomor ini untuk memantau status pesananmu</div>
                </div>
              )}

              {/* Customer Info Summary */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "18px", marginBottom: 16, border: "1px solid #fce4ec" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 12 }}>📋 Data Pemesan</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#5a3030" }}>
                  <div><span style={{ color: "#8a5c5c", fontWeight: 600 }}>Nama:</span> {orderForm.name}</div>
                  <div><span style={{ color: "#8a5c5c", fontWeight: 600 }}>Telepon:</span> {orderForm.phone}</div>
                  {orderForm.email && <div><span style={{ color: "#8a5c5c", fontWeight: 600 }}>Email:</span> {orderForm.email}</div>}
                  <div><span style={{ color: "#8a5c5c", fontWeight: 600 }}>Acara:</span> {orderForm.occasion}</div>
                  {orderForm.notes && <div><span style={{ color: "#8a5c5c", fontWeight: 600 }}>Catatan:</span> {orderForm.notes}</div>}
                </div>
              </div>

              {/* Order Summary */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "18px", marginBottom: 16, border: "1px solid #fce4ec" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 12 }}>Ringkasan Pesanan</div>
                {cart.map(item => (
                  <div key={item.firestoreId || item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                    <span style={{ color: "#5a3030" }}>{item.name} <span style={{ color: "#aaa" }}>×{item.qty}</span></span>
                    <span style={{ fontWeight: 600, color: "#1a0a0a" }}>Rp {(parseInt(item.price.replace(/\D/g, "")) * item.qty).toLocaleString("id-ID")}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px dashed #fce4ec", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1a0a0a" }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: "#e91e8c" }}>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Payment info */}
              <div style={{ background: "#fff0f5", borderRadius: 16, padding: "18px", border: "1px solid #fce4ec" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a0a", marginBottom: 12 }}>
                  {PAYMENT_METHODS.find(m => m.id === payMethod)?.icon} {PAYMENT_METHODS.find(m => m.id === payMethod)?.label}
                </div>
                {payMethod === "transfer" && (
                  <div>
                    <div style={{ fontSize: 13, color: "#5a3030", marginBottom: 8 }}>Transfer ke rekening:</div>
                    <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ fontSize: 13, color: "#8a5c5c", marginBottom: 4 }}>{selectedBank.bank} · {selectedBank.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 800, color: "#e91e8c", letterSpacing: 1 }}>{selectedBank.no}</span>
                        <button onClick={() => copyToClipboard(selectedBank.no)} style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: copied ? "#e91e8c" : "#fce4ec", color: copied ? "#fff" : "#c2185b", cursor: "pointer", fontWeight: 700, fontSize: 12, transition: "all 0.2s" }}>
                          {copied ? "✓ Disalin" : "Salin"}
                        </button>
                      </div>
                      <div style={{ fontSize: 12, color: "#c2185b", marginTop: 8, fontWeight: 600 }}>Nominal: Rp {total.toLocaleString("id-ID")}</div>
                    </div>
                    <p style={{ fontSize: 12, color: "#8a5c5c", marginTop: 10 }}>Kirim bukti transfer ke WhatsApp <strong>+62 821 3321 3974</strong> untuk konfirmasi pesanan.</p>
                  </div>
                )}
                {payMethod === "qris" && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ background: "#fff", borderRadius: 16, padding: "24px", display: "inline-block", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                      <div style={{ width: 140, height: 140, background: "linear-gradient(135deg, #fce4ec, #f9c5d1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, margin: "0 auto 12px" }}>📲</div>
                      <div style={{ fontSize: 12, color: "#8a5c5c" }}>Scan dengan aplikasi e-wallet</div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: "#e91e8c", marginTop: 6 }}>Rp {total.toLocaleString("id-ID")}</div>
                    </div>
                    <p style={{ fontSize: 12, color: "#8a5c5c", marginTop: 12 }}>GoPay · OVO · Dana · ShopeePay · LinkAja</p>
                  </div>
                )}
                {payMethod === "cod" && (
                  <div style={{ fontSize: 14, color: "#5a3030", lineHeight: 1.7 }}>
                    <p>✅ Pesanan akan <strong>disiapkan</strong> setelah konfirmasi.</p>
                    <p style={{ marginTop: 8 }}>💰 Siapkan uang pas <strong>Rp {total.toLocaleString("id-ID")}</strong> saat kurir tiba.</p>
                    <p style={{ marginTop: 8, fontSize: 12, color: "#8a5c5c" }}>*Layanan COD tersedia di area Semarang & sekitarnya dalam radius 15 km.</p>
                  </div>
                )}
                {payMethod === "cc" && (
                  <div style={{ fontSize: 14, color: "#5a3030", lineHeight: 1.7 }}>
                    <p>✅ Kartu: <strong>•••• •••• •••• {ccForm.number.slice(-4) || "xxxx"}</strong></p>
                    <p style={{ marginTop: 6 }}>💳 Total ditagihkan: <strong>Rp {total.toLocaleString("id-ID")}</strong></p>
                    <p style={{ marginTop: 10, fontSize: 12, color: "#8a5c5c" }}>Pembayaran diproses secara aman melalui gateway enkripsi SSL.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #fce4ec", flexShrink: 0 }}>
          {cart.length > 0 && step !== "confirm" && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "#8a5c5c" }}>{cart.reduce((s, i) => s + i.qty, 0)} item</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: "#e91e8c" }}>Rp {total.toLocaleString("id-ID")}</div>
              </div>
              {step !== "cart" && (
                <button onClick={handleBack} style={{ padding: "10px 18px", borderRadius: 12, border: "1.5px solid #f9c5d1", background: "#fff", color: "#8a5c5c", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>← Kembali</button>
              )}
            </div>
          )}

          {step === "confirm" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={handleFinish} style={{
                width: "100%", padding: "15px", borderRadius: 14, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #e91e8c, #f06292)", color: "#fff",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16,
                boxShadow: "0 4px 16px rgba(233,30,140,0.35)",
              }}>🎉 Selesai — Terima Kasih!</button>
            </div>
          ) : cart.length > 0 ? (
            <button onClick={handleProceed} disabled={step === "payment" && !payMethod} style={{
              width: "100%", padding: "15px", borderRadius: 14, border: "none",
              cursor: (step === "payment" && !payMethod) ? "not-allowed" : "pointer",
              background: (step === "payment" && !payMethod) ? "#f9c5d1" : "linear-gradient(135deg, #e91e8c, #f06292)",
              color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16,
              boxShadow: (step === "payment" && !payMethod) ? "none" : "0 4px 16px rgba(233,30,140,0.35)",
              transition: "all 0.3s ease",
            }}>
              {step === "cart" && "Isi Data Pesanan →"}
              {step === "custom-order" && "Pilih Pembayaran →"}
              {step === "payment" && "Konfirmasi Pesanan →"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
