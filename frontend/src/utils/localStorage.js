/**
 * @file utils/localStorage.js
 * Persistence for complaints, categories, and locations.
 */

const STORAGE_KEY = "complaints";
const CATEGORY_KEY = "complaint_categories";
const LOCATION_KEY = "complaint_locations";

const DEFAULT_CATEGORIES = [
  "Roads & Traffic",
  "Electricity & Power",
  "Water Supply & Sanitation",
  "Garbage & Waste Management",
  "Healthcare Services",
  "Education & Schools",
  "Public Safety & Security",
  "Corruption & Governance",
  "Environmental Issues",
  "Transport & Public Transit",
  "Telecommunications & Internet",
  "Housing & Urban Development",
  "Discrimination & Human Rights",
  "Social Welfare & Assistance",
  "Other",
];

/**
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
const safeParse = (key, defaultValue = []) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    console.error(`Failed to parse localStorage key "${key}":`, err);
    return defaultValue;
  }
};

/** @returns {Array} */
export const getComplaints = () => safeParse(STORAGE_KEY, []);

/** @param {Object} complaint */
export const addComplaint = (complaint) => {
  if (!complaint || typeof complaint !== "object") return;

  try {
    if (isUsernameTaken(complaint.username)) {
      throw new Error("Username already exists.");
    }

    const existing = getComplaints();
    const updated = [...existing, complaint];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    addCategory(complaint.category);
    addLocation(complaint.location);
  } catch (err) {
    console.error("Failed to add complaint:", err);
  }
};

/**
 * @param {string} username
 * @returns {Array}
 */
export const deleteComplaintByUsername = (username) => {
  if (!username) return getComplaints();

  try {
    const updated = getComplaints().filter((c) => c.username !== username);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to delete complaint:", err);
    return getComplaints();
  }
};

/** @returns {Array} */
export const getCategories = () => {
  const stored = safeParse(CATEGORY_KEY, null);
  return stored && stored.length ? stored : DEFAULT_CATEGORIES;
};

/** @param {string} newCategory */
export const addCategory = (newCategory) => {
  if (!newCategory || typeof newCategory !== "string") return;

  try {
    const current = getCategories();
    const normalized = newCategory.trim();
    if (
      !current.some((cat) => cat.toLowerCase() === normalized.toLowerCase())
    ) {
      const updated = [...current, normalized];
      localStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error("Failed to add category:", err);
  }
};

/** @returns {Array} */
export const getLocations = () => safeParse(LOCATION_KEY, []);

/** @param {string} newLocation */
export const addLocation = (newLocation) => {
  if (!newLocation || typeof newLocation !== "string") return;

  try {
    const current = getLocations();
    const normalized = newLocation.trim();
    if (
      !current.some((loc) => loc.toLowerCase() === normalized.toLowerCase())
    ) {
      const updated = [...current, normalized];
      localStorage.setItem(LOCATION_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error("Failed to add location:", err);
  }
};

/**
 * @param {string} username
 * @returns {boolean}
 */
export const isUsernameTaken = (username) => {
  if (!username) return false;
  return getComplaints().some(
    (c) => c.username.toLowerCase() === username.toLowerCase(),
  );
};

/**
 * @param {string} email
 * @returns {boolean}
 */
export const isEmailTaken = (email) => {
  if (!email) return false;
  return getComplaints().some(
    (c) => c.email.toLowerCase() === email.toLowerCase(),
  );
};

export const clearComplaints = () => localStorage.removeItem(STORAGE_KEY);

export const resetCategories = () =>
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(DEFAULT_CATEGORIES));

export const resetLocations = () => localStorage.removeItem(LOCATION_KEY);
