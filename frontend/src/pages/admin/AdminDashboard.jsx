import { useState } from "react";
import API from "../../api/axios";
import { getAllBookings } from "../../api/bookingApi";
import { createOrganizer } from "../../api/authApi";
import Navbar from "../../components/Navbar";


function AdminDashboard() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  const [orgForm, setOrgForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchData = async (section) => {
  try {
    // ✅ If same section clicked → reset
    if (type === section) {
      setType("");
      setData([]);
      return;
    }

    setType(section);

    let res;

    if (section === "organizer") {
      res = await API.get("/organizer");
    } else if (section === "bookings") {
      res = await getAllBookings();
    } else if (section === "events") {
      res = await API.get("/events");
    }

    setData(res.data);

  } catch (err) {
    console.error(err);
  }
};

  const handleCreateOrganizer = async (e) => {
    e.preventDefault();

    try {
      const res = await createOrganizer(orgForm);

      alert(`Organizer Created\nEmail: ${res.data.email}`);

      setOrgForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create organizer");
    }
  };

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

        .admin-action-grid { padding: 80px 5%; max-width: 1600px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; transition: all .4s cubic-bezier(.4,0,.2,1); }
        
        .od-card {
          border: 1px solid var(--border-light); border-radius: 1.5rem;
          padding: 3rem; background: #f8f9fa;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;
          cursor: pointer; display: flex; flex-direction: column;
          user-select: none;
        }
        .od-card:hover { transform: translateY(-4px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); border-color: var(--color-charcoal); }
        .od-card-dark { background: var(--color-charcoal); color: var(--color-white); }
        .od-card-dark:hover { border-color: var(--color-yellow); }
        
        .od-icon { font-size: 3rem; margin-bottom: 1.5rem; transition: all 0.3s ease; }
        .od-ch { font-family: var(--font-display); font-size: 2.5rem; margin: 0 0 0.5rem; line-height: 1.1; transition: all 0.3s ease; word-wrap: break-word; }
        .od-cp { font-size: 1.125rem; color: rgba(23,30,25,0.7); margin: 0; transition: all 0.3s ease; }
        .od-card-dark .od-cp { color: var(--color-sage); }
        
        .od-arrow { margin-top: auto; padding-top: 2rem; font-family: var(--font-display); font-size: 1.5rem; color: var(--color-charcoal); transition: all 0.3s ease; }
        .od-card-dark .od-arrow { color: var(--color-yellow); }
        
        .card-content-wrapper { transition: all 0.3s ease; }
        
        /* COMPACT MODE FOR NAVIGATION */
        .admin-action-grid.compact {
          padding-top: 40px;
          padding-bottom: 20px;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .admin-action-grid.compact { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .admin-action-grid.compact { grid-template-columns: 1fr; }
        }
        .admin-action-grid.compact .od-card {
          padding: 1.5rem 2rem;
          flex-direction: row;
          align-items: center;
          border-radius: 1rem;
        }
        .admin-action-grid.compact .od-icon { font-size: 2rem; margin: 0 1rem 0 0; }
        .admin-action-grid.compact .od-ch { font-size: 1.5rem; margin: 0; }
        .admin-action-grid.compact .od-ch br { display: none; }
        .admin-action-grid.compact .od-cp, .admin-action-grid.compact .od-arrow { display: none; }
        .admin-action-grid.compact .card-content-wrapper { display: flex; align-items: center; }
        
        /* Active State */
        .od-card.active { background: var(--color-yellow); color: var(--color-charcoal); border-color: var(--color-yellow); }
        .od-card.active .od-arrow { color: var(--color-charcoal); }
        .od-card-dark.active { background: var(--color-yellow); color: var(--color-charcoal); border-color: var(--color-yellow); }
        .od-card-dark.active .od-arrow { color: var(--color-charcoal); }
        .od-card-dark.active .od-cp { color: rgba(23,30,25,0.7); }

        /* DATA GRID */
        .data-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 0 5% 80px;
          max-width: 1600px;
          margin: 0 auto;
        }
        .data-card {
          border: 1px solid var(--border-light);
          border-radius: 1.5rem;
          padding: 2rem;
          background: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .data-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: var(--color-charcoal);
        }
        .data-icon { font-size: 2.5rem; margin-bottom: 0.5rem; display: block; }
        .data-title { font-family: var(--font-display); font-size: 1.75rem; line-height: 1.1; margin: 0; color: var(--color-charcoal); word-wrap: break-word; text-transform: uppercase; }
        .data-desc { font-size: 1rem; color: rgba(23,30,25,0.7); margin: 0; line-height: 1.5; }
        .data-cta {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--color-charcoal);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .data-cta span { color: var(--color-sage); font-family: var(--font-body); font-size: 1rem; }

        /* FORM */
        .admin-form-card {
          border: 1px solid var(--border-light);
          border-radius: 1.5rem;
          padding: 3rem;
          background: #ffffff;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }
        .admin-input {
          padding: 1.25rem 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--border-light);
          font-size: 1.125rem;
          color: var(--color-charcoal);
          outline: none;
          font-family: var(--font-body);
          width: 100%;
          box-sizing: border-box;
          transition: all 0.2s ease;
          background: #f8f9fa;
        }
        .admin-input:focus { border-color: var(--color-charcoal); background: #ffffff; box-shadow: 0 0 0 3px rgba(23,30,25,0.1); }
        .admin-submit-btn {
          background: var(--color-yellow);
          color: var(--color-charcoal);
          border: 1px solid var(--color-yellow);
          border-radius: 1rem;
          padding: 1.25rem;
          font-size: 1.25rem;
          font-family: var(--font-display);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 1rem;
          width: 100%;
          text-transform: uppercase;
        }
        .admin-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          background: var(--color-charcoal);
          color: var(--color-white);
          border-color: var(--color-charcoal);
        }
      `}</style>

      <div className="od-page bg-grid-pattern">
        <Navbar />

        {/* Hero banner */}
        <div className="od-header bg-grid-pattern-dark">
          <h1 className="od-h1">ADMIN <span>WORKSPACE</span></h1>
          <p className="od-sub">Manage organizers, bookings, and events.</p>
        </div>

        {/* ACTION CARDS */}
        <div className={`admin-action-grid ${type !== "" ? "compact" : ""}`}>
          <div className={`od-card ${type === "organizer" ? "active" : ""}`} onClick={() => fetchData("organizer")}>
            <div className="card-content-wrapper">
              <div className="od-icon">👥</div>
              <div>
                <h3 className="od-ch">ORGANIZERS</h3>
                <p className="od-cp">Manage all organizers</p>
              </div>
            </div>
            <div className="od-arrow">OPEN →</div>
          </div>
          
          <div className={`od-card ${type === "bookings" ? "active" : ""}`} onClick={() => fetchData("bookings")}>
            <div className="card-content-wrapper">
              <div className="od-icon">🎟️</div>
              <div>
                <h3 className="od-ch">BOOKINGS</h3>
                <p className="od-cp">Track all ticket sales</p>
              </div>
            </div>
            <div className="od-arrow">VIEW →</div>
          </div>

          <div className={`od-card ${type === "events" ? "active" : ""}`} onClick={() => fetchData("events")}>
            <div className="card-content-wrapper">
              <div className="od-icon">📋</div>
              <div>
                <h3 className="od-ch">EVENTS</h3>
                <p className="od-cp">Manage active listings</p>
              </div>
            </div>
            <div className="od-arrow">MANAGE →</div>
          </div>

          <div className={`od-card od-card-dark ${type === "create" ? "active" : ""}`} onClick={() => setType("create")}>
            <div className="card-content-wrapper">
              <div className="od-icon">⚡</div>
              <div>
                <h3 className="od-ch">CREATE<br/>ORGANIZER</h3>
                <p className="od-cp">Add a new organizer account</p>
              </div>
            </div>
            <div className="od-arrow">LAUNCH →</div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="data-grid">

          {/* CREATE ORGANIZER SECTION */}
          {type === "create" && (
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="admin-form-card">
                <div className="data-icon">⚡</div>
                <h3 className="data-title" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  CREATE ORGANIZER
                </h3>
                <p className="data-desc" style={{ marginBottom: "2rem" }}>
                  Add a new event organizer to the platform.
                </p>

                <form
                  onSubmit={handleCreateOrganizer}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <input
                    placeholder="Name"
                    value={orgForm.name}
                    onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    className="admin-input"
                  />

                  <input
                    placeholder="Email"
                    value={orgForm.email}
                    onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                    className="admin-input"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={orgForm.password}
                    onChange={(e) => setOrgForm({ ...orgForm, password: e.target.value })}
                    className="admin-input"
                  />

                  <button type="submit" className="admin-submit-btn">
                    Create Account →
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* DATA DISPLAY */}
          {type !== "" && type !== "create" && (
            <>
              {data.length === 0 ? (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "100px 20px",
                    color: "rgba(23,30,25,0.4)",
                  }}
                >
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📭</div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", textTransform: "uppercase" }}>No data found.</p>
                </div>
              ) : (
                data.map((item) => (
                  <div key={item.id} className="data-card">
                    <div>
                      {type === "organizer" && (
                        <>
                          <span className="data-icon">👥</span>
                          <h3 className="data-title">{item.name}</h3>
                          <p className="data-desc">{item.email}</p>
                        </>
                      )}

                      {type === "bookings" && (
                        <>
                          <span className="data-icon">🎟️</span>
                          <h3 className="data-title">{item.user_name}</h3>
                          <p className="data-desc">Event: {item.event_name}</p>
                        </>
                      )}

                      {type === "events" && (
                        <>
                          <span className="data-icon">📋</span>
                          <h3 className="data-title">{item.title}</h3>
                          <p className="data-desc">{item.location}</p>
                        </>
                      )}
                    </div>
                    
                    <div className="data-cta">
                      {type === "organizer" && (
                        <>
                          <span>Role:</span> {item.role}
                        </>
                      )}
                      {type === "bookings" && (
                        <>
                          <span>Ticket ID:</span> {item.ticket_id}
                        </>
                      )}
                      {type === "events" && (
                        <>
                          <span>Date:</span> {item.date}
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;