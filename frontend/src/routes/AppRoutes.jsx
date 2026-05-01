import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

// Landing & Auth
import Landing from "../pages/Landing";
import Register from "../pages/Register";

// User
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import BookEvent from "../pages/BookEvent";

// Organizer
import OrganizerDashboard from "../pages/organizer/OrganizerDashboard";
import CreateEvent from "../pages/organizer/CreateEvent";
import Bookings from "../pages/organizer/Bookings";
import MyEvents from "../pages/organizer/MyEvents";


// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>

      {/* ── Landing (Login) — NO Navbar so the hero fills the screen ── */}
      <Route path="/" element={<Landing />} />

      {/* ── Auth ── */}
      <Route path="/register" element={<Register />} />

      {/* ── User ── */}
      <Route path="/events"     element={<><Navbar /><Events /></>} />
      <Route path="/events/:id" element={<><Navbar /><EventDetails /></>} />
      <Route path="/book"       element={<><Navbar /><BookEvent /></>} />

      {/* ── Organizer ── */}
      <Route path="/organizer" element={<OrganizerDashboard />} />
      <Route path="/organizer/create-event" element={<CreateEvent />} />
      <Route path="/organizer/bookings" element={<Bookings />} />
        <Route path="/organizer/my-events" element={<MyEvents />} />

      {/* ── Admin ── */}
      <Route path="/admin" element={<><Navbar /><AdminDashboard /></>} />

    </Routes>
  );
}

export default AppRoutes;
