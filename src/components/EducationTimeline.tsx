import React from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { EducationItem } from "../types";

interface EducationTimelineProps {
  education: EducationItem[];
}

export const EducationTimeline: React.FC<EducationTimelineProps> = ({ education }) => {
  return (
    <div className="space-y-6 print-tight page-break-avoid">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
        <div className="bg-gray-100 p-1.5 rounded-lg text-gray-800 no-print">
          <GraduationCap size={16} />
        </div>
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 font-sans flex items-center gap-2">
          <GraduationCap size={16} className="print-only hidden print:inline" />
          Education
        </h2>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-gray-200 ml-2 pl-4 space-y-6">
        {education.map((edu, idx) => (
          <div key={`${edu.degree}-${idx}`} className="relative page-break-avoid group">
            {/* Timeline Dot */}
            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border border-gray-400 bg-white group-hover:border-brand-primary group-hover:bg-brand-primary transition-all duration-300" />

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-sm font-sans">
                {edu.degree}
              </h3>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                {edu.institution}
              </p>

              {/* Sub-text */}
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[11px] text-gray-500">
                <span className="flex items-center gap-0.5">
                  <Calendar size={10} />
                  {edu.period}
                </span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MapPin size={10} />
                  {edu.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
