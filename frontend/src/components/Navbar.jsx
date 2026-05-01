import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <style>{`
        .inav-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 80px;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          z-index: 1000;
          border-bottom: 1px solid var(--border-light);
          transition: box-shadow 0.3s ease;
          font-family: var(--font-body);
        }
        .inav-header.scrolled {
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
        }
        .inav-logo { font-family: var(--font-display); font-size: 1.875rem; cursor: pointer; }
        .inav-logo span { color: var(--color-yellow); }
        
        .inav-links { display: flex; gap: 2rem; font-weight: 600; font-size: 0.875rem; align-items: center; }
        .inav-link { color: var(--color-charcoal); cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
        .inav-link:hover { opacity: 0.6; }
        
        .inav-right { display: flex; align-items: center; gap: 1.5rem; }
        .inav-user { font-weight: 700; font-size: 0.875rem; color: var(--color-charcoal); }
        .inav-pill {
          background-color: var(--color-charcoal);
          color: var(--color-white);
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
          font-family: var(--font-display);
          letter-spacing: 0.05em;
        }
        .inav-pill:hover { transform: scale(1.05); }

        @media (max-width: 768px) {
          .inav-links { display: none; }
        }
      `}</style>
      
      <header className={`inav-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="inav-logo" onClick={() => navigate(user ? (user.role === 'admin' ? '/admin' : user.role === 'organizer' ? '/organizer' : '/events') : '/')}>
          EVENTZ<span>.</span>
        </div>

        {user && (
          <div className="inav-links">
            <span className="inav-link" onClick={() => navigate("/events")}>EVENTS</span>
            {user.role === 'organizer' && (
              <>
                <span className="inav-link" onClick={() => navigate("/organizer")}>DASHBOARD</span>
                <span className="inav-link" onClick={() => navigate("/organizer/create-event")}>CREATE</span>
              </>
            )}
            {user.role === 'admin' && (
              <span className="inav-link" onClick={() => navigate("/admin")}>ADMIN</span>
            )}
          </div>
        )}

        <div className="inav-right">
          {user ? (
            <>
              <span className="inav-user">👋 {user.name}</span>
              <button className="inav-pill" onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <button className="inav-pill" onClick={() => navigate("/")}>LOGIN</button>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;