import API from "./axios";

// Register user (unchanged)
export const registerUser = async (data) => {
  try {
    const res = await API.post("/register", data);
    return res;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

// Login user (unchanged)
export const loginUser = async (data) => {
  try {
    const res = await API.post("/login", data);
    return res;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// ✅ ADD THIS — Admin creates organizer
export const createOrganizer = async (data) => {
  try {
    const res = await API.post("/admin/create-organizer", data);
    return res;
  } catch (error) {
    console.error("Create Organizer Error:", error);
    throw error;
  }
};