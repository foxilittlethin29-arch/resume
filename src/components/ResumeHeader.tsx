import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Github, Linkedin, Globe, Copy, Check } from "lucide-react";
import { ResumeData } from "../types";

interface ResumeHeaderProps {
  data: ResumeData;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({ data }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <header id="resume-header" className="relative border-b border-gray-100 pb-8 md:pb-10">
      {/* Visual Accent Bar */}
      <div className="absolute top-0 left-0 h-1.5 w-24 bg-brand-primary rounded-full no-print" />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 pt-4">
        {/* Left: Name and Title Roles */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 font-sans leading-none">
            {data.name}
          </h1>

          {/* Subtitles / Roles */}
          <div className="mt-4 flex flex-wrap gap-2 items-center text-sm md:text-base font-medium">
            {data.titles.map((title, idx) => (
              <React.Fragment key={title}>
                {idx > 0 && (
                  <span className="text-gray-300 select-none font-light" aria-hidden="true">
                    •
                  </span>
                )}
                <span className="text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100/60 font-mono text-xs md:text-sm shadow-sm">
                  {title}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right: Modern Contact Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 text-xs text-gray-600 font-mono bg-gray-50/50 p-4 rounded-xl border border-gray-100 max-w-sm w-full shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <span>{data.location}</span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2 overflow-hidden">
              <Mail size={14} className="text-gray-400 shrink-0" />
              <a
                href={`mailto:${data.email}`}
                className="hover:text-brand-secondary transition-colors truncate hover:underline"
              >
                {data.email}
              </a>
            </div>
            <button
              onClick={() => copyToClipboard(data.email, "email")}
              className="text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-0.5 no-print"
              title="Copy Email"
            >
              {copiedField === "email" ? (
                <Check size={12} className="text-emerald-500" />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-400 shrink-0" />
              <a
                href={`tel:${data.phone.replace(/\s+/g, "")}`}
                className="hover:text-brand-secondary transition-colors hover:underline"
              >
                {data.phone}
              </a>
            </div>
            <button
              onClick={() => copyToClipboard(data.phone, "phone")}
              className="text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-0.5 no-print"
              title="Copy Phone"
            >
              {copiedField === "phone" ? (
                <Check size={12} className="text-emerald-500" />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gray-200/60 my-1 col-span-full" />

          {/* Links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 col-span-full mt-1">
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-brand-primary text-gray-500 transition-colors"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-brand-primary text-gray-500 transition-colors"
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </a>
            <Link
              to="/portfolio"
              className="flex items-center gap-1 hover:text-brand-primary text-gray-500 transition-colors"
            >
              <Globe size={13} />
              <span>Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
