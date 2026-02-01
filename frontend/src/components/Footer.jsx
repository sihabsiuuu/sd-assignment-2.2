import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  Facebook,
  AtSign,
  Youtube,
  Send,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    {
      icon: <Github size={16} />,
      href: "https://github.com/sihabsiuuu",
      label: "Github",
    },
    {
      icon: <Linkedin size={16} />,
      href: "https://linkedin.com/in/sihabsiuuu",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={16} />,
      href: "https://x.com/sihabxd",
      label: "Twitter",
    },
    {
      icon: <AtSign size={16} />,
      href: "https://threads.net/@sihabxd",
      label: "Threads",
    },
    {
      icon: <Instagram size={16} />,
      href: "https://instagram.com/sihab.xd",
      label: "Instagram",
    },
    {
      icon: <Facebook size={16} />,
      href: "https://facebook.com/sihab.xd",
      label: "Facebook",
    },
    { icon: <Youtube size={16} />, href: "/", label: "YouTube" },
    {
      icon: <MessageCircle size={16} />,
      href: "https://wa.me/8801736999500",
      label: "WhatsApp",
    },
    { icon: <Send size={16} />, href: "/", label: "Telegram" },
    {
      icon: <Mail size={16} />,
      href: "mailto:sihab.dev.official@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="w-full bg-[#111113] border pt-10 pb-6 px-6 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-4 mb-10">
          <div className="flex-1 flex flex-col items-center md:items-start order-2 md:order-1">
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-sm font-black tracking-tighter text-white uppercase italic transition-all hover:text-primary"
            >
              Civic<span className="text-primary not-italic">.</span>
            </Link>
            <span className="text-[9px] text-gray-700 font-medium tracking-[0.3em] uppercase mt-1">
              Established 2024
            </span>
          </div>
          <div className="flex-[2] flex flex-wrap justify-center gap-3 max-w-xl order-1 md:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-xl border border-white/5 bg-white/[0.01] text-gray-500 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-100"
                aria-label={social.label}
              >
                {social.icon}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/5 text-[8px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest border border-white/10 whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center md:items-end order-3">
            <div className="flex gap-6 mb-2">
              {["Privacy", "Terms"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  onClick={scrollToTop}
                  className="relative text-[9px] font-bold text-gray-600 hover:text-white transition-colors tracking-[0.2em] uppercase group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary/50 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            <span className="text-[9px] text-gray-700 font-medium tracking-[0.2em] uppercase">
              © {currentYear} All Rights Reserved
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="h-[1px] w-full max-w-[500px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <span className="text-[8px] text-gray-800 font-bold uppercase tracking-[1.2em] opacity-30">
            SIHAB • DEVELOPER
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
