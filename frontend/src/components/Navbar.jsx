import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  Instagram,
  MessageCircle,
  Facebook,
  AtSign,
  Youtube,
  Send,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const socialLinks = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/sihabsiuuu",
      label: "Github",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://linkedin.com/in/sihabsiuuu",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={18} />,
      href: "https://x.com/sihabxd",
      label: "Twitter",
    },
    {
      icon: <AtSign size={18} />,
      href: "https://threads.net/@yourusername",
      label: "Threads",
    },
    {
      icon: <Instagram size={18} />,
      href: "https://instagram.com/yourusername",
      label: "Instagram",
    },
    {
      icon: <Facebook size={18} />,
      href: "https://facebook.com/yourusername",
      label: "Facebook",
    },
    { icon: <Youtube size={18} />, href: "#", label: "YouTube" },
    {
      icon: <MessageCircle size={18} />,
      href: "https://wa.me/yournumber",
      label: "WhatsApp",
    },
    {
      icon: <Send size={18} />,
      href: "https://t.me/yourusername",
      label: "Telegram",
    },
    {
      icon: <Mail size={18} />,
      href: "mailto:sihab.dev.official@gmail.com",
      label: "Email",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-[#09090B]/80 backdrop-blur-md border-b border-primary/20 py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <button
          onClick={() => handleNavigation("/")}
          className="group flex items-center gap-1 bg-transparent border-none cursor-pointer outline-none z-[10001]"
        >
          <span className="text-[20px] md:text-[22px] font-black tracking-tighter text-white uppercase italic">
            Civic
            <span className="text-primary drop-shadow-[0_0_10px_rgba(248,69,101,0.4)] not-italic">
              .
            </span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {[
            { path: "/", label: "SUBMIT" },
            { path: "/view-complaints", label: "RECORDS" },
          ].map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavigation(link.path)}
              className="relative py-1 group bg-transparent border-none cursor-pointer"
            >
              <span
                className={`text-[11px] font-bold tracking-[0.3em] transition-all duration-300 ${isActive(link.path) ? "text-primary" : "text-gray-400 group-hover:text-white"}`}
              >
                {link.label}
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${isActive(link.path) ? "w-full bg-primary shadow-[0_0_8px_rgba(248,69,101,0.6)]" : "w-0 group-hover:w-full bg-primary/40"}`}
              />
            </button>
          ))}
        </div>

        <button
          className="md:hidden z-[10001] text-white hover:text-primary active:scale-90 bg-transparent border-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={28} strokeWidth={2.5} />
          ) : (
            <Menu size={28} strokeWidth={2.5} />
          )}
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 w-full h-screen bg-[#09090B] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"}`}
      >
        <div className="h-full flex flex-col px-8 sm:px-12 pt-20 pb-12 relative overflow-y-auto">
          <div className="flex-grow flex flex-col justify-center gap-4 z-10">
            {[
              { path: "/", label: "SUBMIT REPORT" },
              { path: "/view-complaints", label: "VIEW RECORDS" },
            ].map((link, index) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`flex items-center justify-between w-full group py-4 transition-all duration-700 bg-transparent border-none text-left ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <span
                  className={`text-4xl sm:text-5xl font-black tracking-tighter italic transition-colors duration-300 ${isActive(link.path) ? "text-primary" : "text-white group-hover:text-primary"}`}
                >
                  {link.label}
                </span>
                <ArrowUpRight
                  className={`transition-all duration-500 ${isActive(link.path) ? "text-primary" : "text-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`}
                  size={36}
                />
              </button>
            ))}
          </div>

          <div className="z-10 mt-auto pt-8">
            <div
              className={`h-[1px] bg-gradient-to-r from-primary/60 via-primary-dull/20 to-transparent w-full mb-8 transition-all duration-[1500ms] delay-500 origin-left ${isOpen ? "scale-x-100" : "scale-x-0"}`}
            />
            <div className="flex flex-col gap-6">
              <span
                className={`text-[10px] font-bold tracking-[0.4em] text-primary-dull/60 transition-all duration-700 delay-700 uppercase ${isOpen ? "opacity-100" : "opacity-0"}`}
              >
                Connect With Us
              </span>
              <div className="grid grid-cols-5 gap-3 max-w-[320px]">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center aspect-square text-white/60 border border-primary/20 rounded-xl bg-primary/5 transition-all duration-500 hover:text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_rgba(248,69,101,0.4)] hover:-translate-y-1 active:scale-95 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                    style={{ transitionDelay: `${800 + index * 40}ms` }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full transition-opacity duration-1000 pointer-events-none ${isOpen ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
