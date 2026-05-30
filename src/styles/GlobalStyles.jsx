const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: #fffaf9; color: #2c1a1a; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #fff0f3; }
    ::-webkit-scrollbar-thumb { background: #f48fb1; border-radius: 3px; }
    ::selection { background: #f9c5d1; color: #2c1a1a; }

    .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    .fade-up.d1 { transition-delay: 0.1s; }
    .fade-up.d2 { transition-delay: 0.2s; }
    .fade-up.d3 { transition-delay: 0.3s; }
    .fade-up.d4 { transition-delay: 0.4s; }

    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.5);opacity:0} }
    @keyframes shimmer { 0%{background-position:-200%} 100%{background-position:200%} }
    @keyframes slide-in { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes bounce-in { 0%{transform:scale(.5);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
    @keyframes hero-drift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes count-up { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }

    .hero-bg { background-size: 400% 400%; animation: hero-drift 12s ease infinite; }
    .float-anim { animation: float 4s ease-in-out infinite; }
    .float-anim-2 { animation: float 5.5s ease-in-out infinite; }
    .float-anim-3 { animation: float 3.5s ease-in-out infinite 0.5s; }

    .card-hover { transition: transform 0.3s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(244,143,177,0.25) !important; }
    .btn-primary { background: linear-gradient(135deg, #e91e8c 0%, #f06292 100%); color: #fff; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; letter-spacing: 0.5px; transition: all 0.3s ease; }
    .btn-primary:hover { background: linear-gradient(135deg, #c2185b 0%, #e91e8c 100%); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(233,30,140,0.35); }
    .btn-outline { background: transparent; border: 2px solid #e91e8c; color: #e91e8c; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: all 0.3s ease; }
    .btn-outline:hover { background: #e91e8c; color: #fff; transform: translateY(-2px); }

    .section-tag { display: inline-block; background: linear-gradient(135deg, #fce4ec, #f8bbd0); color: #c2185b; font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 6px 18px; border-radius: 20px; margin-bottom: 12px; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); color: #1a0a0a; line-height: 1.2; }
    .section-sub { font-size: 16px; color: #8a5c5c; line-height: 1.7; max-width: 560px; }

    .product-card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(244,143,177,0.12); }
    .product-card .img-area { height: 200px; display: flex; align-items: center; justify-content: center; font-size: 72px; position: relative; }
    .product-card:hover .quick-add { opacity: 1 !important; transform: translateY(0) !important; }

    .testimonial-card { background: #fff; border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(244,143,177,0.1); position: relative; }
    .testimonial-card::before { content: '"'; font-family: 'Playfair Display', serif; font-size: 80px; color: #f9c5d1; position: absolute; top: 8px; left: 24px; line-height: 1; }

    .team-card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(244,143,177,0.1); text-align: center; }

    input, textarea, select { font-family: 'DM Sans', sans-serif; outline: none; }
    input:focus, textarea:focus { border-color: #e91e8c !important; box-shadow: 0 0 0 3px rgba(233,30,140,0.12) !important; }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .stack-mobile { flex-direction: column !important; }
      .full-mobile { width: 100% !important; }
    }
  `}</style>
);

export default GlobalStyles;
