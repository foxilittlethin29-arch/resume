import { Routes, Route, Link } from 'react-router-dom';
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Printer,
  Sparkles,
  Layers,
  Languages,
  Award,
  Download,
  Terminal,
  BrainCircuit,
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  User,
  Heart,
  Globe,
  Share2,
  Briefcase,
  GraduationCap
} from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { resumeData } from "./data";
import { ResumeHeader } from "./components/ResumeHeader";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ProjectCard } from "./components/ProjectCard";
import { SkillsGrid } from "./components/SkillsGrid";
import { EducationTimeline } from "./components/EducationTimeline";
import { InteractivePanel } from "./components/InteractivePanel";
import Portfolio from "./components/Portfolio";

export default function App() {
  const [activeTab, setActiveTab] = useState<"interactive" | "classic">("interactive");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    
    try {
      const originalTab = activeTab;
      setActiveTab("classic");
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2.2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        windowWidth: 900
      });
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }
      
      pdf.save("Mehboob_Khalid_Resume.pdf");
      setActiveTab(originalTab);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const highlightSummary = (text: string) => {
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
        <span className="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded transition-all duration-300">
          {match}
        </span>
        {highlightSummary(after)}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col antialiased">
      {/* 1. Header Toolbar (Hidden in Print) */}
      <nav className="no-print bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50 px-4 py-3 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Brand/Signature */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm">
              MK
            </div>
            <div>
              <span className="font-mono font-bold text-xs text-gray-900 tracking-wider">
                MEHBOOB KHALID // RESUME
              </span>
              <span className="block text-[10px] text-gray-400 font-sans">
                Senior Full Stack & AI Engineer
              </span>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200/30">
            <button
              onClick={() => setActiveTab("interactive")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-all ${
                activeTab === "interactive"
                  ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Sparkles size={13} className={activeTab === "interactive" ? "text-amber-500" : ""} />
              Interactive UX
            </button>
            <button
              onClick={() => setActiveTab("classic")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-all ${
                activeTab === "classic"
                  ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FileText size={13} />
              Classic Print
            </button>
          </div>

          {/* Tool Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/portfolio"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-primary/30 bg-brand-primary/5 hover:bg-brand-primary/10 text-xs font-mono font-semibold text-brand-primary transition-all cursor-pointer shadow-sm"
            >
              <Globe size={13} />
              <span>Portfolio</span>
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200/80 bg-white hover:bg-gray-50 text-xs font-mono font-semibold text-gray-600 transition-all cursor-pointer shadow-sm"
              title="Copy Link to Clipboard"
            >
              <Share2 size={13} />
              <span>{shareSuccess ? "Link Copied!" : "Share"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-mono font-semibold text-gray-700 transition-all cursor-pointer shadow-sm"
            >
              <Printer size={13} />
              <span>System Print</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm disabled:opacity-80"
            >
              {isDownloading ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <Download size={13} />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <>
              {/* Main Content Grid */}
              <div className="max-w-6xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side */}
                <div className="lg:col-span-4 space-y-6 no-print">
                  <InteractivePanel
                    data={resumeData}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedSkill={selectedSkill}
                    onSelectSkill={setSelectedSkill}
                  />

                  {/* Availability Card */}
                  <div className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3.5">
                    <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                      <Globe size={15} className="text-emerald-500" />
                      <span>Global Availability</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {resumeData.availability.types.map((type) => (
                        <span
                          key={type}
                          className="bg-emerald-50 text-emerald-800 border border-emerald-100/50 font-mono text-[10px] px-2.5 py-1 rounded-full"
                        >
                          ✓ {type}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 font-mono">
                      Open to: {resumeData.availability.scope}
                    </p>
                  </div>

                  {/* Languages Card */}
                  <div className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3.5">
                    <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                      <Languages size={15} className="text-brand-secondary" />
                      <span>Languages</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-xs text-gray-600">
                      {resumeData.languages.map((lang) => (
                        <div key={lang} className="flex justify-between items-center border-b border-gray-50 pb-1 last:border-0 last:pb-0">
                          <span>{lang}</span>
                          <span className="text-gray-400 text-[10px]">Fluent</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side / Main Paper Column */}
                <div className={`lg:col-span-8 ${activeTab === "classic" ? "lg:col-span-12" : ""}`}>
                  <div
                    ref={resumeRef}
                    className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] space-y-8"
                  >
                    {/* Header section */}
                    <ResumeHeader data={resumeData} />

                    {/* Resume Body */}
                    {activeTab === "interactive" ? (
                      /* --- A. DUAL COLUMN INTERACTIVE BENTO GRID --- */
                      <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                          {/* Left Column: Summary & Experience */}
                          <div className="md:col-span-7 space-y-8">
                            {/* Summary Block */}
                            <section className="space-y-3.5">
                              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                                <div className="bg-gray-100 p-1.5 rounded-lg text-gray-800 no-print">
                                  <User size={15} />
                                </div>
                                <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 font-sans flex items-center gap-2">
                                  <User size={16} className="print-only hidden print:inline" />
                                  Professional Summary
                                </h2>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed font-sans text-justify">
                                {highlightSummary(resumeData.summary)}
                              </p>
                            </section>

                            {/* Experience Timeline */}
                            <section>
                              <ExperienceTimeline
                                experiences={resumeData.experiences}
                                selectedSkill={selectedSkill}
                                searchQuery={searchQuery}
                              />
                            </section>
                          </div>

                          {/* Right Column: Skills, Education, Traits */}
                          <div className="md:col-span-5 space-y-8">
                            {/* Technical Skills */}
                            <section>
                              <SkillsGrid
                                categories={resumeData.skills}
                                selectedSkill={selectedSkill}
                                onSelectSkill={setSelectedSkill}
                                searchQuery={searchQuery}
                              />
                            </section>

                            {/* Education Timeline */}
                            <section>
                              <EducationTimeline education={resumeData.education} />
                            </section>

                            {/* Professional Traits */}
                            <section className="space-y-4 page-break-avoid">
                              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                                <div className="bg-gray-100 p-1.5 rounded-lg text-gray-800 no-print">
                                  <BrainCircuit size={15} />
                                </div>
                                <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 font-sans">
                                  Professional Traits
                                </h2>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {resumeData.traits.map((trait) => {
                                  const matched = searchQuery && trait.toLowerCase().includes(searchQuery.toLowerCase());
                                  return (
                                    <span
                                      key={trait}
                                      className={`font-mono text-[11px] px-2.5 py-1 rounded-lg border transition-all duration-300 ${
                                        matched
                                          ? "bg-amber-100 text-amber-950 border-amber-300 font-medium"
                                          : "bg-gray-50/50 text-gray-700 border-gray-150"
                                      }`}
                                    >
                                      {trait}
                                    </span>
                                  );
                                })}
                              </div>
                            </section>
                          </div>
                        </div>

                        {/* Featured Projects Section */}
                        <section className="border-t border-gray-100 pt-8">
                          <ProjectCard
                            projects={resumeData.projects}
                            selectedSkill={selectedSkill}
                            searchQuery={searchQuery}
                          />
                        </section>
                      </div>
                    ) : (
                      /* --- B. CLASSIC LINEAR ATS OPTIMIZED LAYOUT --- */
                      <div className="space-y-8 print-grid-cols-2">
                        {/* 1. Summary */}
                        <section className="space-y-3">
                          <h2 className="text-base font-bold font-mono text-gray-900 border-b border-gray-200 pb-1 flex items-center gap-2">
                            <User size={14} />
                            PROFESSIONAL SUMMARY
                          </h2>
                          <p className="text-sm text-gray-600 leading-relaxed font-sans text-justify">
                            {resumeData.summary}
                          </p>
                        </section>

                        {/* 2. Skills Grid */}
                        <section className="space-y-3 page-break-avoid">
                          <h2 className="text-base font-bold font-mono text-gray-900 border-b border-gray-200 pb-1 flex items-center gap-2">
                            <Terminal size={14} />
                            CORE TECHNICAL SKILLS
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {resumeData.skills.map((cat) => (
                              <div key={cat.category} className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider block">
                                  {cat.category}
                                </span>
                                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                                  {cat.items.join(", ")}
                                </p>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* 3. Professional Experience */}
                        <section className="space-y-4">
                          <h2 className="text-base font-bold font-mono text-gray-900 border-b border-gray-200 pb-1 flex items-center gap-2">
                            <Briefcase size={14} />
                            PROFESSIONAL EXPERIENCE
                          </h2>
                          <div className="space-y-6">
                            {resumeData.experiences.map((exp, idx) => (
                              <div key={idx} className="space-y-2 page-break-avoid">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start font-sans">
                                  <div>
                                    <span className="font-bold text-gray-900 text-base">{exp.role}</span>
                                    <span className="text-gray-400 font-light mx-2">|</span>
                                    <span className="font-medium text-gray-700 text-sm">{exp.company}</span>
                                  </div>
                                  <div className="font-mono text-xs text-gray-500 mt-1 sm:mt-0">
                                    {exp.period} • {exp.location}
                                  </div>
                                </div>
                                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                                  {exp.bullets.map((b, bIdx) => (
                                    <li key={bIdx}>{b}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* 4. Featured Projects */}
                        <section className="space-y-4 page-break-avoid">
                          <h2 className="text-base font-bold font-mono text-gray-900 border-b border-gray-200 pb-1 flex items-center gap-2">
                            <Layers size={14} />
                            FEATURED ENGINEERING PROJECTS
                          </h2>
                          <div className="space-y-4">
                            {resumeData.projects.map((proj) => (
                              <div key={proj.title} className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50 space-y-1.5 page-break-avoid">
                                <div className="flex justify-between items-start font-sans">
                                  <h3 className="font-bold text-gray-900 text-sm">{proj.title}</h3>
                                  <span className="font-mono text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    {proj.role}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                                  {proj.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {proj.tags.map((t) => (
                                    <span key={t} className="font-mono text-[9px] bg-white text-gray-500 border border-gray-150 px-1.5 py-0.5 rounded">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* 5. Education & Background */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 page-break-avoid">
                          <section className="space-y-3">
                            <h2 className="text-base font-bold font-mono text-gray-900 border-b border-gray-200 pb-1 flex items-center gap-2">
                              <GraduationCap size={14} />
                              EDUCATION
                            </h2>
                            <div className="space-y-3 font-sans">
                              {resumeData.education.map((edu, idx) => (
                                <div key={idx} className="text-xs">
                                  <div className="font-bold text-gray-900">{edu.degree}</div>
                                  <div className="text-gray-700 text-[11px]">{edu.institution}</div>
                                  <div className="font-mono text-gray-400 text-[10px] mt-0.5">
                                    {edu.period} • {edu.location}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>

                          {/* Traits */}
                          <section className="space-y-3">
                            <h2 className="text-base font-bold font-mono text-gray-900 border-b border-gray-200 pb-1 flex items-center gap-2">
                              <BrainCircuit size={14} />
                              TRAITS & CAPABILITIES
                            </h2>
                            <div className="flex flex-wrap gap-1">
                              {resumeData.traits.map((trait) => (
                                <span key={trait} className="font-mono text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 border border-gray-150 rounded">
                                  {trait}
                                </span>
                              ))}
                            </div>
                          </section>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          } />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>

      {/* 3. Footer Banner (Hidden in Print) */}
      <footer className="no-print bg-white border-t border-gray-200/60 py-6 mt-12 text-center text-xs font-mono text-gray-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            <span>Built with React, Tailwind v4 & Framer-Motion. Designed to look expensive.</span>
            <Heart size={10} className="fill-red-400 text-red-400" />
          </div>
          <div>
            <span>© 2026 MEHBOOB KHALID</span>
          </div>
        </div>
      </footer>
    </div>
  );
}