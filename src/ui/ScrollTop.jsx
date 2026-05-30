import { useState, useEffect } from "react";

function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!show) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
      position: "fixed", bottom: 32, right: 32, zIndex: 1500,
      width: 50, height: 50, borderRadius: "50%",
      background: "linear-gradient(135deg, #e91e8c, #f06292)",
      border: "none", cursor: "pointer", fontSize: 20, color: "#fff",
      boxShadow: "0 8px 24px rgba(233,30,140,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.3s ease",
      animation: "bounce-in 0.3s ease",
    }}>↑</button>
  );
}

export default ScrollTop;
