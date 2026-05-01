import API from "./axios";
 
// ── GET BOOKINGS (organizer sees their event bookings) ──
// ✅ FIX: Backend expects /bookings/<organizer_id> NOT /bookings?organizer_id=X
export const getBookings = (organizer_id) => {
  console.log("📤 Fetching bookings for organizer ID:", organizer_id);
  return API.get(`/bookings/${organizer_id}`);
};

// Admin → all bookings
export const getAllBookings = () => {
  return API.get("/bookings");
};
 
// ── BOOK AN EVENT (user books a ticket) ──
export const bookEvent = (data) => {
  return API.post("/book", data);
};
 