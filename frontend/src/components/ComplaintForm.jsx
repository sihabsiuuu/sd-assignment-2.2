import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [isReviewing, setIsReviewing] = useState(false);

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', username: '', location: '', phone: '', complaint: '' },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      location: Yup.string().required('Location is required'),
      phone: Yup.string().matches(/^[0-9]+$/, "Digits only").min(10, "Must be at least 10").required('Required'),
      complaint: Yup.string().min(15, 'Min 15 chars').required('Required'),
      username: Yup.string().required('Required').test('unique', 'Taken', (val) => {
        const existing = JSON.parse(localStorage.getItem('complaints') || '[]');
        return !existing.some(item => item.username === val);
      }),
    }),
    onSubmit: (values) => {
      const existing = JSON.parse(localStorage.getItem('complaints') || '[]');
      localStorage.setItem('complaints', JSON.stringify([...existing, values]));
      navigate('/view-complaints'); 
    },
  });

  const handleReview = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) setIsReviewing(true);
    else formik.setTouched({ firstName: true, lastName: true, username: true, location: true, phone: true, complaint: true });
  };

  const inputStyle = "w-full bg-[#18181B] border border-white/5 p-3 rounded-2xl text-white focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary/20 text-base";
  const labelStyle = "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1";
  const errorStyle = "text-primary text-[10px] mt-1 font-bold animate-in fade-in slide-in-from-top-1";

  return (
    <div className="max-w-7xl mx-auto py-24 md:py-24 px-4 md:px-8 font-sans min-h-screen">
      <div className="bg-[#111113] border border-white/5 p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase">{isReviewing ? 'REVIEW' : 'COMPLAINT'}<span className="text-primary">.</span></h2>
        </div>
        {!isReviewing ? (
          <form className="space-y-5 md:space-y-6 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelStyle}>First Name</label><input className={inputStyle} {...formik.getFieldProps('firstName')} />{formik.touched.firstName && formik.errors.firstName && <p className={errorStyle}>{formik.errors.firstName}</p>}</div>
              <div><label className={labelStyle}>Last Name</label><input className={inputStyle} {...formik.getFieldProps('lastName')} />{formik.touched.lastName && formik.errors.lastName && <p className={errorStyle}>{formik.errors.lastName}</p>}</div>
            </div>
            <div><label className={labelStyle}>Username</label><input className={inputStyle} {...formik.getFieldProps('username')} />{formik.touched.username && formik.errors.username && <p className={errorStyle}>{formik.errors.username}</p>}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelStyle}>Location</label><input className={inputStyle} {...formik.getFieldProps('location')} />{formik.touched.location && formik.errors.location && <p className={errorStyle}>{formik.errors.location}</p>}</div>
              <div><label className={labelStyle}>Phone</label><input type="tel" className={inputStyle} {...formik.getFieldProps('phone')} />{formik.touched.phone && formik.errors.phone && <p className={errorStyle}>{formik.errors.phone}</p>}</div>
            </div>
            <div><label className={labelStyle}>Message</label><textarea className={`${inputStyle} resize-none min-h-[240px] text-xl`} {...formik.getFieldProps('complaint')} />{formik.touched.complaint && formik.errors.complaint && <p className={errorStyle}>{formik.errors.complaint}</p>}</div>
            <div className="flex flex-col gap-4 pt-4">
              <button type="button" onClick={handleReview} className=" font-bold group relative flex items-center justify-center gap-3 bg-primary/10 border border-primary/50 px-8 py-4 rounded-2xl hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(248,69,101,0.15)] hover:shadow-primary/40 cursor-pointer active:scale-95">REVIEW ENTRY</button>
              <button type="button" onClick={() => formik.resetForm()} className="w-full text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors py-2">Clear all fields</button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-[#18181B] border border-white/5 rounded-2xl overflow-hidden min-w-0">
              <div className="p-5 md:p-6 space-y-4 min-w-0">
                {[{ l: 'Name', v: `${formik.values.firstName} ${formik.values.lastName}` }, { l: 'ID', v: `@${formik.values.username}`, c: 'text-primary' }, { l: 'Region', v: formik.values.location }, { l: 'Contact', v: formik.values.phone }].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-white/5 pb-3 last:border-0 last:pb-0 min-w-0 gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest shrink-0">{item.l}</span>
                    <span className={`text-sm font-medium break-words w-full sm:text-right ${item.c || 'text-white'}`}>{item.v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#09090B] p-5 md:p-6 border-t border-white/5 min-w-0">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">Statement</span>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">{formik.values.complaint}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsReviewing(false)} className="flex-1 border border-white/5 py-4 rounded-2xl font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all">EDIT</button>
              <button onClick={formik.handleSubmit} className="group relative flex-1 font-bold items-center justify-center gap-3 bg-primary/10 border border-primary/50 px-8 py-4 rounded-2xl hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(248,69,101,0.15)] hover:shadow-primary/40 cursor-pointer active:scale-95">CONFIRM & SUBMIT</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;