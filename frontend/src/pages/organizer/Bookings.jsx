import { useEffect, useState } from "react";
import { getBookings } from "../../api/bookingApi";
import Navbar from "../../components/Navbar";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Read organizer_id from localStorage
        const stored = localStorage.getItem("user");
        console.log("📦 Stored user data:", stored);

        if (!stored) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(stored);
        console.log("👤 Parsed user data:", userData);

        const { user_id, role } = userData;

        if (role !== "organizer") {
          setError("Access denied. Organizer only.");
          setLoading(false);
          return;
        }

        console.log("🔍 Fetching bookings for organizer ID:", user_id);
        setDebugInfo(`Fetching bookings for organizer ID: ${user_id}`);

        // Pass organizer_id so backend filters correctly
        const res = await getBookings(user_id);
        console.log("✅ Bookings API Response:", res);
        console.log("📊 Bookings data:", res.data);

        setDebugInfo(`API Response received: ${JSON.stringify(res.data).substring(0, 100)}...`);

        // Handle both array and wrapped response shapes
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.bookings ?? res.data ?? [];

        console.log("📋 Final bookings array:", data);
        setDebugInfo(`Found ${data.length} bookings`);
        setBookings(data);
        setError(null);
      } catch (err) {
        console.error("❌ Bookings fetch error:", err);
        console.error("Error message:", err.message);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);

        setDebugInfo(`Error: ${err.message} | Status: ${err.response?.status}`);
        setError(
          `Failed to load bookings: ${err.response?.data?.message || err.message || "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pageShell = (children) => (
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
            🎫 Bookings
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: "6px 0 0", fontSize: "14px" }}>
            All bookings made for your events
          </p>
        </div> */}

        {/* Main content area */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "36px 24px",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );

  if (loading) {
    return pageShell(
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#6B7280",
          fontSize: "16px",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return pageShell(
    <>
      {/* {debugInfo && (
        <div style={{
          backgroundColor: "#F3F4F6",
          padding: "10px 14px",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#6B7280",
          marginBottom: "20px",
          fontFamily: "monospace",
          border: "1px solid #E5E7EB",
        }}>
          🔧 Debug: {debugInfo}
        </div>
      )} */}

      {error && (
        <div
          style={{
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "10px",
            padding: "16px 20px",
            color: "#DC2626",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "20px",
          }}
        >
          ❌ {error}
        </div>
      )}

      {!error && bookings.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#6B7280",
            fontSize: "16px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ fontStyle: "italic" }}>No bookings yet.</p>
        </div>
      ) : (
        !error && bookings.map((b) => (
          <div
            key={b.id ?? b.booking_id}
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "24px 28px",
              marginBottom: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              border: "1px solid #E5E7EB",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 24px",
            }}
          >
            {/* User */}
            <div>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                👤 User
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "15px", fontWeight: "600", color: "#111827" }}>
                {b.user_name || b.userName || "N/A"}
              </p>
            </div>

            {/* Event */}
            <div>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                🎪 Event
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "15px", fontWeight: "600", color: "#111827" }}>
                {b.event_name || b.eventName || "N/A"}
              </p>
            </div>

            {/* Ticket */}
            <div>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                🎟️ Ticket
              </p>
              <p style={{
                margin: "4px 0 0",
                fontSize: "14px",
                fontWeight: "600",
                color: "#4F46E5",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}>
                {b.ticket_id ?? b.ticket_type ?? b.ticketId ?? "—"}
              </p>
            </div>

            {/* Status */}
            <div>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                ✅ Status
              </p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  backgroundColor: "#D1FAE5",
                  color: "#065F46",
                  fontSize: "12px",
                  fontWeight: "700",
                  borderRadius: "20px",
                  padding: "3px 10px",
                }}
              >
                {b.status ?? "Confirmed"}
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Bookings;
