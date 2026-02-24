import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Filter,
  MapPin,
  ChevronDown,
} from "lucide-react";
import {
  getComplaints,
  deleteComplaintByUsername,
} from "../utils/localStorage";
import PopUpCard from "../components/PopUpCard";
import ListCard from "../components/ListCard";
import Container from "../components/Layout/Container";

const LIST_STATE_KEY = "complaint_list_state";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filters
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Load complaints & saved state
  useEffect(() => {
    document.title = "Complaints Records | Civic";
    const data = getComplaints();
    setComplaints(Array.isArray(data) ? data : []);

    const saved = localStorage.getItem(LIST_STATE_KEY);
    if (saved) {
      const s = JSON.parse(saved);
      setSearch(s.search || "");
      setFilterCategory(s.filterCategory || "All");
      setFilterLocation(s.filterLocation || "All");
      setCurrentPage(s.currentPage || 1);
    }
  }, []);

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterCategory, filterLocation]);

  // Save state
  useEffect(() => {
    localStorage.setItem(
      LIST_STATE_KEY,
      JSON.stringify({ search, filterCategory, filterLocation, currentPage }),
    );
  }, [search, filterCategory, filterLocation, currentPage]);

  // Filter logic
  const filtered = complaints.filter((c) => {
    const term = search.toLowerCase();
    const matchesSearch =
      c.username?.toLowerCase().includes(term) ||
      c.location?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.category?.toLowerCase().includes(term);

    const matchesCategory =
      filterCategory === "All" || c.category === filterCategory;
    const matchesLocation =
      filterLocation === "All" || c.location === filterLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // STATIC FILTER OPTIONS (Original Text)
  const availableCategories = [
    "All",
    ...Array.from(new Set(complaints.map((c) => c.category))),
  ];
  const availableLocations = [
    "All",
    ...Array.from(new Set(complaints.map((c) => c.location))),
  ];

  // Pagination
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopy = (e, text) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    window.alert(`Copied: ${text}`);
  };

  const handleDeleteRequest = (username) => {
    if (window.confirm(`Permanently delete record for @${username}?`)) {
      const updated = deleteComplaintByUsername(username);
      setComplaints(Array.isArray(updated) ? updated : []);
      const newTotalPages = Math.ceil(updated.length / itemsPerPage) || 1;
      if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilterCategory("All");
    setFilterLocation("All");
    setCurrentPage(1);
    localStorage.removeItem(LIST_STATE_KEY);
  };

  const isFiltered =
    search !== "" || filterCategory !== "All" || filterLocation !== "All";

  return (
    <Container className="py-24 md:py-24 min-h-screen relative text-white">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-8 mb-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl border border-white/10 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-white/80 tracking-widest uppercase">
                {totalItems.toString().padStart(2, "0")} Records Found
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none">
              Complaints<span className="text-primary">.</span>
            </h2>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("complaint_form_state");
              navigate("/");
            }}
            className="group flex items-center justify-center gap-3 bg-primary/10 border border-primary/40 px-8 h-14 rounded-2xl hover:bg-primary-dull transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <Plus
              size={18}
              className="text-primary group-hover:text-white transition-colors"
            />
            <span className="text-white font-black text-[11px] tracking-[0.2em] uppercase">
              New Entry
            </span>
          </button>
        </div>

        {/* FILTER BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* SEARCH */}
          <div className="relative group col-span-1 sm:col-span-2">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by ID, city or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-bg-light border border-white/10 h-14 pl-14 pr-6 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all w-full font-semibold tracking-wide shadow-inner"
            />
          </div>

          {/* CATEGORY */}
          <div className="relative group">
            <Filter
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors pointer-events-none"
              size={18}
            />
            <ChevronDown
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary/50 pointer-events-none"
              size={14}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-bg-light border border-white/10 h-14 pl-14 pr-10 rounded-2xl text-[11px] text-white/70 focus:outline-none focus:border-primary/40 transition-all w-full appearance-none font-black uppercase tracking-widest cursor-pointer shadow-inner hover:border-white/20"
            >
              {availableCategories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-bg-light text-sm font-sans"
                >
                  {cat === "All" ? "All Category" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* LOCATION */}
          <div className="relative group">
            <MapPin
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors pointer-events-none"
              size={18}
            />
            <ChevronDown
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary/50 pointer-events-none"
              size={14}
            />
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="bg-bg-light border border-white/10 h-14 pl-14 pr-10 rounded-2xl text-[11px] text-white/70 focus:outline-none focus:border-primary/40 transition-all w-full appearance-none font-black uppercase tracking-widest cursor-pointer shadow-inner hover:border-white/20"
            >
              {availableLocations.map((loc) => (
                <option
                  key={loc}
                  value={loc}
                  className="bg-bg-light text-sm font-sans"
                >
                  {loc === "All" ? "All Location" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* RESET FILTERS */}
          {isFiltered && (
            <div
              onClick={handleResetFilters}
              className="flex items-center justify-end col-span-1 sm:col-span-2 lg:col-span-4 text-red-500/60 text-[10px] font-black uppercase tracking-[0.4em] cursor-pointer hover:text-red-500 transition-all select-none pr-2"
            >
              Reset All
            </div>
          )}
        </div>
      </div>

      {/* LIST SECTION */}
      {totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-bg-light/20 rounded-2xl border-2 border-dashed border-white/5 w-full">
          <p className="text-white/30 font-bold uppercase tracking-[0.4em] text-[10px] text-center">
            No matching records found
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 w-full">
            {currentItems.map((c, index) => (
              <ListCard
                key={c.username || index}
                c={c}
                handleDeleteRequest={handleDeleteRequest}
                handleCopy={handleCopy}
                setSelectedComplaint={setSelectedComplaint}
              />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 mt-4">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl border border-white/5 bg-bg-light hover:border-primary/40 disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={16} className="text-primary" />
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-2xl font-black text-[10px] border transition-all ${
                            currentPage === pageNum
                              ? "bg-primary border-primary text-black"
                              : "bg-bg-light border-white/5 text-white/40 hover:text-white"
                          }`}
                        >
                          {pageNum.toString().padStart(2, "0")}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl border border-white/5 bg-bg-light hover:border-primary/40 disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={16} className="text-primary" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedComplaint && (
        <PopUpCard
          data={selectedComplaint}
          close={() => setSelectedComplaint(null)}
          handleCopy={handleCopy}
        />
      )}
    </Container>
  );
};

export default ComplaintList;
