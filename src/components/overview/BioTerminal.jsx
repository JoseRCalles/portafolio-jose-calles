import { useState, useRef, useEffect } from "react";

export function BioTerminal() {
  const [history, setHistory] = useState([
    { text: "JOSÉ CALLES DEBIAN SHELL v1.0.0", type: "system" },
    { text: "Type 'help' to see available commands or click the links below.", type: "system" },
    { text: " ", type: "system" }
  ]);
  const [inputVal, setInputVal] = useState("");

  // Ref al contenedor interno con scroll
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Mueve el scroll internamente sin afectar la ventana principal
  useEffect(() => {
    if (history.length > 3 && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: {
      description: "List all commands",
      exec: () => [
        "Available commands:",
        "  about     - Brief professional profile",
        "  skills    - Core language & framework stack",
        "  values    - Business & engineering value I bring",
        "  projects  - Outstanding projects summary",
        "  contact   - Contact email, LinkedIn, and phone",
        "  clear     - Wipe screen logs"
      ],
    },
    about: {
      description: "About me",
      exec: () => [
        "PROFILE SUMMARY:",
        "Ingeniero de Software. Specialized in backend architectures and mobile applications.",
        "Main stack revolves around Python (FastAPI, Django) and Dart (Flutter).",
        "Dual profile: Complementary business background in Administration of Empresas,",
        "allowing technical solutions to match operational and commercial goals.",
      ],
    },
    skills: {
      description: "Show skills",
      exec: () => [
        "TECHNICAL STACK:",
        "  Languages:   Python, Dart, PHP, JavaScript, SQL",
        "  Backend:     FastAPI, Django, WebSockets, API Gateways, REST APIs",
        "  Mobile/FE:  Flutter (GoRouter, Provider, GetIt, Melos), React, TailwindCSS",
        "  Databases:   PostgreSQL, MySQL, SQLite, Supabase (Auth, DB, Storage)",
        "  Networking:  VLANs, ACLs, Cisco Device Hardening, OWASP Top 10, ISO 27001",
      ],
    },
    values: {
      description: "Value I bring",
      exec: () => [
        "BUSINESS VALUE & METHODOLOGIES:",
        "  1. End-to-End Delivery: Design architecture, build mobile UIs, write fast APIs.",
        "  2. Scale & Quality: Implement Clean Architecture and SOLID modular designs.",
        "  3. Security & Audits: ISO 27001 auditing parameters, Cisco network security.",
        "  4. Analytical Mindset: Business degree background for business-to-code translations.",
      ],
    },
    projects: {
      description: "Key projects",
      exec: () => [
        "HIGHLIGHTED PROJECTS:",
        "  - PEDILOVO: Logistic & E-Commerce Mobile Platform (FastAPI, Flutter, Supabase)",
        "  - RUTEA: Geolocalized Routing Engine (Flutter, Map APIs, Tokenized Search)",
        "  - HIDROFALCÓN: Public asset inventory management system (PHP, MySQL) - Reduced audit times by 40%",
        "  - UPTAG: Preventative Medical Stock Tracker (JavaScript, PHP, MySQL)",
      ],
    },
    contact: {
      description: "Contact channels",
      exec: () => [
        "GET IN TOUCH:",
        "  - Location:  Coro, Falcón, Venezuela",
        "  - Phone:     (+58) 412-8566352",
        "  - Email:     joserafaelcalles@gmail.com",
        "  - GitHub:    github.com/JoseRCalles",
        "  - LinkedIn:  linkedin.com/in/JoseRCalles",
      ],
    },
  };

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();

    if (trimmed === "") return;

    const userLine = { text: `guest@josecalles-dev:~$ ${cmdStr}`, type: "user" };

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let responseLines = [];
    if (commands[trimmed]) {
      responseLines = commands[trimmed].exec();
    } else {
      responseLines = [
        `bash: command not found: ${cmdStr}.`,
        "Type 'help' to check available commands."
      ];
    }

    setHistory((prev) => [
      ...prev,
      userLine,
      ...responseLines.map((line) => ({ text: line, type: "response" })),
      { text: " ", type: "spacing" }
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full max-w-4xl mx-auto terminal-window border border-border-retro rounded-xl mt-12 flex flex-col h-[400px] text-left select-text cursor-text"
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-border-retro">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="mono-text text-xs text-neutral-500 uppercase font-black tracking-widest">
          bash - guest@jose-calles-dev
        </span>
        <div className="w-12" />
      </div>

      {/* Terminal Display */}
      <div
        ref={terminalBodyRef}
        className="flex-grow p-4 overflow-y-auto space-y-1.5 mono-text text-xs md:text-sm text-neutral-300 leading-relaxed crt-flicker"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`min-h-[1.2rem] whitespace-pre-wrap ${line.type === "user"
              ? "text-neon-cyan font-bold"
              : line.type === "system"
                ? "text-neon-purple/70"
                : "text-neutral-300"
              }`}
          >
            {line.text}
          </div>
        ))}

        {/* Input Prompter */}
        <div className="flex items-center text-neon-cyan">
          <span className="font-bold">guest@josecalles-dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent border-none outline-none text-neutral-200 font-mono caret-neon-cyan text-xs md:text-sm"
          />
        </div>
      </div>

      {/* Suggestion Shortcuts / Hotkeys */}
      <div
        className="bg-neutral-950 px-4 py-3 border-t border-border-retro flex flex-wrap gap-2.5 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[10px] mono-text text-neutral-600 font-bold uppercase">Click to Run:</span>
        {Object.keys(commands).map((key) => (
          <button
            key={key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              executeCommand(key);
            }}
            className="text-[11px] mono-text px-2 py-1 bg-neutral-900 border border-border-retro text-neon-cyan rounded hover:bg-neon-cyan hover:text-black hover:border-neon-cyan cursor-pointer transition-colors duration-150 active:scale-95"
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BioTerminal;