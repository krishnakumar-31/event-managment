import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookEvent } from "../api/bookingApi";
import Navbar from "../components/Navbar";

function BookEvent() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({ user_id: "", name: "" });
  const [form, setForm] = useState({
    user_id: "",
    event_id: state?.id || "",
    ticket_id: Math.random().toString(36).substring(2, 8).toUpperCase(),
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const { user_id, name } = JSON.parse(stored);
      setUser({ user_id, name });
      setForm((prev) => ({ ...prev, user_id }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_id) {
      alert("Please log in before booking.");
      navigate("/");
      return;
    }

    if (!form.event_id) {
      alert("No event selected.");
      return;
    }

    try {
      const res = await bookEvent(form);

      if (res.data.message === "Booking successful") {
        alert("Booking Successful!");
        navigate("/events");
      } else {
        alert(res.data.message || "Booking Failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <>
      <style>{`
        .bk-page {
          min-height: 100vh; padding-top: 80px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-body); background: var(--color-white);
        }
        .bk-container {
          width: 100%; max-width: 600px; padding: 40px 5%;
        }
        .bk-h1 { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 4rem); text-transform: uppercase; line-height: 0.9; margin: 0 0 0.5rem; text-align: center; }
        .bk-sub { text-align: center; color: rgba(23,30,25,0.7); margin-bottom: 3rem; font-size: 1.125rem; }
        
        .bk-card {
          background: var(--color-charcoal); color: var(--color-white);
          border-radius: 1.5rem; padding: 3rem;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
          border: 1px solid var(--border-light);
        }
        
        .bk-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 0; border-bottom: 1px solid rgba(183,198,194,0.1);
        }
        .bk-row:last-of-type { border-bottom: none; margin-bottom: 2rem; }
        
        .bk-label { font-weight: 700; font-size: 0.875rem; color: var(--color-sage); }
        .bk-val { font-size: 1.125rem; font-weight: 500; }
        .bk-mono { font-family: monospace; color: var(--color-yellow); font-size: 1.25rem; font-weight: bold; letter-spacing: 2px; }

        .bk-btn {
          width: 100%; background: var(--color-yellow); color: var(--color-charcoal);
          font-family: var(--font-display); font-size: 1.5rem;
          padding: 1.25rem; border: none; border-radius: 0.5rem;
          cursor: pointer; transition: transform 0.2s, background 0.2s;
          margin-bottom: 1rem;
        }
        .bk-btn:hover { transform: translateY(-2px); background: #fff; }
        
        .bk-cancel {
          width: 100%; background: transparent; color: var(--color-sage);
          font-family: var(--font-display); font-size: 1.25rem;
          padding: 1.25rem; border: 2px solid rgba(183,198,194,0.2); border-radius: 0.5rem;
          cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .bk-cancel:hover { background: rgba(255,255,255,0.1); color: var(--color-white); }
      `}</style>

      <div className="bk-page bg-grid-pattern">
        <Navbar />

        <div className="bk-container">
          <h1 className="bk-h1">CONFIRM <span className="hl-yellow" style={{ color: 'var(--color-charcoal)' }}>BOOKING</span></h1>
          <p className="bk-sub">Review your ticket details before minting.</p>

          <div className="bk-card">
            <div className="bk-row">
              <span className="bk-label">GUEST</span>
              <span className="bk-val">{user.name || "—"}</span>
            </div>
            <div className="bk-row">
              <span className="bk-label">EVENT ID</span>
              <span className="bk-val">{form.event_id || "—"}</span>
            </div>
            <div className="bk-row">
              <span className="bk-label">TICKET KEY</span>
              <span className="bk-val bk-mono">{form.ticket_id}</span>
            </div>

            <button className="bk-btn" onClick={handleSubmit}>MINT TICKET</button>
            <button className="bk-cancel" onClick={() => navigate("/events")}>CANCEL</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookEvent;
