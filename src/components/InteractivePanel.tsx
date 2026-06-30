import React, { useState } from "react";
import { Search, Sparkles, FileText, CheckCircle2, AlertCircle, Copy, Check, Info } from "lucide-react";
import { ResumeData } from "../types";

interface InteractivePanelProps {
  data: ResumeData;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export const InteractivePanel: React.FC<InteractivePanelProps> = ({
  data,
  searchQuery,
  onSearchChange,
  selectedSkill,
  onSelectSkill,
}) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    tailoredPitch: string;
  } | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Quick Persona Filters
  const personas = [
    { name: "AI & Automation", skill: "OpenAI API", search: "ai chatbots" },
    { name: "Full Stack Developer", skill: "Next.js", search: "react" },
    { name: "SaaS Architect", skill: "PostgreSQL", search: "saas" },
    { name: "DevOps & Cloud", skill: "AWS", search: "docker" },
  ];

  const handlePersonaClick = (p: typeof personas[0]) => {
    onSelectSkill(p.skill);
    onSearchChange(p.search);
  };

  const handleClearAll = () => {
    onSelectSkill(null);
    onSearchChange("");
    setJobDescription("");
    setAnalysisResult(null);
  };

  // Algorithmic ATS Scanner
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const jdLower = jobDescription.toLowerCase();
      
      // Collect all flat skills
      const allFlatSkills = data.skills.flatMap((cat) => cat.items);
      
      const matched: string[] = [];
      const missing: string[] = [];

      allFlatSkills.forEach((skill) => {
        if (jdLower.includes(skill.toLowerCase())) {
          matched.push(skill);
        } else {
          // Check for sub-terms or synonyms
          if (skill === "React" && jdLower.includes("reactjs")) matched.push(skill);
          else if (skill === "Next.js" && jdLower.includes("nextjs")) matched.push(skill);
          else if (skill === "Node.js" && jdLower.includes("nodejs")) matched.push(skill);
          else if (skill === "Express.js" && jdLower.includes("expressjs")) matched.push(skill);
          else if (skill === "OpenAI API" && (jdLower.includes("gpt") || jdLower.includes("openai") || jdLower.includes("llm"))) matched.push(skill);
          else if (skill === "AWS" && jdLower.includes("amazon")) matched.push(skill);
          else if (skill === "CI/CD" && jdLower.includes("ci-cd")) matched.push(skill);
          else {
            // Only add to missing if the JD explicitly asks for it
            const skillWords = skill.toLowerCase().split(/[ .&]/);
            const asksForSkill = skillWords.some(w => w.length > 2 && jdLower.includes(w));
            if (asksForSkill) {
              matched.push(skill);
            } else {
              // Add a subset of skills that are highly valued in general if not found in JD
              if (["TypeScript", "PostgreSQL", "Docker", "OpenAI API", "AWS"].includes(skill)) {
                missing.push(skill);
              }
            }
          }
        }
      });

      // Remove duplicates from matched
      const uniqueMatched = Array.from(new Set(matched));
      // Remove matches from missing
      const uniqueMissing = Array.from(new Set(missing)).filter(s => !uniqueMatched.includes(s)).slice(0, 5);

      // Simple score math
      let baseScore = 65; // Mehboob starts high due to broad experience
      baseScore += uniqueMatched.length * 4;
      if (jdLower.includes("senior") || jdLower.includes("lead")) baseScore += 5;
      if (jdLower.includes("saas") || jdLower.includes("automation")) baseScore += 5;
      
      const finalScore = Math.min(Math.max(baseScore, 45), 98); // Max 98 to keep realistic

      // Generate customized recruiting pitch
      let pitch = `Mehboob Khalid is a stellar fit for this role. With 5+ years of full-stack experience, he is uniquely positioned as a Senior AI & SaaS Engineer. `;
      if (uniqueMatched.includes("OpenAI API") || uniqueMatched.includes("LangChain")) {
        pitch += `He has deep expertise in LLM orchestrations, chatbot development, and intelligent workflow automation (e.g., GPT, Whisper, DALL-E integration). `;
      }
      if (uniqueMatched.includes("Next.js") || uniqueMatched.includes("TypeScript") || uniqueMatched.includes("React")) {
        pitch += `On the frontend, his production mastery over React, Next.js, and TypeScript ensures pixel-perfect, highly responsive interfaces. `;
      }
      if (uniqueMatched.includes("AWS") || uniqueMatched.includes("Docker") || uniqueMatched.includes("PostgreSQL")) {
        pitch += `Additionally, he is comfortable architecting secure databases (PostgreSQL) and deploying production-ready containerized workloads via Docker on AWS environments. `;
      }
      pitch += `He operates highly autonomously, matches startup paces, and has a proven history with remote, global clients.`;

      setAnalysisResult({
        score: finalScore,
        matchedSkills: uniqueMatched.slice(0, 10),
        missingSkills: uniqueMissing,
        tailoredPitch: pitch,
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const copyPitch = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.tailoredPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6 no-print">
      {/* Title */}
      <div className="space-y-1">
        <h3 className="font-bold text-gray-900 text-base font-sans flex items-center gap-2">
          <Sparkles size={16} className="text-brand-secondary fill-brand-secondary/10" />
          Recruiter Workspace
        </h3>
        <p className="text-xs text-gray-500 leading-normal font-sans">
          Tools to instantly parse, filter, and evaluate Mehboob's credentials.
        </p>
      </div>

      {/* 1. Live Keyword Search */}
      <div className="space-y-2">
        <label htmlFor="keyword-search" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
          Keyword Filter & Search
        </label>
        <div className="relative">
          <input
            id="keyword-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 'SaaS', 'AWS', 'Python'..."
            aria-label="Search keywords to filter resume content"
            className="w-full text-sm font-sans bg-gray-50 border border-gray-200 focus:border-brand-primary focus:bg-white focus:outline-none py-2.5 pl-9 pr-4 rounded-xl transition-all"
          />
          <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      {/* 2. Quick Presets */}
      <div className="space-y-2.5">
        <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
          Quick Filters by Target Role
        </label>
        <div className="grid grid-cols-2 gap-2">
          {personas.map((p) => {
            const isCurrent = selectedSkill === p.skill && searchQuery === p.search;
            return (
              <button
                key={p.name}
                onClick={() => handlePersonaClick(p)}
                className={`text-left p-2 rounded-xl border text-[11px] font-mono transition-all duration-300 ${
                  isCurrent
                    ? "bg-brand-secondary/5 border-brand-secondary text-brand-secondary font-medium"
                    : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                }`}
              >
                <div className="font-bold truncate">{p.name}</div>
                <div className="text-[9px] text-gray-400 mt-0.5 truncate">
                  Tech: {p.skill}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Smart ATS Match Scanner */}
      <div className="border-t border-gray-100 pt-5 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
            ATS Compatibility Scanner
          </label>
          <span className="text-[10px] text-brand-secondary bg-brand-secondary/5 border border-brand-secondary/10 px-1.5 py-0.5 rounded font-mono font-medium">
            Dynamic
          </span>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-3">
          <label htmlFor="job-description" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
            Job Description
          </label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste your Job Description (JD) here to match with Mehboob's resume..."
            aria-label="Paste job description for ATS analysis"
            className="w-full h-24 text-xs font-sans bg-gray-50 border border-gray-200 focus:border-brand-primary focus:bg-white focus:outline-none p-3 rounded-xl resize-none leading-relaxed transition-all"
          />
          <button
            type="submit"
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white disabled:bg-gray-200 disabled:text-gray-400 text-xs font-mono py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            {isAnalyzing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-brand-primary rounded-full animate-spin" />
                <span>Scanning Resume...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>Analyze JD Match</span>
              </>
            )}
          </button>
        </form>

        {/* ATS Results View */}
        {analysisResult && (
          <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100/80 space-y-4">
            {/* Score circle */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                {/* Simulated circle border based on match quality */}
                <div
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-mono font-bold ${
                    analysisResult.score >= 85
                      ? "border-emerald-500/80 text-emerald-700 bg-emerald-50/30"
                      : "border-brand-secondary/80 text-brand-secondary bg-blue-50/30"
                  }`}
                >
                  {analysisResult.score}%
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-mono font-bold text-gray-900">
                  ATS Match Compatibility
                </div>
                <div className="text-[10px] text-gray-500 font-sans">
                  {analysisResult.score >= 85
                    ? "Excellent compatibility match for your role!"
                    : "Strong candidate with complementary skill sets."}
                </div>
              </div>
            </div>

            {/* Matched / Missing tags */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                Skills Overlap
              </div>
              <div className="flex flex-wrap gap-1">
                {analysisResult.matchedSkills.length > 0 ? (
                  analysisResult.matchedSkills.map((s) => (
                    <span
                      key={`match-${s}`}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100/60 flex items-center gap-0.5"
                    >
                      <CheckCircle2 size={9} className="text-emerald-500 shrink-0" />
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-gray-500 font-sans">No matching tags detected yet.</span>
                )}
              </div>
            </div>

            {/* Missing tags advice */}
            {analysisResult.missingSkills.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                  Recommended Core Focus
                </div>
                <div className="flex flex-wrap gap-1">
                  {analysisResult.missingSkills.map((s) => (
                    <span
                      key={`missing-${s}`}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200/50 flex items-center gap-0.5"
                    >
                      <Info size={9} className="text-gray-400 shrink-0" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tailored intro pitch */}
            <div className="border-t border-gray-100 pt-3.5 mt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                  Recruiter Intro Pitch
                </span>
                <button
                  onClick={copyPitch}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Copy Pitch to Clipboard"
                >
                  {copiedPitch ? (
                    <Check size={11} className="text-emerald-500" />
                  ) : (
                    <Copy size={11} />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-sans bg-white p-3 rounded-lg border border-gray-100/50">
                {analysisResult.tailoredPitch}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Clear/Reset button */}
      {(selectedSkill || searchQuery || jobDescription || analysisResult) && (
        <button
          onClick={handleClearAll}
          className="w-full text-center text-xs font-mono text-gray-400 hover:text-red-500 transition-colors pt-2 block"
        >
          Reset All Filters & Scans
        </button>
      )}
    </div>
  );
};
