// @utils/localStorage.js

/**
 * Key used to store complaints in localStorage
 * @type {string}
 */
const STORAGE_KEY = "complaints";

/**
 * Safely parse JSON from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Value to return if parsing fails
 * @returns {any}
 */
const safeParse = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error(`Error parsing localStorage key "${key}":`, err);
    return defaultValue;
  }
};

/* ---------- GET ---------- */
/**
 * Get all complaints from localStorage
 * @returns {Array<Object>} List of complaints
 */
export const getComplaints = () => safeParse(STORAGE_KEY);

/* ---------- ADD ---------- */
/**
 * Add a new complaint to localStorage
 * @param {Object} complaint - Complaint object
 */
export const addComplaint = (complaint) => {
  try {
    const existing = getComplaints();
    const updated = [...existing, complaint];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error adding complaint:", err);
  }
};

/* ---------- DELETE ---------- */
/**
 * Delete a complaint by username
 * @param {string} username - Username of complaint to delete
 * @returns {Array<Object>} Updated complaints list
 */
export const deleteComplaintByUsername = (username) => {
  try {
    const updated = getComplaints().filter((c) => c.username !== username);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error deleting complaint:", err);
    return getComplaints();
  }
};

/* ---------- CHECK UNIQUE USERNAME ---------- */
/**
 * Check if a username already exists in complaints
 * @param {string} username - Username to check
 * @returns {boolean} True if username exists
 */
export const isUsernameTaken = (username) => {
  try {
    return getComplaints().some((c) => c.username === username);
  } catch (err) {
    console.error("Error checking username:", err);
    return false;
  }
};

/* ---------- CLEAR ALL ---------- */
/**
 * Remove all complaints from localStorage
 */
export const clearComplaints = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Error clearing complaints:", err);
  }
};
