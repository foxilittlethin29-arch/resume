import React, { useState } from "react";
import { FolderGit2, ArrowUpRight, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  projects: Project[];
  selectedSkill: string | null;
  searchQuery: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  projects,
  selectedSkill,
  searchQuery,
}) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    setExpandedProject(expandedProject === title ? null : title);
  };

  const isTagMatched = (tag: string): boolean => {
    if (selectedSkill && tag.toLowerCase() === selectedSkill.toLowerCase()) {
      return true;
    }
    if (searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    return false;
  };

  return (
    <div className="space-y-6 print-tight page-break-avoid">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="bg-gray-100 p-1.5 rounded-lg text-gray-800 no-print">
            <FolderGit2 size={16} />
          </div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 font-sans flex items-center gap-2">
            <FolderGit2 size={16} className="print-only hidden print:inline" />
            Featured Projects
          </h2>
        </div>
        <span className="text-xs text-gray-400 font-mono hidden md:inline no-print">
          Click cards to expand details
        </span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print-tight">
        {projects.map((proj) => {
          const hasMatchedTag = proj.tags.some((t) => isTagMatched(t));
          const isExpanded = expandedProject === proj.title;

          return (
            <div
              key={proj.title}
              onClick={() => toggleExpand(proj.title)}
              className={`group relative text-left bg-white rounded-xl border p-5 transition-all duration-300 cursor-pointer select-none page-break-avoid ${
                hasMatchedTag
                  ? "border-amber-400/80 shadow-[0_4px_20px_rgba(245,158,11,0.04)] bg-amber-50/5"
                  : "border-gray-200/60 hover:border-gray-400 hover:shadow-[0_4px_16px_rgba(0,0,0,0.015)] shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              }`}
            >
              {/* Header: Title and Role */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-base font-sans group-hover:text-brand-secondary transition-colors">
                      {proj.title}
                    </h3>
                    <ArrowUpRight
                      size={14}
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 no-print"
                    />
                  </div>
                  <p className="text-xs font-mono text-gray-500 font-medium mt-0.5">
                    {proj.role}
                  </p>
                </div>

                {/* Expand Toggle */}
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 no-print transition-colors">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-3 font-sans leading-relaxed">
                {proj.description}
              </p>

              {/* Metrics Row (if available) */}
              {proj.metrics && proj.metrics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100/80">
                  {proj.metrics.map((metric) => (
                    <div key={metric} className="flex items-center gap-1.5 font-mono text-xs">
                      <TrendingUp size={12} className="text-emerald-500 shrink-0" />
                      <span className="text-gray-500">Result:</span>
                      <span className="text-gray-800 font-semibold">{metric}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights Expandable Area */}
              {proj.highlights && (isExpanded || true) && (
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isExpanded ? "max-h-60 mt-4 opacity-100" : "max-h-0 print:max-h-60 print:mt-4 opacity-0 print:opacity-100"
                  }`}
                >
                  <div className="border-t border-dashed border-gray-100 pt-3.5 mt-1">
                    <p className="text-xs font-mono font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                      Key Outcomes & Tech Decisions:
                    </p>
                    <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-gray-600 leading-relaxed font-sans">
                      {proj.highlights.map((highlight, hIdx) => (
                        <li key={hIdx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tags / Stack */}
              <div className="mt-4 flex flex-wrap gap-1.5 pt-1.5">
                {proj.tags.map((tag) => {
                  const matched = isTagMatched(tag);
                  return (
                    <span
                      key={tag}
                      className={`font-mono text-[11px] px-2 py-0.5 rounded transition-all duration-300 ${
                        matched
                          ? "bg-amber-100 text-amber-950 border border-amber-300 shadow-sm"
                          : "bg-gray-50 text-gray-600 border border-gray-100"
                      }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
