import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(form);
      alert(res.data.message);
      if (res.data.message.toLowerCase().includes("success")) {
        navigate("/");
      }
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .reg-wrap { display: flex; min-height: 100vh; font-family: var(--font-body); }
        .reg-left {
          flex: 1;
          background-color: var(--color-charcoal);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .reg-bg-txt {
          position: absolute;
          font-family: var(--font-display);
          font-size: 20vw;
          color: rgba(255,255,255,0.02);
          transform: rotate(-10deg);
          pointer-events: none;
          white-space: nowrap;
        }
        .reg-left-content { position: relative; z-index: 10; max-width: 400px; }
        .reg-logo { font-family: var(--font-display); font-size: 4rem; margin-bottom: 2rem; letter-spacing: normal; }
        .reg-logo span { color: var(--color-yellow); }
        .reg-h1 { font-family: var(--font-display); font-size: 5rem; line-height: 0.9; margin-bottom: 1.5rem; text-transform: uppercase; }
        .reg-p { font-size: 1.25rem; color: var(--color-sage); line-height: 1.6; }
        
        .reg-right {
          flex: 1;
          background-color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .reg-form-box {
          background: var(--color-charcoal);
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 440px;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reg-form-box:hover { transform: scale(1.02); }
        .reg-fh2 { font-family: var(--font-display); font-size: 2.5rem; color: var(--color-white); margin-bottom: 2rem; text-transform: uppercase; }
        .reg-input {
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
        .reg-input:focus { border-color: var(--color-yellow); }
        .reg-select {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(183,198,194,0.2);
          color: var(--color-white);
          padding: 1rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          outline: none;
          box-sizing: border-box;
          appearance: none;
          cursor: pointer;
        }
        .reg-select option { color: var(--color-charcoal); }
        .reg-btn {
          width: 100%;
          background: var(--color-yellow);
          color: var(--color-charcoal);
          border: none;
          padding: 1.25rem;
          font-size: 1.25rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-family: var(--font-display);
          transition: transform 0.2s, background 0.2s;
          text-transform: uppercase;
        }
        .reg-btn:hover { transform: translateY(-2px); background: var(--color-white); }
        .reg-footer { text-align: center; margin-top: 1.5rem; color: var(--color-sage); font-size: 0.875rem; }
        .reg-footer span { color: var(--color-white); font-weight: 700; cursor: pointer; }

        @media (max-width: 768px) {
          .reg-wrap { flex-direction: column; }
          .reg-left { padding: 80px 20px; }
          .reg-h1 { font-size: 3.5rem; }
        }
      `}</style>

      <div className="reg-wrap bg-grid-pattern">
        
        {/* Left Side */}
        <div className="reg-left bg-grid-pattern-dark">
          <div className="reg-bg-txt">JOIN NOW</div>
          <div className="reg-left-content">
            <div className="reg-logo">EVENTZ<span>.</span></div>
            <h1 className="reg-h1">THE FLUX WAY IS <span className="hl-yellow" style={{ color: 'var(--color-charcoal)' }}>HERE</span></h1>
            <p className="reg-p">Create an account to build, manage, or discover the world's most incredible experiences with zero friction.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="reg-right">
          <form className="reg-form-box" onSubmit={handleSubmit}>
            <h2 className="reg-fh2">GET STARTED</h2>
            
            <input
              className="reg-input"
              placeholder="Full Name"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="reg-input"
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="reg-input"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <select
              className="reg-select"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>

            <button type="submit" className="reg-btn" disabled={loading}>
              {loading ? "CREATING..." : "REGISTER"}
            </button>

            <div className="reg-footer">
              Already have an account? <span onClick={() => navigate("/")}>Sign in.</span>
            </div>
          </form>
        </div>

      </div>
    </>
  );
}

export default Register;
