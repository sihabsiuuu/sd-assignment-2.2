import React from "react";
import { Route, Routes } from "react-router-dom";
import Complaint from "./pages/Complaint";
import ComplaintList from "./pages/ComplaintList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Terms from "./components/Extra/Terms";
import Privacy from "./components/Extra/Privacy";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Complaint />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/view-complaints" element={<ComplaintList />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
