import React from "react";
import { Scale, AlertCircle, CheckCircle2, Gavel } from "lucide-react";
import Container from "../Layout/Container";

const Terms = () => {
  const rules = [
    {
      icon: <CheckCircle2 size={20} />,
      title: "User Responsibility",
      content:
        "You agree to provide accurate location data and honest descriptions when submitting civic reports.",
    },
    {
      icon: <AlertCircle size={20} />,
      title: "Prohibited Content",
      content:
        "Harassment, spam, or false reporting is strictly prohibited and may result in a permanent ban.",
    },
    {
      icon: <Scale size={20} />,
      title: "Intellectual Property",
      content:
        "By uploading images, you grant Civic. a license to share the media with relevant government authorities.",
    },
  ];

  return (
    <Container className="min-h-screen py-24 font-['Outfit']">
      <div className="font-['Outfit'] w-full">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <Gavel className="text-primary" size={20} />
            <span className="text-[11px] font-bold tracking-[0.4em] text-primary uppercase">
              User Agreement
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic mb-6">
            Terms<span className="text-primary not-italic">.</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-wide max-w-2xl leading-relaxed mx-auto md:mx-0">
            By using Civic., you agree to follow our community guidelines and
            legal framework designed to improve our city.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid gap-6">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                  {rule.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-3">
                    {rule.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed">
                    {rule.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Termination Clause */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
          <h4 className="text-white font-bold tracking-widest uppercase text-[10px] mb-4">
            Termination Clause
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            Civic. reserves the right to moderate or remove any content that
            violates these terms without prior notice.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Terms;
