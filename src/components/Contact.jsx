import { useState } from "react";
import { useInView } from "../hooks/useInView";

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", occasion: "Birthday", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 12,
    border: "1.5px solid #f9c5d1", background: "#fff",
    fontSize: 15, color: "#1a0a0a", transition: "all 0.3s ease",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "120px 5%", background: "linear-gradient(180deg, #fffaf9, #fff0f3)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
        {/* Info */}
        <div className={`fade-up ${inView ? "visible" : ""}`}>
          <span className="section-tag">Contact Us</span>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 20 }}>Let's Create Something <em style={{ fontStyle: "italic", color: "#e91e8c" }}>Beautiful</em></h2>
          <p className="section-sub" style={{ marginBottom: 40 }}>Punya konsep atau tema tertentu untuk acara spesialmu? Ceritakan kepada kami, dan biarkan Babe Cakes menghadirkan kue yang sesuai dengan impianmu. Hubungi kami dan mari diskusikan bersama!</p>
          {[
            { icon: "📍", label: "Kunjungi Kami", val: "Jl. Candi Golf No. 88, Semarang, Indonesia" },
            { icon: "📞", label: "Hubungi Kami", val: "+62 821 3321 3974" },
            { icon: "✉️", label: "Email Kami", val: "hello@bebecakes.id" },
            { icon: "🕐", label: "Jam Operasional", val: "Senin–Sabtu: 08:00–20:00 | Minggu: 09:00–17:00" },
          ].map((info, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff0f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{info.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: "#e91e8c", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{info.label}</div>
                <div style={{ fontSize: 15, color: "#3a1a1a" }}>{info.val}</div>
              </div>
            </div>
          ))}
          {/* Social */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {["Instagram", "TikTok", "WhatsApp", "Facebook"].map((s) => (
              <div key={s} style={{ background: "linear-gradient(135deg, #f9c5d1, #f48fb1)", borderRadius: 12, padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#c2185b", transition: "all 0.3s ease" }}>{s}</div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className={`fade-up d2 ${inView ? "visible" : ""}`} style={{
          background: "#fff", borderRadius: 28, padding: 48,
          boxShadow: "0 16px 60px rgba(244,143,177,0.18)",
          border: "1px solid rgba(249,197,209,0.4)",
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 72, marginBottom: 20, animation: "bounce-in 0.5s ease" }}>🎉</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#1a0a0a", marginBottom: 12 }}>Order Sent!</h3>
              <p style={{ color: "#8a5c5c", marginBottom: 28 }}>Terima kasih, {form.name}! Kami akan menghubungi Anda kembali dalam waktu 2 jam. Can't wait to bake for you!</p>
              <button className="btn-primary" onClick={() => setSent(false)} style={{ padding: "14px 32px", borderRadius: 12, fontSize: 15 }}>Kirim Lainnya →</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#1a0a0a", marginBottom: 28 }}>Custom Order Request</h3>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <input name="name" value={form.name} onChange={handle} placeholder="Nama Anda*" style={inputStyle} required />
                  <input name="phone" value={form.phone} onChange={handle} placeholder="No.Telephone*" style={inputStyle} />
                </div>
                <input name="email" value={form.email} onChange={handle} placeholder="Alamat Email *" type="email" style={inputStyle} required />
                <input name="address" value={form.address} onChange={handle} placeholder="Alamat Lengkap (opsional)" style={inputStyle} />
                <select name="occasion" value={form.occasion} onChange={handle} style={inputStyle}>
                  {["Birthday", "Wedding", "Anniversary", "Corporate Event", "Baby Shower", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
                <textarea name="message" value={form.message} onChange={handle} placeholder="ceritakan tentang kue impianmu, design, rasa,  ukuran, dan tanggal yang kamu butuhkan *" rows={5} style={{ ...inputStyle, resize: "vertical" }} required />
                <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "16px", borderRadius: 14, fontSize: 16, marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {loading ? (
                    <><span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin-slow 0.7s linear infinite" }} /> Sending...</>
                  ) : "Kirim Custom Order Request 🎂"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
