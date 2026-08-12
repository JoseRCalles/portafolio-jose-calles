import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export function NetworkHardener() {
  const [auditing, setAuditing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [auditComplete, setAuditComplete] = useState(false);

  // Ref al contenedor interno de logs en lugar del nodo final
  const logsContainerRef = useRef(null);

  // Auto scroll interno únicamente dentro de la caja de terminal
  useEffect(() => {
    if (logs.length > 0 && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const auditSteps = [
    { log: "[VLAN_MGMT] Resolving virtual route tables...", delay: 500, p: 20 },
    { log: "[VLAN_MGMT] Router interfaces VLAN 10 (MOBILE), VLAN 20 (BACKEND)... OK", delay: 1000, p: 35 },
    { log: "[CISCO_IOS] Deploying Standard ACL 101 rules: Deny WAN direct DB traffic... SECURED", delay: 1500, p: 50 },
    { log: "[OWASP_AUDIT] Reviewing FastAPI request schemas against injection vectors... PASS", delay: 2000, p: 70 },
    { log: "[ISO_27001] Auditing asset access logs and user permission tokens... VERIFIED", delay: 2500, p: 85 },
    { log: "[HARDENING] Applying HTTP security headers (HSTS, CSP, X-Frame-Options)... LOADED", delay: 3000, p: 95 },
    { log: "[SUCCESS] System audit complete: 100% Hardened against external threats.", delay: 3500, p: 100 }
  ];

  const runAudit = () => {
    if (auditing) return;
    setAuditing(true);
    setAuditComplete(false);
    setProgress(0);
    setLogs(["[AUDITOR] Starting ISO 27001 Cisco IOS & OWASP compliance audit..."]);

    auditSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step.log]);
        setProgress(step.p);

        if (idx === auditSteps.length - 1) {
          setAuditComplete(true);
          setAuditing(false);
        }
      }, step.delay);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-bg-panel/40 border border-border-retro rounded-xl p-6 relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 p-1.5 mono-text text-[9px] text-neutral-600 bg-neutral-900 border-l border-b border-border-retro">
        SYS_HARDENER
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left Side: Cisco topology simulation */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 bg-neutral-950/60 border border-border-retro rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(170,59,255,0.05)_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          <div className="mono-text text-[10px] text-neutral-500 mb-4 uppercase">Network Topology</div>

          <div className="flex flex-col items-center gap-6 relative z-10 w-full">
            <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-400 rounded mono-text text-[10px] w-28 text-center shadow-md">
              WAN (INTERNET)
            </div>

            <div className="w-[1.5px] h-6 bg-gradient-to-b from-neutral-600 to-neon-purple" />

            <div className={`px-3 py-1.5 bg-neutral-900 border text-center rounded mono-text text-[10px] w-28 shadow-md transition-all duration-300 ${auditComplete ? "border-neon-green text-neon-green phosphor-glow" : "border-neon-purple text-neon-purple phosphor-glow-purple"
              }`}>
              CISCO ACL FIREWALL
            </div>

            <div className="w-[1.5px] h-6 bg-gradient-to-b from-neon-purple to-neon-cyan" />

            <div className="flex justify-between w-full max-w-[200px]">
              <div className="px-2 py-1 bg-neutral-900 border border-neon-cyan text-neon-cyan text-[9px] mono-text rounded shadow">
                VLAN 10: APP
              </div>
              <div className="px-2 py-1 bg-neutral-900 border border-neon-cyan text-neon-cyan text-[9px] mono-text rounded shadow">
                VLAN 20: BACK
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Audit Terminal Logs */}
        <div className="w-full md:w-2/3 flex flex-col justify-between h-[220px]">
          {/* Terminal Display */}
          <div
            ref={logsContainerRef}
            className="flex-grow bg-[#040307] border border-border-retro rounded p-3 overflow-y-auto font-mono text-[11px] leading-relaxed text-neutral-400 max-h-[160px] crt-flicker"
          >
            {logs.length === 0 ? (
              <div className="text-neutral-600 italic">Audit system offline. Click button below to run security audit.</div>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={log.includes("[SUCCESS]") ? "text-neon-green font-bold" : log.includes("[INFO]") ? "text-neon-cyan" : "text-neutral-300"}
                >
                  {log}
                </div>
              ))
            )}
          </div>

          {/* Audit Execution controls */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:flex-grow">
              <div className="flex justify-between items-center text-[10px] mono-text text-neutral-500 uppercase mb-1">
                <span>AUDIT PROCESS: {progress}%</span>
                <span className={auditComplete ? "text-neon-green" : auditing ? "text-neon-purple" : ""}>
                  {auditComplete ? "SECURED" : auditing ? "SCANNING" : "STANDBY"}
                </span>
              </div>
              <div className="h-2 bg-neutral-900 border border-border-retro rounded overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${auditComplete ? "bg-neon-green shadow-[0_0_8px_rgba(57,255,20,0.5)]" : "bg-neon-purple"
                    }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                runAudit();
              }}
              disabled={auditing}
              className={`mono-text text-[11px] font-black uppercase px-4 py-2 border rounded cursor-pointer whitespace-nowrap active:scale-95 transition-all duration-150 ${auditing
                  ? "border-neutral-700 text-neutral-600 bg-neutral-900 cursor-not-allowed"
                  : "border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-black hover:shadow-[0_0_12px_rgba(170,59,255,0.4)]"
                }`}
            >
              {auditing ? "AUDITING..." : "RUN SYSTEM AUDIT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkHardener;