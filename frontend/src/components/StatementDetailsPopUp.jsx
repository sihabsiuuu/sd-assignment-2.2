import React from "react";
import { X, ShieldCheck, Phone, MapPin, User, Copy } from "lucide-react";

const StatementDetailsPopUp = ({ data, close, handleCopy }) => {
  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500 font-['Outfit']"
      onClick={close}
    >
      <div
        className="bg-[#09090B] border border-white/10 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[80vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-6 flex justify-between items-center bg-[#111113]/50 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="text-primary" size={24} />
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase truncate">
                Case <span className="text-primary">Analysis</span>
              </h4>
              <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest truncate">
                REF: {data.username.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-3 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/50 rounded-2xl text-white/50 hover:text-primary transition-all active:scale-90 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - static */}
          <div className="flex-shrink-0 w-full lg:w-1/3 bg-[#111113] p-6 flex flex-col gap-6">
            {/* Complainant */}
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                Complainant
              </label>
              <p className="text-white font-bold text-lg break-all leading-tight">
                @{data.username}
              </p>
              <p className="text-white/40 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <User size={12} className="text-primary/60" /> {data.firstName}{" "}
                {data.lastName}
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                Contact
              </label>
              <div className="flex items-center justify-between">
                <a
                  href={`tel:${data.phone}`}
                  className="flex items-center gap-2 text-white/70 hover:text-primary truncate"
                >
                  <Phone size={14} className="text-primary/60" />{" "}
                  <span className="text-sm font-mono truncate">
                    {data.phone}
                  </span>
                </a>
                <button
                  onClick={() => handleCopy(null, data.phone)}
                  className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg text-white/30 hover:text-primary transition-all active:scale-90"
                  title="Copy Number"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>

            {/* Origin */}
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                Origin
              </label>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-primary truncate"
              >
                <MapPin size={14} className="text-primary/60" />{" "}
                <span className="text-sm truncate">{data.location}</span>
              </a>
            </div>
          </div>

          {/* Right Panel - scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] flex items-center gap-3 mb-2">
              Statement Transcript
              <div className="h-px flex-1 bg-white/5" />
            </label>
            <div className="relative pt-2">
              <span className="absolute -left-2 -top-6 text-7xl font-serif text-primary/5 select-none opacity-50">
                “
              </span>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light italic whitespace-pre-wrap break-words relative z-10 pl-2">
                {data.complaint}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#111113]/50 border-t border-white/5 flex flex-col sm:flex-row gap-6 justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#09090B] bg-gray-800 flex items-center justify-center text-[8px] font-black text-primary/50"
                >
                  V{i}
                </div>
              ))}
            </div>
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
              Validated System Log
            </span>
          </div>
          <button
            onClick={close}
            className="w-full sm:w-auto px-12 py-4 bg-primary/80 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary-dull transition-all active:scale-95 cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatementDetailsPopUp;
