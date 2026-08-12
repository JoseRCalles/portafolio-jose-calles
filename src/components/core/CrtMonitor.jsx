import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export function CrtMonitor() {
  const [powerOn, setPowerOn] = useState(true);
  const [scanlines, setScanlines] = useState(true);
  const [channel, setChannel] = useState(1);
  const [glitching, setGlitching] = useState(false);
  const videoRef = useRef(null);
  const screenRef = useRef(null);

  // Auto-play control on power changes
  useEffect(() => {
    if (videoRef.current) {
      if (powerOn) {
        videoRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [powerOn]);

  // Turn screen on/off animation
  useEffect(() => {
    if (!screenRef.current) return;
    if (powerOn) {
      // Boot up effect
      gsap.killTweensOf(screenRef.current);
      gsap.fromTo(
        screenRef.current,
        { scaleY: 0.01, scaleX: 0.01, filter: "brightness(3) contrast(2)" },
        { scaleY: 1, scaleX: 1, filter: "brightness(1) contrast(1)", duration: 0.6, ease: "power4.out" }
      );
    } else {
      // Shutdown effect (horizontal collapse to single line, then fade)
      gsap.killTweensOf(screenRef.current);
      gsap.to(screenRef.current, {
        scaleY: 0.01,
        filter: "brightness(5) contrast(3)",
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(screenRef.current, { scaleX: 0, opacity: 0.1, duration: 0.15, ease: "power2.in" });
        },
      });
    }
  }, [powerOn]);

  // Manual Glitch Effect
  const triggerGlitch = () => {
    if (!powerOn || glitching) return;
    setGlitching(true);
    setChannel((prev) => (prev % 3) + 1);

    const tl = gsap.timeline({
      onComplete: () => setGlitching(false),
    });

    // Flickers brightness, skew, and offset
    tl.to(screenRef.current, { x: -6, skewX: 5, filter: "hue-rotate(90deg) brightness(2)", duration: 0.05 })
      .to(screenRef.current, { x: 4, skewX: -8, filter: "hue-rotate(180deg) brightness(0.5)", duration: 0.05 })
      .to(screenRef.current, { x: 0, skewX: 0, filter: "none", duration: 0.05 })
      .to(screenRef.current, { y: 3, filter: "contrast(2) saturate(2)", duration: 0.04 })
      .to(screenRef.current, { y: 0, filter: "none", duration: 0.04 })
      .to(screenRef.current, { scaleX: 1.05, scaleY: 0.95, duration: 0.05 })
      .to(screenRef.current, { scaleX: 1, scaleY: 1, duration: 0.05 });
  };

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      {/* Outer Wooden/Plastic Cabinet */}
      <div className="relative p-6 pb-8 bg-neutral-900 border-4 border-neutral-800 rounded-[30px] shadow-2xl flex flex-col items-center">
        {/* Subtle highlights and woodgrain overlay */}
        <div className="absolute inset-1 border-2 border-neutral-700/30 rounded-[26px] pointer-events-none" />

        {/* Outer Screen Bezel */}
        <div className="relative w-full aspect-[4/3] bg-neutral-850 border-8 border-neutral-950 p-4 rounded-[20px] shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
          {/* Inner bezel shadow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none z-10" />

          {/* Screen Content Wrapper */}
          <div
            ref={screenRef}
            className={`relative w-full h-full bg-[#0a0814] rounded-[12px] overflow-hidden ${powerOn ? "crt-flicker" : "opacity-0"
              }`}
            style={{ transformOrigin: "center center" }}
          >
            {/* Screen Glass Curve (Gloss reflection) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/0 to-black/40 pointer-events-none z-30" />
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30 transform -skew-y-6 origin-top-left" />

            {/* Scanlines overlay */}
            {scanlines && <div className="absolute inset-0 crt-screen pointer-events-none z-20 opacity-80" />}
            {scanlines && <div className="scanline-overlay pointer-events-none z-25" />}

            {/* Video Feed */}
            {powerOn && (
              <video
                ref={videoRef}
                src="Monitor_video.mp4"
                className="w-full h-full object-cover scale-102 contrast-110 brightness-95"
                loop
                muted
                playsInline
                autoPlay
              />
            )}

            {/* Simulated Signal Noise / Glitch Bar */}
            {glitching && (
              <div className="absolute left-0 right-0 h-4 bg-white/20 blur-[1px] pointer-events-none z-25 opacity-70 animate-bounce" />
            )}

            {/* AV-1 Channel OSD Indicator */}
            {powerOn && (
              <div className="absolute top-4 left-4 mono-text text-[#39ff14] text-xs font-bold bg-black/60 px-2 py-1 rounded border border-[#39ff14]/30 z-20 phosphor-glow">
                AV-1 CH0{channel}
              </div>
            )}

            {/* NO SIGNAL indicator if powered off */}
            {!powerOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="mono-text text-[#8b8599] text-xs font-semibold">POWER: STANDBY</div>
              </div>
            )}
          </div>
        </div>

        {/* Lower Control Dashboard Panel */}
        <div className="w-full mt-4 px-2 flex justify-between items-center bg-neutral-950 p-3 rounded-xl border border-neutral-800 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]">
          {/* Audio Grille Mock */}
          <div className="flex flex-col gap-1 w-20 opacity-40">
            <div className="h-[2px] bg-neutral-700 w-full" />
            <div className="h-[2px] bg-neutral-700 w-5/6" />
            <div className="h-[2px] bg-neutral-700 w-full" />
            <div className="h-[2px] bg-neutral-700 w-4/5" />
            <div className="h-[2px] bg-neutral-700 w-full" />
            <div className="h-[2px] bg-neutral-700 w-3/4" />
          </div>

          {/* Dials & Buttons Group */}
          <div className="flex items-center gap-4">
            {/* Glitch Dial */}
            <div className="flex flex-col items-center">
              <button
                onClick={triggerGlitch}
                className="w-6 h-6 rounded-full bg-neutral-800 border-2 border-neutral-700 active:scale-95 flex items-center justify-center shadow-lg transition hover:bg-neutral-700"
                title="Glitch / Change Channel"
              >
                <div className="w-1 h-3 bg-neutral-500 rounded-sm transform rotate-45" />
              </button>
              <span className="text-[9px] mono-text mt-1 text-neutral-500">CH</span>
            </div>


            {/* Power Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setPowerOn(!powerOn)}
                className={`w-8 h-8 rounded-full border-2 active:scale-95 transition-all shadow-md flex items-center justify-center ${powerOn
                  ? "bg-red-600 border-red-500 text-white shadow-red-900/40"
                  : "bg-neutral-800 border-neutral-700 text-neutral-500"
                  }`}
                title="Toggle Monitor Power"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
              <span className="text-[9px] mono-text mt-1 text-neutral-500">POWER</span>
            </div>
          </div>
        </div>

        {/* Small Retro Logo/Tag */}
        <div className="absolute bottom-1 right-8 opacity-25">
          <span className="text-[10px] mono-text font-black tracking-wider text-neutral-300">TRINITRON-LOFI</span>
        </div>
      </div>
    </div>
  );
}
export default CrtMonitor;
