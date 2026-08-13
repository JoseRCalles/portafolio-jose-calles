import { useState } from "react";
import { Guestbook } from "./Guestbook";

export function ContactPanel() {
  const [shutterOpen, setShutterOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl font-black uppercase text-text-bright tracking-wider">
          TERMINAL DE COMUNICACIÓN
        </h2>
        <p className="mono-text text-xs text-neutral-500 uppercase tracking-widest">
          Establece un puente de red o vuelca registros de base de datos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: 3.5" Floppy Disk Mockup */}
        <div className="flex flex-col items-center">
          <div
            onMouseEnter={() => setShutterOpen(true)}
            onMouseLeave={() => setShutterOpen(false)}
            className="w-[320px] h-[330px] bg-neutral-900 border-4 border-neutral-800 rounded-lg p-5 flex flex-col justify-between shadow-2xl relative select-none transition-all duration-300 hover:scale-103"
          >
            {/* Top bevel indent */}
            <div className="absolute top-0 left-6 right-6 h-2 bg-neutral-950 rounded-b-md" />
            {/* Write protect notch */}
            <div className="absolute bottom-0 right-6 w-5 h-5 bg-neutral-980 border-t-2 border-l-2 border-neutral-850" />

            {/* Metal Shutter sliding block */}
            <div className="w-full h-18 bg-neutral-950 rounded-md border border-neutral-800 flex items-center px-4 justify-between relative overflow-hidden">
              <span className="mono-text text-[9px] text-neutral-600 uppercase font-black tracking-widest">3.5" FLOPPY DISK</span>

              {/* Shutter Slider */}
              <div
                className="absolute right-8 top-1 bottom-1 w-20 bg-neutral-700 border-2 border-neutral-500 rounded flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer"
                style={{ transform: shutterOpen ? "translateX(-90px)" : "translateX(0)" }}
              >
                <div className="w-1.5 h-12 bg-neutral-800 rounded-sm" />
                <div className="w-1.5 h-12 bg-neutral-850 rounded-sm ml-1" />
              </div>

              {/* Shutter exposed magnetic disk mock (hidden behind) */}
              <div className="absolute right-12 top-4 w-12 h-10 bg-black rounded-full border-4 border-neutral-900 flex items-center justify-center opacity-40">
                <div className="w-4 h-4 bg-yellow-600 rounded-full" />
              </div>
            </div>

            {/* Sticker Label with writing */}
            <div className="w-full bg-white text-neutral-900 p-4 rounded-md border border-neutral-200 flex flex-col gap-3 shadow-md flex-grow mt-5">
              {/* Sticker header */}
              <div className="border-b border-red-200 pb-2 flex justify-between items-center">
                <span className="mono-text text-[10px] font-bold text-red-600 uppercase tracking-widest">HD SYSTEM FILE</span>
                <span className="mono-text text-[9px] text-neutral-400">1.44MB</span>
              </div>

              {/* Sticker Content list */}
              <div className="mono-text text-xs space-y-1.5 text-neutral-800">
                <div>
                  <span className="font-bold text-neutral-500">SYS_ENG:</span> J.R. CALLES
                </div>
                <div>
                  <span className="font-bold text-neutral-500">EMAIL:</span>{" "}
                  <a href="mailto:joserafaelcalles@gmail.com" className="hover:underline hover:text-purple-600 font-semibold break-all">
                    joserafaelcalles@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-bold text-neutral-500">GIT:</span>{" "}
                  <a href="https://github.com/JoseRCalles" target="_blank" rel="noreferrer" className="hover:underline hover:text-purple-600 font-semibold">
                    JoseRCalles
                  </a>
                </div>
                <div className="truncate">
                  <span className="font-bold text-neutral-500">IN:</span>{" "}
                  <a href="https://linkedin.com/in/JoseRCalles" target="_blank" rel="noreferrer" className="hover:underline hover:text-purple-600 font-semibold">
                    linkedin.com/in/JoseRCalles
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Guestbook */}
        <div className="w-full flex flex-col justify-center">
          <Guestbook />
        </div>
      </div>
    </div>
  );
}
export default ContactPanel;
