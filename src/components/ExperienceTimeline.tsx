import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Experience } from "../types";

interface ExperienceTimelineProps {
  experiences: Experience[];
  selectedSkill: string | null;
  searchQuery: string;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  selectedSkill,
  searchQuery,
}) => {
  // Helper to check if a string contains any match to highlight
  const checkHighlight = (text: string): boolean => {
    if (selectedSkill && text.toLowerCase().includes(selectedSkill.toLowerCase())) {
      return true;
    }
    if (searchQuery && text.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    return false;
  };

  // Render text with highlighted matches
  const renderHighlightedText = (text: string) => {
    const term = selectedSkill || searchQuery;
    if (!term) return text;

    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + term.length);
    const after = text.substring(index + term.length);

    return (
      <>
        {before}
        <span className="bg-amber-100 text-amber-950 font-medium px-0.5 rounded transition-all duration-300">
          {match}
        </span>
        {renderHighlightedText(after)}
      </>
    );
  };

  return (
    <div className="space-y-8 print-tight">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
        <div className="bg-gray-100 p-1.5 rounded-lg text-gray-800 no-print">
          <Briefcase size={16} />
        </div>
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 font-sans flex items-center gap-2">
          <Briefcase size={16} className="print-only hidden print:inline" />
          Professional Experience
        </h2>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-gray-100 ml-3.5 pl-6 space-y-10">
        {experiences.map((exp, index) => {
          const hasFeaturedBullet = exp.bullets.some((b) => checkHighlight(b));

          return (
            <div
              key={`${exp.company}-${index}`}
              className={`relative group transition-all duration-300 page-break-avoid ${
                hasFeaturedBullet
                  ? "bg-amber-50/20 -mx-3 p-3 rounded-xl border border-amber-100/30 shadow-[0_4px_12px_rgba(245,158,11,0.02)]"
                  : ""
              }`}
            >
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-all duration-300 ${
                  hasFeaturedBullet
                    ? "border-amber-400 bg-amber-400 scale-110 shadow-sm"
                    : "border-gray-300 group-hover:border-brand-primary group-hover:scale-110"
                }`}
              />

              {/* Title & Metadata */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 pb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-base font-sans group-hover:text-brand-secondary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 sm:text-right font-mono text-xs text-gray-500 mt-1 sm:mt-0">
                  <span className="flex items-center gap-1 sm:justify-end">
                    <Calendar size={12} className="text-gray-400" />
                    {exp.period}
                  </span>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <span className="flex items-center gap-1 sm:justify-end">
                    <MapPin size={12} className="text-gray-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Roles Bullets */}
              <ul className="space-y-2.5 text-sm text-gray-600 list-disc list-outside pl-4 leading-relaxed font-sans">
                {exp.bullets.map((bullet, bIdx) => {
                  const isHighlighted = checkHighlight(bullet);
                  return (
                    <li
                      key={bIdx}
                      className={`transition-all duration-300 ${
                        isHighlighted
                          ? "text-gray-950 font-normal pl-0.5 list-none before:content-['⚡'] before:mr-1 before:text-amber-500"
                          : "hover:text-gray-800"
                      }`}
                    >
                      {renderHighlightedText(bullet)}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
