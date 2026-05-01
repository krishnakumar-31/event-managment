import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const stored = localStorage.getItem("user");
  const organizer = stored ? JSON.parse(stored) : null;

  useEffect(() => {
    fetch(`http://localhost:5000/events/organizer/${organizer.user_id}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/events/${eventId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizer_id: organizer.user_id })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Deleted successfully");
      setEvents(events.filter(e => e.id !== eventId));
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <style>
        {`
        body {
          margin: 0;
        }

        .events-container {
          min-height: 100vh;
          padding: 40px;
          background: #f4f6f9;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .events-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 30px;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .event-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #eaecef;
        }

        .event-title {
          font-size: 18px;
          font-weight: 600;
          color: #34495e;
          margin-bottom: 15px;
        }

        .delete-btn {
          padding: 8px 14px;
          font-size: 14px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background-color: #dc3545;
          color: white;
          font-weight: 500;
        }

        .delete-btn:hover {
          background-color: #b02a37;
        }

        .empty-text {
          color: #7f8c8d;
          font-size: 16px;
        }
        `}
      </style>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
          fontFamily: "'Inter', sans-serif",
          paddingTop: "64px",
        }}
      >
        <Navbar />

        {/* Page header */}
        {/* <div
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
            padding: "28px 40px",
          }}
        >
          <h2
            className="events-title"
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "800",
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            📋 My Events
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: "6px 0 0", fontSize: "14px" }}>
            Manage and delete your published events
          </p>
        </div> */}

        {/* Content */}
        <div
          className="events-container"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "36px 24px",
            background: "transparent",
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#6B7280",
                fontSize: "16px",
              }}
            >
              ⏳ Loading your events...
            </div>
          ) : events.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#6B7280",
                fontSize: "16px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <p className="empty-text">No events found. Create your first event!</p>
            </div>
          ) : (
            <div
              className="events-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: "20px",
              }}
            >
              {events.map(event => (
                <div
                  key={event.id}
                  className="event-card"
                  style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    className="event-title"
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      color: "#111827",
                      lineHeight: "1.3",
                    }}
                  >
                    {event.title}
                  </div>

                  {event.location && (
                    <p style={{ margin: 0, fontSize: "13px", color: "#6B7280" }}>
                      📍 {event.location}
                    </p>
                  )}

                  {event.date && (
                    <p style={{ margin: 0, fontSize: "13px", color: "#6B7280" }}>
                      📅 {event.date}
                    </p>
                  )}

                  {event.price !== undefined && (
                    <p style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#4F46E5" }}>
                      ${event.price}
                    </p>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event.id)}
                    style={{
                      marginTop: "8px",
                      backgroundColor: "#EF4444",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyEvents;