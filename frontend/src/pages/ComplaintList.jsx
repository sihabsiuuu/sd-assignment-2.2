import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Copy, Trash2, Search, Plus, Eye, User, ArrowRight } from 'lucide-react';
import StatementDetailsPopUp from '../components/StatementDetailsPopUp';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { setComplaints(JSON.parse(localStorage.getItem('complaints') || '[]')); }, []);

  const handleCopy = (e, text) => { e?.stopPropagation(); navigator.clipboard.writeText(text); window.alert(`Copied: ${text}`); };

  const handleDeleteRequest = (username) => {
    if (window.confirm(`Permanently delete record for @${username}?`)) {
      const updated = complaints.filter(c => c.username !== username);
      localStorage.setItem('complaints', JSON.stringify(updated));
      setComplaints(updated);
    }
  };

  const filtered = complaints.filter(c => c.username.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 md:px-8 min-h-screen relative text-white">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
        <div className="space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl border border-primary/20 bg-primary/5"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /><span className="text-[10px] font-black text-white/80 tracking-widest uppercase">{complaints.length.toString().padStart(2, '0')} Records Found</span></div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none">Complaints<span className="text-primary">.</span></h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative group flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} /><input type="text" placeholder="Search by ID or City..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-[#111113] border border-white/5 p-4 pl-12 pr-6 rounded-2xl text-sm text-white focus:outline-none focus:border-primary/50 transition-all w-full lg:w-80 font-medium" /></div>
          <button onClick={() => navigate('/')} className="group relative flex items-center justify-center gap-3 bg-primary/10 border border-primary/50 px-8 py-4 rounded-2xl hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(248,69,101,0.15)] hover:shadow-primary/40 cursor-pointer active:scale-95"><Plus size={18} className="text-primary group-hover:text-white transition-colors" /><span className="text-white font-black text-[11px] tracking-[0.2em] uppercase">New Entry</span></button>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-[#111113]/30 rounded-2xl border-2 border-dashed border-white/5 w-full"><p className="text-gray-600 font-bold uppercase tracking-[0.4em] text-[10px] text-center">No matching records found</p></div>
      ) : (
        <div className="space-y-4">
          {filtered.map((c, index) => (
            <div key={index} className="group bg-[#111113] border border-white/5 rounded-2xl hover:border-primary/30 transition-all duration-500 overflow-hidden shadow-sm">
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center">
                <div className="lg:col-span-3 flex justify-between items-start lg:block min-w-0">
                  <div className="space-y-3 min-w-0">
                    <h3 className="text-primary font-black text-xl tracking-tighter uppercase leading-none break-all">@{c.username}</h3>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 border border-white/5 rounded-2xl w-fit"><User size={12} className="text-primary/70 shrink-0" /><p className="text-white/80 text-[10px] font-bold uppercase tracking-tight truncate">{c.firstName} {c.lastName}</p></div>
                  </div>
                  <button onClick={() => handleDeleteRequest(c.username)} className="lg:hidden p-3.5 bg-white/5 border border-white/10 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"><Trash2 size={18} /></button>
                </div>
                <div className="lg:col-span-3 space-y-4 border-l-0 lg:border-l border-white/5 lg:pl-8">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.location)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white   transition-all group/map"><div className="p-2.5 bg-white/5 rounded-2xl border border-white/5 group-hover/map:border-primary/40 shrink-0 flex items-center justify-center transition-all"><MapPin size={16} className="text-primary/60" /></div><span className="text-sm font-semibold truncate tracking-tight">{c.location}</span></a>
                  <div className="flex items-center gap-3">
                    <a href={`tel:${c.phone}`} className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group/phone min-w-0"><div className="p-2.5 bg-white/5 rounded-2xl border border-white/5 group-hover/phone:border-primary/40 shrink-0 flex items-center justify-center transition-all"><Phone size={16} className="text-primary/60" /></div><span className="text-xs font-mono tracking-widest truncate">{c.phone}</span></a>
                    <button onClick={(e) => handleCopy(e, c.phone)} className="ml-auto p-2.5 hover:bg-white/5 rounded-2xl text-gray-600 hover:text-primary transition-all border border-transparent cursor-pointer"><Copy size={14} /></button>
                  </div>
                </div>
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-10 min-w-0 h-full">
                  <div className="flex flex-col h-full justify-between gap-6">
                    <div className="relative"><div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/5 to-transparent rounded-full hidden lg:block" /><p className="text-gray-400 hover:text-white text-sm leading-relaxed font-light italic line-clamp-2 pl-2">"{c.complaint}"</p></div>
                    <button onClick={() => setSelectedComplaint(c)} className="group/btn relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-1 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.04] cursor-pointer active:scale-[0.99]">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3"><div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-primary/10 border border-primary/20 group-hover/btn:bg-primary group-hover/btn:border-primary transition-all duration-300"><Eye size={16} className="text-primary group-hover/btn:text-white" /></div><div className="flex flex-col items-start text-left"><span className="text-white font-black text-[10px] uppercase tracking-[0.2em] leading-none mb-1">Analysis Portal</span><span className="text-white/40 text-[8px] font-bold uppercase tracking-widest group-hover/btn:text-primary/60 transition-colors">View Decrypted Log</span></div></div>
                        <div className="flex items-center gap-2"><div className="h-px w-6 bg-white/10 group-hover/btn:w-10 group-hover/btn:bg-primary/50 transition-all duration-500" /><ArrowRight size={16} className="text-white/20 group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all" /></div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="hidden lg:col-span-1 lg:flex justify-end"><button onClick={() => handleDeleteRequest(c.username)} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-white/20 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all active:scale-90 cursor-pointer"><Trash2 size={20} /></button></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedComplaint && <StatementDetailsPopUp data={selectedComplaint} close={() => setSelectedComplaint(null)} handleCopy={handleCopy} />}
    </div>
  );
};

export default ComplaintList;