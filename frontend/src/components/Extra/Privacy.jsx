import React from "react";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import Container from "../Layout/Container";

const Privacy = () => {
  const sections = [
    {
      icon: <Eye size={20} />,
      title: "Data Collection",
      content:
        "We collect information you provide directly to us when reporting civic issues, including location data and images.",
    },
    {
      icon: <Lock size={20} />,
      title: "Data Security",
      content:
        "Your reports are encrypted. We implement industry-standard security measures to protect your personal information.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Public Transparency",
      content:
        "Issue details are public to ensure government accountability, but personal contact details remain private.",
    },
  ];

  return (
    <div className="min-h-screen py-24 font-['Outfit']">
      <Container className="w-full mx-auto">
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <FileText className="text-primary" size={20} />
            <span className="text-[11px] font-bold tracking-[0.4em] text-primary uppercase">
              Legal Document
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic mb-6">
            Privacy<span className="text-primary not-italic">.</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-wide max-w-2xl leading-relaxed">
            Last updated: January 2026. This policy describes how Civic. handles
            your data and ensures your voice is heard securely.
          </p>
        </div>
        <div className="grid gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/2 border border-white/5 hover:border-primary/40 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 p-8 rounded-2xl border border-dashed border-white/10 text-center">
          <p className="text-gray-500 text-[11px] tracking-[0.2em] uppercase mb-4">
            Have questions about your data?
          </p>
          <a
            href="mailto:privacy@civic.com"
            className="text-white font-bold hover:text-primary transition-colors uppercase tracking-widest text-xs"
          >
            Contact Data Protection Officer
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Privacy;
