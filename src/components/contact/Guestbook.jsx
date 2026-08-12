import { useState, useEffect, useRef } from "react";

export function Guestbook() {
  const [logs, setLogs] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("STANDBY");
  const logContainerRef = useRef(null);

  // Load logs from localStorage on mount
  useEffect(() => {
    const cachedLogs = localStorage.getItem("jose_portfolio_logs");
    if (cachedLogs) {
      setLogs(JSON.parse(cachedLogs));
    } else {
      // Default initial mock logs
      const defaultLogs = [
        { name: "visitor_alpha", text: "Me encantó la arquitectura de Pedilovo, muy organizada.", date: "2026-08-10 14:22" },
        { name: "recruiter_beta", text: "Excelente combinación de ingeniería y administración. Te escribiré por LinkedIn.", date: "2026-08-11 09:15" },
        { name: "ping_tester", text: "System hardener check output looks beautiful. Keep it up!", date: "2026-08-11 11:45" }
      ];
      setLogs(defaultLogs);
      localStorage.setItem("jose_portfolio_logs", JSON.stringify(defaultLogs));
    }
  }, []);

  // Scroll logs container to bottom on update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || loading) return;

    setLoading(true);
    setStatus("POST_REQUEST");

    // Simulate API pipeline latency
    setTimeout(() => {
      setStatus("VLAN_ROUTING");
      
      setTimeout(() => {
        setStatus("DB_SAVING");
        
        setTimeout(() => {
          const now = new Date();
          const dateStr = now.toISOString().slice(0, 10) + " " + now.toTimeString().slice(0, 5);
          
          const newLog = {
            name: name.trim().toLowerCase().replace(/\s+/g, "_"),
            text: message.trim(),
            date: dateStr
          };

          const updatedLogs = [...logs, newLog];
          setLogs(updatedLogs);
          localStorage.setItem("jose_portfolio_logs", JSON.stringify(updatedLogs));
          
          setName("");
          setMessage("");
          setLoading(false);
          setStatus("SUCCESS");
          
          // Clear status indicator back to standby after a delay
          setTimeout(() => setStatus("STANDBY"), 2000);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="w-full bg-[#050409] border border-border-retro rounded-xl overflow-hidden flex flex-col h-[330px] shadow-2xl relative">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-border-retro">
        <span className="mono-text text-xs text-[#39ff14] phosphor-glow font-black uppercase tracking-wider">DATABASE LOGGER v1.0</span>
        <span className={`mono-text text-[9px] px-2 py-0.5 border rounded uppercase ${
          status === "SUCCESS" ? "border-neon-green text-neon-green" :
          loading ? "border-neon-purple text-neon-purple animate-pulse" : "border-neutral-700 text-neutral-500"
        }`}>
          {status}
        </span>
      </div>

      {/* Log Feed Display */}
      <div ref={logContainerRef} className="flex-grow p-4 overflow-y-auto space-y-3 mono-text text-xs text-neutral-300 leading-relaxed crt-flicker border-b border-border-retro bg-[#030205]">
        {logs.map((log, idx) => (
          <div key={idx} className="border-b border-neutral-900 pb-2">
            <div className="flex justify-between items-center text-neutral-500 text-[9px]">
              <span>[{log.date}] {log.name}@guest_shell</span>
              <span>INDEX_00{idx + 1}</span>
            </div>
            <div className="text-neutral-200 mt-1 pl-2 border-l border-neon-cyan/40">
              "{log.text}"
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-neon-purple animate-pulse italic">
            {status === "POST_REQUEST" && ">> [SYS_LOG] POST guest message packet..."}
            {status === "VLAN_ROUTING" && ">> [CISCO_IOS] Routing traffic through VLAN 20 backend..."}
            {status === "DB_SAVING" && ">> [POSTGRES] Executing INSERT INTO guestbook_logs..."}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-neutral-950 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Username / Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
            className="w-1/3 bg-[#0c0a15] border border-border-retro rounded px-2.5 py-1.5 mono-text text-xs text-neutral-300 outline-none focus:border-neon-cyan/60"
          />
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            required
            className="w-2/3 bg-[#0c0a15] border border-border-retro rounded px-2.5 py-1.5 mono-text text-xs text-neutral-300 outline-none focus:border-neon-cyan/60"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !name.trim() || !message.trim()}
          className={`mono-text text-[10px] font-black uppercase py-2 border rounded cursor-pointer transition-colors active:scale-98 ${
            loading || !name.trim() || !message.trim()
              ? "border-neutral-850 text-neutral-600 bg-neutral-900 cursor-not-allowed"
              : "border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_10px_rgba(0,240,255,0.3)]"
          }`}
        >
          {loading ? "SENDING PACKET..." : "SUBMIT LOG DATA"}
        </button>
      </form>
    </div>
  );
}
export default Guestbook;
