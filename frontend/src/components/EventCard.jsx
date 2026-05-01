import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role
    : "";

  if (!event) return null;

  return (
    <>
      <style>{`
        .ec-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 24px;
          transition: 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 18px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          height: 100%;
        }

        .ec-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
          border-color: #111827;
        }

        .ec-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1.3;
        }

        .ec-meta {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ec-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #4b5563;
        }

        .ec-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-top: 6px;
        }

        .ec-actions {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ec-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .ec-btn-view {
          background: #111827;
          color: white;
        }

        .ec-btn-view:hover {
          background: #000;
        }

        .ec-btn-del {
          background: #ef4444;
          color: white;
        }

        .ec-btn-del:hover {
          background: #dc2626;
        }
      `}</style>

      <div className="ec-card">
        <h3 className="ec-title">{event.title}</h3>

        <div className="ec-meta">
          <div className="ec-item">📍 {event.location}</div>

          {event.date && (
            <div className="ec-item">📅 {event.date}</div>
          )}

          {event.price !== undefined && (
            <div className="ec-price">₹{event.price}</div>
          )}
        </div>

        <div className="ec-actions">
          <button
            className="ec-btn ec-btn-view"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            View Details
          </button>

          {role === "organizer" && onDelete && (
            <button
              className="ec-btn ec-btn-del"
              onClick={() => onDelete(event.id)}
            >
              Delete Event
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default EventCard;