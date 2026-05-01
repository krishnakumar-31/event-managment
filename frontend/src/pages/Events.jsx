import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../api/eventApi";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(res => setEvents(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      const userStr = localStorage.getItem("user");
      const organizer_id = userStr ? JSON.parse(userStr).user_id : 1; 

      if (!window.confirm("Are you sure to delete?")) return;

      const res = await deleteEvent(id, organizer_id);
      alert(res.data.message);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <style>{`
        .evs-page { min-height: 100vh; padding-top: 80px; font-family: var(--font-body); }
        
        .evs-header {
          padding: 80px 5% 60px;
          border-bottom: 1px solid var(--border-light);
          background: var(--color-white);
        }
        .evs-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-weight: 700; font-size: 0.75rem; letter-spacing: 0.1em;
          border: 1px solid var(--border-light); padding: 0.5rem 1rem;
          border-radius: 9999px; margin-bottom: 1.5rem;
        }
        .evs-badge-dot { width: 8px; height: 8px; background: var(--color-yellow); border-radius: 50%; }
        .evs-h1 { font-family: var(--font-display); font-size: clamp(4rem, 6vw, 6rem); text-transform: uppercase; line-height: 0.9; margin: 0; }
        
        .evs-grid-wrap { padding: 80px 5%; max-width: 1400px; margin: 0 auto; }
        .evs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .evs-empty {
          grid-column: 1 / -1;
          padding: 100px 20px;
          text-align: center;
          border: 1px dashed var(--border-light);
          border-radius: 1rem;
          background: #f8f9fa;
        }
        .evs-empty h2 { font-family: var(--font-display); font-size: 3rem; color: rgba(23,30,25,0.2); }
      `}</style>

      <div className="evs-page bg-grid-pattern">
        <Navbar />

        <div className="evs-header">
          <div className="evs-badge">
            <div className="evs-badge-dot"></div>
            DISCOVERY
          </div>
          <h1 className="evs-h1">
            UPCOMING <span className="hl-yellow">EVENTS</span>
          </h1>
        </div>

        <div className="evs-grid-wrap">
          <div className="evs-grid">
            {events.length === 0 ? (
              <div className="evs-empty">
                <h2>NO EVENTS YET</h2>
              </div>
            ) : (
              events.map(e => (
                <EventCard key={e.id} event={e} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;