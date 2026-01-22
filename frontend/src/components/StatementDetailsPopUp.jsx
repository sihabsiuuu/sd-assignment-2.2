import React from 'react';
import { X, ShieldCheck, Phone, MapPin, User, Copy } from 'lucide-react';

const StatementDetailsPopUp = ({ data, close, handleCopy }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500 font-['Outfit']" onClick={close}>
      <div className="bg-[#09090B] border border-white/10 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="px-6 py-8 md:px-10 flex justify-between items-start gap-4 bg-[#111113]/50">
          <div className="flex gap-4 md:gap-6 items-center min-w-0">
            <div className="h-12 w-12 md:h-16 md:w-16 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"><ShieldCheck className="text-primary" size={24} /></div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1"><span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20 shrink-0">Confidential</span><span className="text-white/30 text-[9px] font-bold uppercase tracking-widest truncate">REF: {data.username.toUpperCase()}</span></div>
              <h4 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase truncate">Case <span className="text-primary">Analysis</span></h4>
            </div>
          </div>
          <button onClick={close} className="group p-3 shrink-0 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/50 rounded-2xl text-white/50 hover:text-primary transition-all active:scale-90 cursor-pointer"><X size={20} /></button>
        </div>
        <div className="p-6 md:p-10 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-5 overflow-hidden shadow-inner">
                <div className="min-w-0">
                  <label className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block mb-2 opacity-80">Complainant</label>
                  <p className="text-white font-bold text-lg break-all leading-tight">@{data.username}</p>
                  <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1 font-medium flex items-center gap-1.5"><User size={12} className="text-primary/60 shrink-0" />{data.firstName} {data.lastName}</p>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <label className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block mb-2 opacity-80">Contact Links</label>
                  <div className="flex items-center justify-between group gap-2">
                    <a href={`tel:${data.phone}`} className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors truncate"><Phone size={14} className="text-primary/60 shrink-0" /><span className="text-sm font-mono tracking-tight truncate">{data.phone}</span></a>
                    <button onClick={(e) => handleCopy(e, data.phone)} className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg text-white/30 hover:text-primary transition-all active:scale-90" title="Copy Number"><Copy size={14} /></button>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block mb-2 opacity-80">Origin</label>
                  <a href={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(data.location)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors group"><MapPin size={14} className="text-primary/60 shrink-0" /><span className="text-sm truncate underline decoration-white/10 underline-offset-8 group-hover:decoration-primary/40 transition-all">{data.location}</span></a>
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]"><p className="text-[9px] text-white/30 uppercase leading-relaxed tracking-[0.1em] font-medium">This report is encrypted and generated automatically from local data storage.</p></div>
            </div>
            <div className="lg:col-span-8 relative min-w-0 pb-4">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden lg:block" />
              <div className="space-y-6"><label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] flex items-center gap-3">Statement Transcript <div className="h-px flex-1 bg-white/5" /></label><div className="relative pt-2"><span className="absolute -left-2 -top-6 text-7xl font-serif text-primary/5 select-none opacity-50">“</span><p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light italic whitespace-pre-wrap break-words relative z-10 pl-2">{data.complaint}</p></div></div>
            </div>
          </div>
        </div>
        <div className="p-6 md:px-10 bg-[#111113]/50 border-t border-white/5 flex flex-col sm:flex-row gap-6 justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">{[1, 2, 3].map(i => (<div key={i} className="w-7 h-7 rounded-full border-2 border-[#09090B] bg-gray-800 flex items-center justify-center text-[8px] font-black text-primary/50">V{i}</div>))}</div>
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Validated System Log</span>
          </div>
          <button onClick={close} className="w-full sm:w-auto px-12 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary-dull hover:shadow-[0_0_25px_rgba(248,69,101,0.3)] transition-all active:scale-95 cursor-pointer">Close Report</button>
        </div>
      </div>
    </div>
  );
};

export default StatementDetailsPopUp;