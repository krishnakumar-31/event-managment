import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(form);

      if (res.data.message.toLowerCase().includes("success")) {
        const { user_id, name, role } = res.data;

        localStorage.setItem(
          "user",
          JSON.stringify({ user_id, name, role })
        );

        if (role === "admin") navigate("/admin");
        else if (role === "organizer") navigate("/organizer");
        else navigate("/events");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const scrollToLogin = (e) => {
    e.preventDefault();
    document.getElementById("login-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        /* Scoped Brutalist CSS */
        .brutalist-wrap {
          font-family: var(--font-body);
          color: var(--color-charcoal);
          background-color: var(--color-white);
          overflow-x: hidden;
        }

        .anton-font { font-family: var(--font-display); text-transform: uppercase; letter-spacing: normal; line-height: 0.9; }

        /* 15-degree highlight spec */
        .hl-yellow {
          position: relative;
          display: inline-block;
          z-index: 1;
          white-space: nowrap;
        }
        .hl-yellow::before {
          content: "";
          position: absolute;
          inset: -4px -8px;
          background-color: var(--color-yellow);
          z-index: -1;
          transform: rotate(-5deg); /* Slightly reduced angle for text legibility, but conveys the brutalist rotated spec */
        }

        /* Navigation */
        .nav-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 80px; /* h-20 */
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          z-index: 50;
          border-bottom: 1px solid var(--border-light);
        }
        .nav-logo { font-size: 1.875rem; /* 3xl */ }
        .nav-logo span { color: var(--color-yellow); }
        .nav-links { display: flex; gap: 2rem; font-weight: 500; font-size: 0.875rem; }
        .nav-links a { color: var(--color-charcoal); transition: opacity 0.2s; }
        .nav-links a:hover { opacity: 0.6; }
        .nav-right { display: flex; align-items: center; gap: 1.5rem; }
        .nav-login-txt { font-weight: 700; font-size: 0.875rem; cursor: pointer; }
        .nav-pill {
          background-color: var(--color-charcoal);
          color: var(--color-white);
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .nav-pill:hover { transform: scale(1.05); }

        /* Hero */
        .hero {
  padding: 100px 5% 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid var(--border-light);

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  justify-content: center;
  position: relative;
}
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-light);
          border-radius: 9999px;
          margin-bottom: 2rem;
          background: var(--color-white);
        }
       .hero-h1 {
  font-size: clamp(3.5rem, 8.5vw, 7rem);
  margin-top: -30px;
  margin-bottom: 1.5rem;
  line-height: 0.95;
  font-weight: 600;
  font-style:italic
}

.hero-h1 .line {
  display: block;
  opacity: 0;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;


}

/* TECH from right */
.hero-h1 .line:nth-child(1) {
  animation-name: slideFromRight;
  animation-delay: 0.2s;
}

/* MANAGEMENT from left */
.hero-h1 .line:nth-child(2) {
  animation-name: slideFromLeft;
  animation-delay: 0.6s;
}

/* EVENTS from right */
.hero-h1 .line:nth-child(3) {
  animation-name: slideFromRight;
  animation-delay: 1s;
}

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(150px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-150px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

        .hero-sub { font-size: 1.125rem; color: rgba(23,30,25,0.7); max-width: 600px; margin: 0 auto 3rem; line-height: 1.6; }
        
        .hero-form {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          width: 100%;
          max-width: 500px;
        }
        .hero-input {
          flex: 1;
          border: 1px solid rgba(23,30,25,0.2);
          padding: 0 1.5rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          outline: none;
        }
        .hero-input:focus { border-color: var(--color-charcoal); }
        .hero-btn {
          background-color: var(--color-yellow);
          color: var(--color-charcoal);
          font-size: 1.25rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .hero-btn:hover { transform: translateY(-2px); }

        

        /* How It Works */
        .hiw-section { padding: 120px 5%; background-color: var(--color-white); border-top: 1px solid var(--border-light); display: flex; flex-wrap: wrap; gap: 4rem; max-width: 1400px; margin: 0 auto; }
        .hiw-left { flex: 1; min-width: 300px; position: sticky; top: 120px; align-self: flex-start; }
        .hiw-h2 { font-size: clamp(4rem, 8vw, 6rem); line-height: 0.9; }
        .hiw-right { flex: 2; min-width: 300px; display: flex; flex-direction: column; gap: 4rem; }
        .hiw-step { display: flex; gap: 2rem; align-items: flex-start; transition: var(--transition-bento); }
        .hiw-num { font-family: var(--font-display); font-size: 8rem; color: rgba(255, 225, 124, 0.2); line-height: 0.8; transition: color 0.3s; }
        .hiw-step:hover .hiw-num { color: rgba(255, 225, 124, 1); }
        .hiw-content h4 { font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 1rem; }
        .hiw-content p { font-size: 1.125rem; color: rgba(23,30,25,0.7); max-width: 400px; }

        /* Testimonials */
        .test-section { padding: 100px 5%; background-color: #f8f9fa; border-top: 1px solid var(--border-light); }
        .test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1400px; margin: 0 auto; }
        .test-card { border-radius: 1rem; padding: 2.5rem; transition: var(--transition-bento); display: flex; flex-direction: column; justify-content: space-between; }
        .test-card.light { background: var(--color-white); border: 1px solid var(--border-light); }
        .test-card.dark { background: var(--color-charcoal); color: var(--color-white); transform: translateY(16px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .test-stars { display: flex; gap: 0.25rem; color: var(--color-yellow); font-size: 1.5rem; margin-bottom: 1.5rem; }
        .test-text { font-size: 1.125rem; font-weight: 500; line-height: 1.6; margin-bottom: 2rem; }
        .test-footer { display: flex; align-items: center; gap: 1rem; }
        .test-avatar { width: 48px; height: 48px; border-radius: 50%; background: #ccc; filter: grayscale(100%); object-fit: cover; }
        .test-name { font-family: var(--font-display); font-size: 1.25rem; letter-spacing: 0.05em; }

        /* Final CTA (Login Form) */
        .cta-section { 
          padding: 120px 5%; 
          background-color: var(--color-yellow); 
          position: relative; 
          overflow: hidden; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }
        .cta-bg-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-size: 25vw;
          color: var(--color-charcoal);
          opacity: 0.04;
          white-space: nowrap;
          pointer-events: none;
        }
       .cta-content {
  position: relative;
  z-index: 10;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.cta-h2 {
  font-size: clamp(4rem, 8vw, 6rem);
  margin-bottom: 1rem;
  color: var(--color-charcoal);
  line-height: 0.9;      /* tighter spacing */
  letter-spacing: 2px;   /* cleaner look */
}

.cta-sub {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: rgba(23,30,25,0.8);
  font-weight: 500;
  margin-top: 1.5rem;    /* space below heading */
}
        
        .login-box {
          background: var(--color-charcoal);
          padding: 3rem 2.5rem;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
        }
        .login-box:hover { transform: scale(1.02); }
        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(183,198,194,0.2);
          color: var(--color-white);
          padding: 1rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          margin-bottom: 1rem;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .login-input:focus { border-color: var(--color-yellow); }
        .login-btn {
          width: 100%;
          background: var(--color-yellow);
          color: var(--color-charcoal);
          border: none;
          padding: 1.25rem;
          font-size: 1.25rem;
          border-radius: 0.5rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: transform 0.2s, background 0.2s;
        }
        .login-btn:hover { transform: translateY(-2px); background: #fff; }
        .login-footer {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--color-sage);
          font-size: 0.875rem;
        }
        .login-footer span { color: var(--color-white); font-weight: 700; cursor: pointer; }

        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .span-2 { grid-column: span 1; }
          .hiw-left { position: static; margin-bottom: 2rem; }
        }
        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr; }
          .split-half { padding: 60px 5%; }
          .nav-links { display: none; }
          .test-card.dark { transform: none; }
        }
      `}</style>

      <div className="brutalist-wrap">

        {/* Navigation */}
        <header className="nav-header">
          <div className="nav-logo anton-font">EVENTZ<span>.</span></div>
          <div className="nav-links">
            <a href="#how-it-works">HOW IT WORKS</a>
            <a href="#testimonials">REVIEWS</a>
          </div>
          <div className="nav-right">
            <span className="nav-login-txt" onClick={scrollToLogin}>Login</span>
            <button className="nav-pill anton-font" onClick={() => navigate("/register")}>GET STARTED</button>
          </div>
        </header>

        {/* Hero Section */}
        
        <section className="hero bg-grid-pattern">

          <div className="hero-badge">
          </div>
         <h1 class="hero-h1">
  <span class="line right">TECH</span>
  <span class="line left">MANAGEMENT</span>
  <span class="line right">EVENTZ</span>
</h1>
          <p className="hero-sub">
“Transforming event organization through smart technology and seamless coordination.”          </p>
         
        </section>

        {/* Problem / Solution Split */}
        

        {/* How It Works */}
        <section id="how-it-works" className="hiw-section">
          <div className="hiw-left">
            <h2 className="hiw-h2 anton-font">HOW<br />IT<br />WORKS</h2>
          </div>
          <div className="hiw-right">
            <div className="hiw-step">
              <div className="hiw-num">1</div>
              <div className="hiw-content" style={{ paddingTop: '2rem' }}>
                <h4>CREATE EVENT</h4>
                <p>Set up your event with schedules, ticket options, venue details, and branding in minutes.</p>
              </div>
            </div>
            <div className="hiw-step">
              <div className="hiw-num">2</div>
              <div className="hiw-content" style={{ paddingTop: '2rem' }}>
                <h4>MANAGE BOOKINGS</h4>
                <p>Monitor registrations, process payments, and keep attendees updated in real time.</p>
              </div>
            </div>
            <div className="hiw-step">
              <div className="hiw-num">3</div>
              <div className="hiw-content" style={{ paddingTop: '2rem' }}>
                <h4>HOST SUCCESSFULLY</h4>
                <p>GDeliver smooth experiences with digital tickets, QR check-ins, and performance analytics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Cards */}
        <section id="testimonials" className="test-section bg-grid-pattern">
          <div className="test-grid">

            <div className="test-card light">
              <div className="test-stars">★★★★★</div>
              <p className="test-text">“A seamless platform for organizing events. Booking, attendee management, and event tracking are incredibly smooth and efficient."</p>
              <div className="test-footer">
                <img src="https://i.pravatar.cc/100?img=1" className="test-avatar" alt="Avatar" />
                <span className="test-name">SARAH JENKINS</span>
              </div>
            </div>

            <div className="test-card dark">
              <div className="test-stars">★★★★★</div>
              <p className="test-text">“The interface is clean, easy to use, and made event registration effortless. Digital ticketing and instant confirmations are excellent features.”</p>
              <div className="test-footer">
                <img src="https://i.pravatar.cc/100?img=11" className="test-avatar" alt="Avatar" />
                <span className="test-name">MARCUS R.</span>
              </div>
            </div>

            <div className="test-card light">
              <div className="test-stars">★★★★★</div>
              <p className="test-text">“Managing large-scale events has become much easier. Real-time analytics and attendee monitoring save both time and effort.”
             </p>
              <div className="test-footer">
                <img src="https://i.pravatar.cc/100?img=5" className="test-avatar" alt="Avatar" />
                <span className="test-name">ELENA WOODS</span>
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA (Actual Login Form) */}
        <section id="login-section" className="cta-section">
          <div className="cta-bg-text">GET INSIDE</div>
          <div className="cta-content">
           <h2 className="cta-h2 anton-font">
           WELCOME <br />
            TO <br />
           TECH
           </h2>
            <p className="cta-sub">Sign in to your dashboard and take control.</p>

            <div className="login-box">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="login-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="login-input"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit" className="login-btn anton-font" disabled={loading}>
                  {loading ? "AUTHENTICATING..." : "SIGN IN"}
                </button>
              </form>
              <div className="login-footer">
                Don't have an account? <span onClick={() => navigate("/register")}>Create one now.</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}