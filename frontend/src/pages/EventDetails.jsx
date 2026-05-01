import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvents } from "../api/eventApi";
import Navbar from "../components/Navbar";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEvents().then(res => {
      const found = res.data.find(e => e.id == id);
      setEvent(found);
    });
  }, [id]);

  if (!event) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "3rem", background: "var(--color-charcoal)", color: "var(--color-white)" }}>
      LOADING...
    </div>
  );

  return (
    <>
      <style>{`
        .ed-page { min-height: 100vh; font-family: var(--font-body); padding-top: 80px; }
        
        .ed-hero { display: flex; flex-wrap: wrap; min-height: 70vh; border-bottom: 1px solid var(--border-light); }
        .ed-hero-left {
          flex: 1; min-width: 300px;
          padding: 80px 5%;
          display: flex; flex-direction: column; justify-content: center;
          background: var(--color-white);
        }
        .ed-back {
          font-family: var(--font-display); font-size: 1rem;
          background: none; border: none; cursor: pointer;
          color: var(--color-charcoal); text-align: left; padding: 0;
          margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;
          transition: transform 0.2s;
        }
        .ed-back:hover { transform: translateX(-4px); }
        .ed-h1 { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6rem); line-height: 0.9; margin: 0 0 1.5rem; text-transform: uppercase; }
        .ed-desc { font-size: 1.25rem; color: rgba(23,30,25,0.7); max-width: 500px; line-height: 1.6; margin-bottom: 3rem; }
        
        .ed-hero-right {
          flex: 1; min-width: 300px;
          background: var(--color-charcoal);
          position: relative; overflow: hidden;
          display: flex; alignItems: center; justify-content: center;
        }
        .ed-hero-right::after {
          content: ""; position: absolute; inset: 0;
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        .ed-huge-txt {
          font-family: var(--font-display); font-size: 25vw;
          color: rgba(255,255,255,0.03); line-height: 0.8;
          transform: rotate(-10deg); white-space: nowrap;
        }

        .ed-bento { padding: 100px 5%; background: var(--color-white); }
        .ed-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem; max-width: 1200px; margin: 0 auto;
        }
        .ed-card {
          border: 1px solid var(--border-light); border-radius: 1rem;
          padding: 2rem; background: #f8f9fa;
        }
        .ed-card-dark { background: var(--color-charcoal); color: var(--color-white); border: none; }
        .ed-label { font-weight: 700; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(23,30,25,0.5); margin-bottom: 0.5rem; }
        .ed-card-dark .ed-label { color: var(--color-sage); }
        .ed-val { font-family: var(--font-display); font-size: 2.5rem; margin: 0; }
        .ed-val-accent { color: var(--color-yellow); }

        .ed-cta-btn {
          background: var(--color-yellow); color: var(--color-charcoal);
          font-family: var(--font-display); font-size: 1.5rem;
          padding: 1.25rem 3rem; border: none; border-radius: 0.5rem;
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          display: inline-block;
        }
        .ed-cta-btn:hover { transform: translateY(-4px); box-shadow: 0 15px 30px -10px rgba(0,0,0,0.2); }
      `}</style>

      <div className="ed-page">
        <Navbar />

        <div className="ed-hero">
          <div className="ed-hero-left">
            <button className="ed-back" onClick={() => navigate("/events")}>← BACK TO EVENTS</button>
            <h1 className="ed-h1">{event.title}</h1>
            <p className="ed-desc">{event.description}</p>
            <div>
              <button className="ed-cta-btn" onClick={() => navigate("/book", { state: event })}>BOOK HERE</button>
            </div>
          </div>
          <div className="ed-hero-right">
            <div className="ed-huge-txt">{(event.title || "FLUX").substring(0,3)}</div>
          </div>
        </div>

        <div className="ed-bento bg-grid-pattern">
          <div className="ed-grid">
            <div className="ed-card">
              <div className="ed-label">DATE</div>
              <p className="ed-val">{event.date}</p>
            </div>
            <div className="ed-card">
              <div className="ed-label">LOCATION</div>
              <p className="ed-val">{event.location}</p>
            </div>
            <div className="ed-card ed-card-dark">
              <div className="ed-label">PRICE</div>
              <p className="ed-val ed-val-accent">${event.price}</p>
            </div>
            {event.seats && (
              <div className="ed-card">
                <div className="ed-label">CAPACITY</div>
                <p className="ed-val">{event.seats}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;