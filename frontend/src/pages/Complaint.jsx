import React, { useEffect } from "react";
import ComplaintForm from "../components/ComplaintForm";

const Complaint = () => {
  useEffect(() => {
    document.title = "Submit Complaint | Civic";
  }, []);

  return (
    <>
      <ComplaintForm />
    </>
  );
};

export default Complaint;
