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
import Container from "./Layout/Container";

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
    /* Background set to var(--color-bg-light) and padding tightened to py-5 */
    <footer className="w-full bg-[#111113] border-t border-white/5 py-6 px-6">
      <Container>
        {/* Main Row: Reduced margin-bottom and gaps for minimum height */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 mb-5 w-full">
          {/* Logo and Established */}
          <div className="flex-1 flex flex-col items-center md:items-start order-2 md:order-1">
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-sm font-black tracking-tighter text-white uppercase italic transition-all hover:text-primary"
            >
              Civic<span className="text-primary not-italic">.</span>
            </Link>
            <span className="text-[9px] text-gray-500 font-medium tracking-[0.3em] uppercase mt-0.5">
              Established 2026
            </span>
          </div>

          {/* Social Links: Using var(--radius-2xl) which is 0.3rem */}
          <div className="flex-2 flex flex-wrap justify-center gap-2 max-w-xl order-1 md:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 rounded-2xl border border-white/5 bg-white/1 text-gray-500 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                aria-label={social.label}
              >
                {social.icon}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#111113] text-[8px] text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest border border-white/10 whitespace-nowrap z-10">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* Privacy, Terms and Copyright */}
          <div className="flex-1 flex flex-col items-center md:items-end order-3">
            <div className="flex gap-5 mb-1">
              {["Privacy", "Terms"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  onClick={scrollToTop}
                  className="relative text-[9px] font-bold text-gray-500 hover:text-white transition-colors tracking-[0.2em] uppercase group"
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            <span className="text-[9px] text-gray-500 font-medium tracking-[0.15em] uppercase">
              © {currentYear} All Rights Reserved
            </span>
          </div>
        </div>

        {/* Bottom Tagline: Reduced spacing to gap-2 */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="h-[1px] w-full max-w-100 bg-linear-to-r from-transparent via-primary/40 to-transparent animate-pulse" />
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[1.2em] opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default">
            SIHAB • DEVELOPER
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
