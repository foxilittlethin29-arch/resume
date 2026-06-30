import React from "react";
import { Terminal, Star } from "lucide-react";
import { SkillCategory } from "../types";

interface SkillsGridProps {
  categories: SkillCategory[];
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
  searchQuery: string;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({
  categories,
  selectedSkill,
  onSelectSkill,
  searchQuery,
}) => {
  const handleBadgeClick = (skill: string) => {
    if (selectedSkill && selectedSkill.toLowerCase() === skill.toLowerCase()) {
      onSelectSkill(null); // Deselect if clicked again
    } else {
      onSelectSkill(skill);
    }
  };

  const isMatched = (skill: string): boolean => {
    if (selectedSkill && selectedSkill.toLowerCase() === skill.toLowerCase()) {
      return true;
    }
    if (searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase())) {
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
            <Terminal size={16} />
          </div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 font-sans flex items-center gap-2">
            <Terminal size={16} className="print-only hidden print:inline" />
            Technical Expertise
          </h2>
        </div>
        <button
          onClick={() => onSelectSkill(null)}
          className={`text-xs font-mono text-gray-400 hover:text-brand-secondary transition-colors ${
            selectedSkill ? "underline font-medium text-brand-secondary" : "hidden md:inline"
          } no-print`}
        >
          {selectedSkill ? "Clear active filter" : "Click badges to filter"}
        </button>
      </div>

      {/* Categories Stack */}
      <div className="space-y-4 print-tight">
        {categories.map((cat) => {
          return (
            <div key={cat.category} className="space-y-1.5 page-break-avoid">
              {/* Category Subtitle */}
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                {cat.category}
              </h3>

              {/* Badges Flow */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => {
                  const active = isMatched(skill);
                  const isSelected = selectedSkill?.toLowerCase() === skill.toLowerCase();

                  return (
                    <button
                      key={skill}
                      onClick={() => handleBadgeClick(skill)}
                      className={`font-mono text-[11px] md:text-xs px-2.5 py-1 rounded-full border transition-all duration-300 flex items-center gap-1 cursor-pointer no-print ${
                        isSelected
                          ? "bg-brand-primary text-white border-brand-primary shadow-[0_2px_8px_rgba(17,24,39,0.15)] font-medium scale-105"
                          : active
                          ? "bg-amber-100 text-amber-950 border-amber-400 font-medium"
                          : "bg-white text-gray-700 border-gray-200/70 hover:border-gray-400 hover:bg-gray-50/50"
                      }`}
                    >
                      {/* Optional little dot or icon for selected/matched */}
                      {isSelected && <Star size={10} className="fill-white shrink-0" />}
                      {!isSelected && active && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}

                {/* Print Only Representation (Simple tight tags without hover cursor) */}
                <div className="hidden print:flex flex-wrap gap-1">
                  {cat.items.map((skill) => (
                    <span
                      key={`print-${skill}`}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
