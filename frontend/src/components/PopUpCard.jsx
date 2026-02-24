import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Phone,
  MapPin,
  User,
  Copy,
  Mail,
  ChevronDown,
} from "lucide-react";

const PopUpCard = ({ data, close, handleCopy }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500 font-['Outfit']"
      onClick={close}
    >
      <div
        className="bg-[#09090B] border border-white/10 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[92vh] sm:max-h-[80vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 sm:py-6 flex justify-between items-center bg-[#111113]/50 border-b border-white/5">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="text-primary animate-pulse" size={22} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white/70 tracking-tighter uppercase truncate">
                {data.category || "Case"}
              </h4>
              <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest truncate">
                REF: {data.username.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-2.5 sm:p-3 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/50 rounded-2xl text-white/50 hover:text-primary transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Panel */}
          <div className="w-full lg:w-1/3 border-b lg:border-b-0 border-white/5 bg-[#111113] p-4 sm:p-6 flex flex-col gap-6">
            {/* Complainant Section - Aligned on the same level */}
            <div className="flex justify-between items-center lg:block">
              <div className="space-y-1 min-w-0">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-dull">
                  Complainant
                </label>
                <p className="text-white/80 font-bold text-base sm:text-lg break-all leading-tight">
                  @{data.username}
                </p>
                <p className="text-white/40 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <User size={12} className="text-primary/60" />
                  {data.firstName} {data.lastName}
                </p>
              </div>

             
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary shrink-0 self-center"
              >
                See Details
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Dropdown content */}
            <div
              className={`space-y-6 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 max-h-96 block" : "hidden lg:block"}`}
            >
              {/* Email */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-dull">
                  Email Address
                </label>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${data.email}`}
                    className="group relative flex items-center gap-2 text-white/70 hover:text-primary transition-colors duration-300 truncate min-w-0 pb-0.5"
                  >
                    <Mail size={14} className="text-primary/60" />
                    <span className="text-sm truncate">{data.email}</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                  <button
                    onClick={() => handleCopy(null, data.email)}
                    className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg text-white/30 hover:text-primary transition-all"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-dull">
                  Contact
                </label>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`tel:${data.phone}`}
                    className="group relative flex items-center gap-2 text-white/70 hover:text-primary transition-colors duration-300 truncate min-w-0 pb-0.5"
                  >
                    <Phone size={14} className="text-primary/60" />
                    <span className="text-sm font-mono truncate">
                      {data.phone}
                    </span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                  <button
                    onClick={() => handleCopy(null, data.phone)}
                    className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg text-white/30 hover:text-primary transition-all"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* Origin */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-dull">
                  Origin
                </label>
                <div className="flex">
                  <a
                    href={`http://googleusercontent.com/maps.google.com/6{encodeURIComponent(data.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-2 text-white/70 hover:text-primary transition-colors duration-300 truncate pb-0.5"
                  >
                    <MapPin size={14} className="text-primary/60" />
                    <span className="text-sm truncate">{data.location}</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scroll">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] flex items-center gap-3 mb-2">
              Statement Transcript
              <div className="h-px flex-1 bg-white/5" />
            </label>
            <div className="relative pt-2">
              <span className="absolute -left-2 -top-6 text-7xl font-serif text-primary/5 select-none opacity-50">
                “
              </span>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-light italic whitespace-pre-wrap break-words relative z-10 pl-2">
                {data.complaint}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#111113]/50 border-t border-white/5 flex flex-col sm:flex-row gap-6 justify-end items-center">
          <button
            onClick={close}
            className="w-full sm:w-auto px-6 sm:px-12 py-4 bg-primary/80 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary-dull transition-all active:scale-95 cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpCard;
