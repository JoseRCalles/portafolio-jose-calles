import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function BiosBoot({ onComplete }) {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  const bootScript = [
    "JOSÉ CALLES SOFTWARE BIOS V4.0.2 (C) 2026",
    "--------------------------------------------------",
    "CPU: PYTHON/FASTAPI CORE AT 3.80GHz",
    "RAM: 64MB MOBILE ENGINE CACHE",
    "SYSTEM SECURITY STATE: OWASP COMPLIANT",
    " ",
    "RUNNING COMPONENT TESTS:",
    "  - DART ENGINE ENGINE INITIALIZATION..... OK",
    "  - FLUTTER MULTIPLATFORM FRAMEWORK....... OK",
    "  - FASTAPI ASYNC ROUTER SETUP............ OK",
    "  - SUPABASE REALTIME GRAPH SUBSYSTEM..... OK",
    "  - CISCO IOS PORTS PROTOCOL HANDSHAKE.... OK",
    " ",
    "SYSTEM MEMORY ALLOCATION: 65,536KB PASS",
    "NETWORKING INTERFACES (VLAN 10, 20): SHUT DOWN CHECK OK",
    "API GATEWAY SECURED BY ISO27001 STANDARDS",
    " ",
    "BOOT SEQUENCE EXECUTING...",
    "SUCCESS: MAIN COMPONENT BOOT COMPLETED.",
    " ",
    "READY: LAUNCHING PORTFOLIO SHELL..."
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Automatically proceed after 0.5s once typing completes
        gsap.delayedCall(0.5, handleBootFinish);
      }
    });

    // Populate lines sequentially with typewriter delay
    bootScript.forEach((line, index) => {
      tl.call(() => {
        setLines((prev) => [...prev, line]);
        
        // Scroll boot terminal container to bottom automatically
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, null, index * 0.12);
    });

    return () => tl.kill();
  }, []);

  const handleBootFinish = () => {
    // Flash white screen glitch before fading out
    const flash = document.createElement("div");
    flash.className = "fixed inset-0 bg-white z-[99999] pointer-events-none opacity-0";
    document.body.appendChild(flash);

    gsap.timeline({
      onComplete: () => {
        flash.remove();
        onComplete();
      }
    })
    .to(flash, { opacity: 0.8, duration: 0.05, yoyo: true, repeat: 1 })
    .to(containerRef.current, {
      scaleY: 0,
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut"
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#030205] text-[#33ff33] p-8 md:p-16 overflow-y-auto z-[9999] crt-screen crt-flicker flex flex-col justify-between select-none"
    >
      <div className="scanline-overlay" />
      
      {/* Console Output */}
      <div className="max-w-4xl mx-auto w-full mono-text text-sm md:text-base leading-relaxed tracking-wider phosphor-glow flex-grow">
        {lines.map((line, i) => (
          <div key={i} className="min-h-[1.5rem] whitespace-pre-wrap">
            {line}
          </div>
        ))}
        {/* Blinking block cursor */}
        <span className="inline-block w-2.5 h-4 bg-[#33ff33] animate-pulse ml-1" />
      </div>

      {/* Footer / Bypass Button */}
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center border-t border-[#33ff33]/30 pt-6 mt-8 mono-text text-xs text-[#33ff33]/60">
        <div>SYSTEM: PORTFOLIO-V4 // CORO-VE</div>
        <button
          onClick={handleBootFinish}
          className="px-4 py-2 border border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33] hover:text-black font-semibold rounded cursor-pointer transition-colors duration-150 animate-pulse active:scale-95"
        >
          [ SKIP BOOT_ ]
        </button>
      </div>
    </div>
  );
}
export default BiosBoot;
