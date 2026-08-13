import { useState } from "react";

export function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(null);

  const skillCategories = [
    {
      title: "Backend & APIs",
      colorClass: "border-neon-purple/30 hover:border-neon-purple hover:shadow-[0_0_15px_rgba(170,59,255,0.25)] text-neon-purple",
      badgeBg: "bg-neon-purple/10 border-neon-purple/30 text-neon-purple",
      glowColor: "phosphor-glow-purple",
      skills: ["FastAPI", "Django", "REST APIs", "Microservicios", "API Gateways", "Programación Asíncrona", "WebSockets"],
    },
    {
      title: "Mobile & Frontend",
      colorClass: "border-neon-cyan/30 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] text-neon-cyan",
      badgeBg: "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan",
      glowColor: "phosphor-glow-cyan",
      skills: ["Flutter", "GoRouter", "Provider", "GetIt", "React", "Tailwind CSS", "Responsive Design"],
    },
    {
      title: "Seguridad & Redes",
      colorClass: "border-neon-green/30 hover:border-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.25)] text-neon-green",
      badgeBg: "bg-neon-green/10 border-neon-green/30 text-neon-green",
      glowColor: "phosphor-glow",
      skills: ["OWASP Top 10", "ISO 27001", "Auditoría de Sistemas", "VLANs", "ACLs", "Hardening", "Cisco IOS"],
    },
    {
      title: "Lenguajes & Bases de Datos",
      colorClass: "border-yellow-500/30 hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.25)] text-yellow-400",
      badgeBg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      glowColor: "text-shadow-yellow", // Custom style defined inline or default text shadow
      skills: ["Python", "Dart", "PHP", "JavaScript", "SQL", "PostgreSQL", "MySQL", "SQLite", "Supabase"],
    },
    {
      title: "Arquitectura & Desarrollo",
      colorClass: "border-neutral-500/30 hover:border-neutral-400 hover:shadow-[0_0_15px_rgba(163,163,163,0.25)] text-neutral-300",
      badgeBg: "bg-neutral-800 border-neutral-700 text-neutral-300",
      glowColor: "",
      skills: ["Clean Architecture", "Arquitectura Modular", "Monorepos", "Melos", "Git / GitHub", "CI/CD"],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl font-black uppercase text-text-bright tracking-wider">
          RACK DE MÓDULOS DE HARDWARE
        </h2>
        <p className="mono-text text-xs text-neutral-500 uppercase tracking-widest">
          Módulos de hardware cargados en el procesador central del portafolio
        </p>
      </div>

      {/* Grid of Server Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className={`glass-panel p-6 rounded-xl border flex flex-col justify-between transition-all duration-350 bg-bg-panel/20 ${cat.colorClass}`}
            onMouseEnter={() => setActiveCategory(idx)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {/* Module Title / Status bar */}
            <div className="flex items-center justify-between border-b border-border-retro pb-4 mb-4">
              <span className={`mono-text text-sm font-bold uppercase tracking-widest ${activeCategory === idx ? cat.glowColor : ""}`}>
                {cat.title}
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${activeCategory === idx ? "bg-current animate-ping" : "bg-neutral-700"}`} />
                <span className="mono-text text-[9px] text-neutral-600 font-bold uppercase">MOD_0{idx + 1}</span>
              </div>
            </div>

            {/* List of Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className={`mono-text text-[11px] font-medium px-2 py-1 rounded border transition-all duration-200 ${cat.badgeBg}`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Simulated hardware stat details */}
            <div className="border-t border-border-retro pt-4 mt-auto flex justify-between items-center text-[10px] mono-text text-neutral-600 uppercase">
              <span>Status: Active</span>
              <span>Temp: 34°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SkillsMatrix;
