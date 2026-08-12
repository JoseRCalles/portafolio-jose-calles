import { CrtMonitor } from "../core/CrtMonitor";

export function Hero() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Profile Details (7 Cols on desktop) */}
      <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-panel border border-border-retro text-xs mono-text text-neon-cyan phosphor-glow-cyan">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
          SYSTEM STATUS: ONLINE
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-bright leading-none">
            JOSÉ RAFAEL JUNIOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green">
              CALLES ANDARA
            </span>
          </h1>
          <p className="text-lg md:text-xl font-medium mono-text text-neon-purple tracking-widest uppercase phosphor-glow-purple pt-2">
            Software Engineer | Backend & Mobile Developer
          </p>
        </div>

        {/* Contact Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
          <div className="flex items-center gap-3 bg-bg-panel/40 p-3 rounded-lg border border-border-retro">
            <div className="text-neon-cyan">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-bg-panel/40 p-3 rounded-lg border border-border-retro">
            <div className="text-neon-green">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-bg-panel/40 p-3 rounded-lg border border-border-retro">
            <div className="text-neon-purple">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-xs">
              <p className="mono-text text-neutral-500 uppercase">EMAIL</p>
              <a href="mailto:joserafaelcalles@gmail.com" className="font-semibold text-text-bright hover:text-neon-purple transition-colors truncate">
                joserafaelcalles@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-bg-panel/40 p-3 rounded-lg border border-border-retro">
            <div className="text-neon-cyan">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div className="text-xs">
              <p className="mono-text text-neutral-500 uppercase">LINKEDIN</p>
              <a href="https://linkedin.com/in/JoseRCalles" target="_blank" rel="noreferrer" className="font-semibold text-text-bright hover:text-neon-cyan transition-colors">
                JoseRCalles
              </a>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="glass-panel p-5 rounded-xl border border-border-retro relative overflow-hidden bg-bg-panel/20 max-w-xl text-sm leading-relaxed">
          <div className="absolute top-0 right-0 p-1.5 mono-text text-[9px] text-neutral-600 bg-neutral-900 border-l border-b border-border-retro">
            SYS_PROFILE
          </div>
          <p className="text-text-muted">
            Ingeniero de Software especializado en desarrollo mobile y backend, con experiencia construyendo aplicaciones multiplataforma, APIs y sistemas orientados a la integración de múltiples servicios. Experiencia principalmente con <span className="text-neon-cyan font-medium">Flutter/Dart</span> y <span className="text-neon-purple font-medium">Python/FastAPI</span>, además de desarrollo full-stack con PHP y JavaScript.
          </p>
          <p className="text-text-muted mt-3">
            He trabajado con Clean Architecture, microservicios, API Gateways, WebSockets y bases de datos relacionales. Complemento mi perfil con conocimientos en <span className="text-neon-green font-medium">seguridad y redes</span> (OWASP Top 10, VLANs, hardening Cisco). Mi formación adicional en <span className="text-text-bright font-medium">Administración de Empresas</span> me permite comprender necesidades operativas y de negocio.
          </p>
        </div>
      </div>

      {/* Right CRT Monitor Showcase (5 Cols on desktop) */}
      <div className="lg:col-span-5 flex justify-center">
        <CrtMonitor />
      </div>
    </div>
  );
}
export default Hero;
