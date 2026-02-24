import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  addComplaint,
  isUsernameTaken,
  getCategories,
  addCategory,
} from "../utils/localStorage";
import Container from "./Layout/Container";

const FORM_STATE_KEY = "complaint_form_state";

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);

  // Load categories dynamically
  useEffect(() => {
    setCategories(getCategories());
  }, []);

  // Ensure non-review page and scroll to top on mount
  useEffect(() => {
    setIsReviewing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .min(2)
      .max(50)
      .required("First name is required."),
    lastName: Yup.string()
      .trim()
      .min(2)
      .max(50)
      .required("Last name is required."),
    username: Yup.string()
      .trim()
      .lowercase()
      .matches(/^[a-z0-9_]+$/, "Use only letters, numbers, or underscores.")
      .required("Username is required.")
      .test(
        "unique",
        "This username is already registered.",
        (val) => !isUsernameTaken(val),
      ),
    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email is required."),
    location: Yup.string().trim().required("Location is required."),
    phone: Yup.string()
      .matches(/^[0-9+]{10,15}$/, "Enter a valid phone number (10-15 digits)")
      .required("Phone is required."),
    category: Yup.string().required("Category is required."),
    complaint: Yup.string()
      .trim()
      .min(20)
      .max(5000)
      .required("Complaint details are required."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      location: "",
      phone: "",
      category: "",
      complaint: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Validate username again
      if (isUsernameTaken(values.username)) {
        alert("This username is already registered. Please choose another.");
        return;
      }

      addComplaint(values);

      // Add category dynamically
      if (!categories.includes(values.category)) {
        addCategory(values.category);
        setCategories(getCategories());
      }

      // Clear form and localStorage
      formik.resetForm();
      setIsReviewing(false);
      localStorage.removeItem(FORM_STATE_KEY);
      window.scrollTo({ top: 0, behavior: "smooth" });

      alert("Complaint submitted successfully!");

      // Navigate back to complaint list
      navigate("/");
    },
  });

  // Restore saved form values and review state
  useEffect(() => {
    const saved = localStorage.getItem(FORM_STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.values) formik.setValues(parsed.values);
      if (parsed.isReviewing) setIsReviewing(parsed.isReviewing);
    }
  }, []);

  // Save form state
  useEffect(() => {
    localStorage.setItem(
      FORM_STATE_KEY,
      JSON.stringify({ values: formik.values, isReviewing }),
    );
  }, [formik.values, isReviewing]);

  const handleReview = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      setIsReviewing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      formik.setTouched(
        Object.keys(formik.initialValues).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {},
        ),
      );
    }
  };

  const handleClearForm = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      formik.resetForm();
      setIsReviewing(false);
      localStorage.removeItem(FORM_STATE_KEY);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Styles
  const inputStyle =
    "peer w-full bg-[#1A1A1E] border border-white/5 p-4 rounded-2xl text-white focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary/20 text-base";
  const labelStyle = `
    absolute left-4 top-4 text-sm text-gray-500 transition-all duration-300 
    pointer-events-none uppercase 
    peer-focus:-top-4 peer-focus:left-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:text-primary 
    peer-valid:-top-4 peer-valid:left-1 peer-valid:text-[10px] peer-valid:font-bold peer-valid:tracking-[0.2em] peer-valid:text-gray-500
  `;
  const errorStyle =
    "text-red-700 text-[10px] mt-1 font-bold animate-in fade-in slide-in-from-top-1 px-1";

  return (
    <Container className="py-24 md:py-24 min-h-screen">
      <div className="bg-[#111113] border border-white/5 p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col w-full transition-all duration-500 ease-in-out">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase">
              {isReviewing ? "CONFIRM SUBMISSION" : "COMPLAINT BOX"}
              <span className="text-primary animate-pulse">.</span>
            </h2>
            <p className="text-gray-500 text-[10px] mt-2 tracking-widest uppercase font-bold">
              {isReviewing
                ? "Verify details before submission."
                : "All fields are required."}
            </p>
          </div>

          {/* STEP INDICATOR */}
          <div className="flex items-center justify-end gap-3 self-end md:self-auto bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold ${!isReviewing ? "bg-primary text-black" : "bg-green-500/20 text-green-500"}`}
              >
                {isReviewing ? "✓" : "01"}
              </span>
              <span
                className={`text-[9px] font-bold tracking-[0.1em] uppercase ${!isReviewing ? "text-white" : "text-gray-500"}`}
              >
                Draft
              </span>
            </div>
            <div className="w-4 h-[1px] bg-white/10"></div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold ${isReviewing ? "bg-primary text-black" : "bg-white/10 text-gray-500"}`}
              >
                02
              </span>
              <span
                className={`text-[9px] font-bold tracking-[0.1em] uppercase ${isReviewing ? "text-white" : "text-gray-500"}`}
              >
                Review
              </span>
            </div>
          </div>
        </div>

        {!isReviewing ? (
          <form
            className="space-y-8 flex-grow animate-in fade-in duration-500"
            noValidate
          >
            {/* NAME AND USERNAME */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <input
                  id="firstName"
                  className={inputStyle}
                  {...formik.getFieldProps("firstName")}
                  required
                />
                <label htmlFor="firstName" className={labelStyle}>
                  First Name
                </label>
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className={errorStyle}>{formik.errors.firstName}</p>
                )}
              </div>
              <div className="relative">
                <input
                  id="lastName"
                  className={inputStyle}
                  {...formik.getFieldProps("lastName")}
                  required
                />
                <label htmlFor="lastName" className={labelStyle}>
                  Last Name
                </label>
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className={errorStyle}>{formik.errors.lastName}</p>
                )}
              </div>
              <div className="relative">
                <input
                  id="username"
                  className={inputStyle}
                  {...formik.getFieldProps("username")}
                  required
                />
                <label htmlFor="username" className={labelStyle}>
                  Username
                </label>
                {formik.touched.username && formik.errors.username && (
                  <p className={errorStyle}>{formik.errors.username}</p>
                )}
              </div>
            </div>

            {/* EMAIL AND PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className={inputStyle}
                  {...formik.getFieldProps("email")}
                  required
                />
                <label htmlFor="email" className={labelStyle}>
                  Email Address
                </label>
                {formik.touched.email && formik.errors.email && (
                  <p className={errorStyle}>{formik.errors.email}</p>
                )}
              </div>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  className={inputStyle}
                  {...formik.getFieldProps("phone")}
                  required
                />
                <label htmlFor="phone" className={labelStyle}>
                  Phone Number
                </label>
                {formik.touched.phone && formik.errors.phone && (
                  <p className={errorStyle}>{formik.errors.phone}</p>
                )}
              </div>
            </div>

            {/* LOCATION AND CATEGORY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  id="location"
                  className={inputStyle}
                  {...formik.getFieldProps("location")}
                  required
                />
                <label htmlFor="location" className={labelStyle}>
                  Location
                </label>
                {formik.touched.location && formik.errors.location && (
                  <p className={errorStyle}>{formik.errors.location}</p>
                )}
              </div>
              <div className="relative group">
                <input
                  id="category"
                  list="category-options"
                  className={inputStyle}
                  {...formik.getFieldProps("category")}
                  required
                />
                <label htmlFor="category" className={labelStyle}>
                  Complaint Category
                </label>
                <datalist id="category-options">
                  {categories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
                {formik.touched.category && formik.errors.category && (
                  <p className={errorStyle}>{formik.errors.category}</p>
                )}
              </div>
            </div>

            {/* COMPLAINT TEXTAREA */}
            <div className="relative">
              <textarea
                id="complaint"
                className={`${inputStyle} resize-none min-h-[180px]`}
                {...formik.getFieldProps("complaint")}
                required
              />
              <label htmlFor="complaint" className={labelStyle}>
                Statement of Detail
              </label>
              {formik.touched.complaint && formik.errors.complaint && (
                <p className={errorStyle}>{formik.errors.complaint}</p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-4 pt-4">
              <button
                type="button"
                onClick={handleReview}
                className="font-bold group relative flex items-center justify-center gap-3 bg-primary/10 border border-primary/50 px-8 py-4 rounded-2xl hover:bg-primary-dull transition-all duration-300 hover:shadow-primary/40 cursor-pointer active:scale-95"
              >
                PROCEED TO REVIEW
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="w-full text-gray-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-widest transition-colors py-2"
              >
                Clear All Fields
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ReviewSection formik={formik} setIsReviewing={setIsReviewing} />
          </div>
        )}
      </div>
    </Container>
  );
};

const ReviewSection = ({ formik, setIsReviewing }) => (
  <>
    <div className="bg-[#18181B] border border-white/5 rounded-2xl overflow-hidden shadow-inner">
      <div className="p-6 space-y-4">
        {[
          {
            l: "Full Name",
            v: `${formik.values.firstName} ${formik.values.lastName}`,
          },
          {
            l: "User ID",
            v: `@${formik.values.username}`,
            c: "text-primary font-bold",
          },
          { l: "Email", v: formik.values.email },
          { l: "Location", v: formik.values.location },
          { l: "Phone", v: formik.values.phone },
          { l: "Category", v: formik.values.category, c: "text-primary/80" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0 gap-1"
          >
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {item.l}
            </span>
            <span className={`text-sm font-medium ${item.c || "text-white"}`}>
              {item.v}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-[#09090B] p-6 border-t border-white/5">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">
          Statement of Complaint
        </span>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
          {formik.values.complaint}
        </p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        type="button"
        onClick={() => setIsReviewing(false)}
        className="flex-1 border border-white/5 py-4 rounded-2xl font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all"
      >
        BACK TO EDIT
      </button>
      <button
        type="button"
        onClick={formik.handleSubmit}
        className="flex-1 font-bold bg-primary/10 border border-primary/50 py-4 rounded-2xl hover:bg-primary/80 transition-all active:scale-95 cursor-pointer"
      >
        CONFIRM & SUBMIT
      </button>
    </div>
  </>
);

export default ComplaintForm;
