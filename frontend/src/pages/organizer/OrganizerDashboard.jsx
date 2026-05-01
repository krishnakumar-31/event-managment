import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function OrganizerDashboard() {
  const navigate = useNavigate();

  const stored = localStorage.getItem("user");
  const organizer = stored ? JSON.parse(stored) : null;

  return (
    <>
      <style>{`
        .od-page { min-height: 100vh; padding-top: 80px; font-family: var(--font-body); background: var(--color-white); }
        
        .od-header {
          padding: 80px 5% 60px;
          border-bottom: 1px solid var(--border-light);
          background: var(--color-charcoal); color: var(--color-white);
        }
        .od-h1 { font-family: var(--font-display); font-size: clamp(3rem, 5vw, 6rem); line-height: 0.9; margin: 0 0 1rem; text-transform: uppercase; }
        .od-h1 span { color: var(--color-yellow); }
        .od-sub { font-size: 1.25rem; color: var(--color-sage); max-width: 600px; line-height: 1.6; margin: 0; }

        .od-bento-wrap { padding: 80px 5%; max-width: 1400px; margin: 0 auto; }
        .od-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        
        .od-card {
          border: 1px solid var(--border-light); border-radius: 1.5rem;
          padding: 3rem; background: #f8f9fa;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer; display: flex; flex-direction: column;
        }
        .od-card:hover { transform: translateY(-4px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); border-color: var(--color-charcoal); }
        .od-card-dark { background: var(--color-charcoal); color: var(--color-white); }
        .od-card-dark:hover { border-color: var(--color-yellow); }
        
        .od-icon { font-size: 3rem; margin-bottom: 1.5rem; }
        .od-ch { font-family: var(--font-display); font-size: 2.5rem; margin: 0 0 0.5rem; line-height: 1.1; }
        .od-cp { font-size: 1.125rem; color: rgba(23,30,25,0.7); margin: 0; }
        .od-card-dark .od-cp { color: var(--color-sage); }
        
        .od-arrow { margin-top: auto; padding-top: 2rem; font-family: var(--font-display); font-size: 1.5rem; color: var(--color-yellow); }
      `}</style>

      <div className="od-page bg-grid-pattern">
        <Navbar />

        <div className="od-header bg-grid-pattern-dark">
          <h1 className="od-h1">it's me <span>{organizer.name}</span></h1>
          {organizer?.name ? (
            <p className="od-sub">Welcome back, {organizer.name}. Everything you need to manage your experiences is here.</p>
          ) : (
            <p className="od-sub">Manage your events and track performance.</p>
          )}
        </div>

        <div className="od-bento-wrap">
          <div className="od-grid">
            
            <div className="od-card od-card-dark" onClick={() => navigate("/organizer/create-event")}>
              <div className="od-icon">⚡</div>
              <h3 className="od-ch">CREATE EVENT</h3>
              <p className="od-cp">Launch a new experience in seconds.</p>
              <div className="od-arrow">LAUNCH →</div>
            </div>

            <div className="od-card" onClick={() => navigate("/organizer/bookings")}>
              <div className="od-icon">🎟️</div>
              <h3 className="od-ch">BOOKINGS</h3>
              <p className="od-cp">Track ticket sales and attendee lists.</p>
              <div className="od-arrow" style={{ color: "var(--color-charcoal)" }}>VIEW →</div>
            </div>

            <div className="od-card" onClick={() => navigate("/organizer/my-events")}>
              <div className="od-icon">📋</div>
              <h3 className="od-ch">MY EVENTS</h3>
              <p className="od-cp">Manage or delete your active listings.</p>
              <div className="od-arrow" style={{ color: "var(--color-charcoal)" }}>MANAGE →</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizerDashboard;