import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Copy,
  Trash2,
  Eye,
  User,
  ArrowRight,
  Mail,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

const ListCard = ({
  c,
  handleDeleteRequest,
  handleCopy,
  setSelectedComplaint,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group bg-[#111113] border border-white/5 rounded-2xl hover:border-primary/30 transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
      <div className="p-4 md:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center">
        {/* SECTION 1: Identity & Category (Always Visible) */}
        <div className="lg:col-span-3 flex justify-between items-start lg:block min-w-0">
          <div className="space-y-2 min-w-0">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-2 lg:mb-3">
              <ShieldAlert size={14} className="text-primary/50" />
              <span className="text-[10px] md:text-[12px] font-black text-primary/80 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                {c.category}
              </span>
            </div>

            <h3 className="text-white/80 font-black text-lg md:text-xl tracking-tighter uppercase leading-none break-all group-hover:text-white transition-colors">
              @{c.username}
            </h3>

            <div className="flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/5 rounded-2xl w-fit group-hover:bg-primary/5 transition-colors">
              <User size={12} className="text-primary/70 shrink-0" />
              <p className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-tight truncate max-w-[150px] md:max-w-none">
                {c.firstName} {c.lastName}
              </p>
            </div>
          </div>

          <div className="flex gap-2 lg:hidden">
            <button
              onClick={() => handleDeleteRequest(c.username)}
              className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-red-500/50 hover:text-red-500 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex lg:hidden justify-end -mt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-end gap-1 text-[10px] font-black uppercase tracking-widest text-primary"
          >
            {isOpen ? "Hide Details" : "See Details"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* SECTION 2: Collapsible Contact Details (Dropdown on Mobile) */}
        <div
          className={`lg:col-span-4 space-y-2 border-l-0 lg:border-l border-white/5 lg:pl-8 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "opacity-100 max-h-96" : "max-h-0 opacity-0 lg:max-h-96 lg:opacity-100 lg:block"}`}
        >
          {/* Location */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(c.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group/map"
          >
            <div className="p-2 bg-white/5 rounded-2xl border border-white/5 group-hover/map:border-primary/40 shrink-0 flex items-center justify-center transition-all">
              <MapPin size={16} className="text-primary/60" />
            </div>
            <span className="text-xs md:text-sm font-semibold truncate tracking-tight uppercase">
              {c.location}
            </span>
          </a>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${c.phone}`}
              className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group/phone min-w-0 flex-1"
            >
              <div className="p-2 bg-white/5 rounded-2xl border border-white/5 group-hover/phone:border-primary/40 shrink-0 flex items-center justify-center transition-all">
                <Phone size={16} className="text-primary/60" />
              </div>
              <span className="text-[11px] md:text-xs font-mono tracking-widest truncate">
                {c.phone}
              </span>
            </a>
            <button
              onClick={(e) => handleCopy(e, c.phone)}
              className="p-2.5 hover:bg-white/5 rounded-2xl text-gray-600 hover:text-primary transition-all active:scale-90"
            >
              <Copy size={14} />
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${c.email}`}
              className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group/mail min-w-0 flex-1"
            >
              <div className="p-2 bg-white/5 rounded-2xl border border-white/5 group-hover/mail:border-primary/40 shrink-0 flex items-center justify-center transition-all">
                <Mail size={16} className="text-primary/60" />
              </div>
              <span className="text-[11px] md:text-xs font-medium truncate tracking-tight">
                {c.email}
              </span>
            </a>
            <button
              onClick={(e) => handleCopy(e, c.email)}
              className="p-2.5 hover:bg-white/5 rounded-2xl text-gray-600 hover:text-primary transition-all active:scale-90"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>

        {/* SECTION 3: Complaint & Portal (Always Visible) */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-10 min-w-0">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/5 to-transparent rounded-full hidden lg:block" />
              <p className="text-gray-400 group-hover:text-gray-200 text-xs md:text-sm leading-relaxed font-light italic line-clamp-2 pl-2 transition-colors">
                "{c.complaint}"
              </p>
            </div>
            <button
              onClick={() => setSelectedComplaint(c)}
              className="group/btn relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-1 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.04] cursor-pointer active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between px-3 md:px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-primary/10 border border-primary/20 group-hover/btn:bg-primary group-hover/btn:border-primary transition-all duration-500">
                    <Eye
                      size={16}
                      className="text-primary group-hover/btn:text-white"
                    />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-none mb-1">
                      Analysis Portal
                    </span>
                    <span className="text-white/40 text-[7px] md:text-[8px] font-bold uppercase tracking-widest group-hover/btn:text-primary/60 transition-colors">
                      View Decrypted Log
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-white/20 group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Trash Action (Hidden on mobile) */}
        <div className="hidden lg:col-span-1 lg:flex justify-end">
          <button
            onClick={() => handleDeleteRequest(c.username)}
            className="p-3 bg-white/5 border border-white/5 rounded-2xl text-white/20 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
