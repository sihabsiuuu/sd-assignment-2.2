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
import Container from "./Layout/Container";

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
      <Container>
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavigation("/")}
            className="group flex items-center gap-1 bg-transparent border-none cursor-pointer outline-none z-[10001]"
          >
            <span className="text-[20px] md:text-[22px] font-black tracking-tighter text-white uppercase italic">
              Civic
              <span className="text-primary not-italic">.</span>
            </span>
          </button>

          {/* DESKTOP NAV */}
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
                  className={`text-[11px] font-bold tracking-[0.3em] transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
                <span
                  className={`absolute bottom-0.5 left-0 h-[2px] transition-all duration-300 ${
                    isActive(link.path)
                      ? "w-full bg-primary"
                      : "w-0 group-hover:w-full bg-primary/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* MOBILE BUTTON */}
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
      </Container>

      {/* MOBILE MENU — RIGHT → LEFT SLIDE */}
      <div
        className={`md:hidden fixed inset-0 w-full h-screen bg-[#09090B] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col px-8 sm:px-12 pt-20 pb-12 relative overflow-hidden">
          {/* Mobile Nav Links */}
          <div className="flex-grow flex flex-col justify-center gap-4 z-10">
            {[
              { path: "/", label: "SUBMIT REPORT" },
              { path: "/view-complaints", label: "VIEW RECORDS" },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className="flex items-center justify-between w-full group py-4 bg-transparent border-none text-left"
              >
                <span
                  className={`text-4xl sm:text-5xl font-black tracking-tighter italic ${
                    isActive(link.path) ? "text-primary" : "text-white"
                  }`}
                >
                  {link.label}
                </span>
                <ArrowUpRight
                  className={
                    isActive(link.path) ? "text-primary" : "text-white/40"
                  }
                  size={36}
                />
              </button>
            ))}
          </div>

          {/* Footer Social Icons — Centered */}
          <div className="z-10 mt-auto pt-8">
            <div className="h-[1px] bg-gradient-to-r from-primary/60 via-primary-dull/20 to-transparent w-full mb-8" />

            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold tracking-[0.4em] text-primary-dull/60 uppercase text-center">
                Connect With Us
              </span>

              <div className="flex justify-center flex-wrap gap-3 max-w-[320px] mx-auto">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 text-white/60 border border-primary/20 rounded-2xl bg-primary/5 hover:text-white hover:bg-primary hover:border-primary active:scale-95"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-2xl pointer-events-none" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
