import { useState, useEffect } from "react";
import { createEvent } from "../../api/eventApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Add Navbar

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    seats: "",
    price: "",
    organizer_id: ""
  });

  const [loading, setLoading] = useState(false);

  // Auto-fill organizer_id from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const { user_id } = JSON.parse(stored);
      setForm((prev) => ({ ...prev, organizer_id: user_id }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        seats: Number(form.seats),
        price: Number(form.price),
        organizer_id: Number(form.organizer_id),
      };

      const res = await createEvent(payload);
      alert(res.data.message || "Event created successfully");

      // Reset form (keep organizer_id)
      setForm((prev) => ({
        title: "",
        description: "",
        date: "",
        location: "",
        seats: "",
        price: "",
        organizer_id: prev.organizer_id,
      }));

      navigate("/organizer");
    } catch (error) {
      console.error("ERROR:", error.response || error);
      alert(error.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    outline: "none",
    color: "#111827",
    fontFamily: "'Inter', sans-serif",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
    display: "block",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
          fontFamily: "'Inter', sans-serif",
          paddingTop: "64px",
        }}
      >
        {/* Page header banner */}
        {/* <div
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
            padding: "28px 40px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "800",
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            ✨ Create New Event
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: "6px 0 0", fontSize: "14px" }}>
            Fill in the details below to publish your event
          </p>
        </div> */}

        {/* Form container */}
        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "36px 32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              border: "1px solid #E5E7EB",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {/* Title */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Event Title *</label>
                <input
                  style={inputStyle}
                  name="title"
                  value={form.title}
                  placeholder="e.g. Summer Music Festival"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Description</label>
                <input
                  style={inputStyle}
                  name="description"
                  value={form.description}
                  placeholder="Brief description of your event"
                  onChange={handleChange}
                />
              </div>

              {/* Date */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Date *</label>
                <input
                  style={inputStyle}
                  name="date"
                  value={form.date}
                  type="date"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Location *</label>
                <input
                  style={inputStyle}
                  name="location"
                  value={form.location}
                  placeholder="e.g. Central Park, New York"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Seats + Price row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div style={fieldStyle}>
                  <label style={labelStyle}>Seats</label>
                  <input
                    style={inputStyle}
                    name="seats"
                    value={form.seats}
                    placeholder="e.g. 200"
                    onChange={handleChange}
                    type="number"
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Price ($)</label>
                  <input
                    style={inputStyle}
                    name="price"
                    value={form.price}
                    placeholder="e.g. 49.99"
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>

              {/* Hidden organizer_id */}
              <input
                name="organizer_id"
                value={form.organizer_id}
                type="hidden"
                readOnly
              />

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "6px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "#818CF8" : "#4F46E5",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "13px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
                  }}
                >
                  {loading ? "Creating..." : "✅ Create Event"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/organizer")}
                  style={{
                    backgroundColor: "transparent",
                    color: "#6B7280",
                    border: "1px solid #D1D5DB",
                    borderRadius: "10px",
                    padding: "13px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
