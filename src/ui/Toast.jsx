import { useEffect } from "react";

function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [msg, onDone]); // <-- Perbaikan di sini: menambahkan onDone ke dalam array

  return msg ? (
    <div style={{
      position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
      background: "linear-gradient(135deg, #e91e8c, #f06292)", color: "#fff",
      padding: "14px 28px", borderRadius: 14, fontWeight: 600, fontSize: 15,
      boxShadow: "0 8px 32px rgba(233,30,140,0.4)", zIndex: 3000,
      animation: "bounce-in 0.4s ease", whiteSpace: "nowrap",
    }}>{msg}</div>
  ) : null;
}

export default Toast;