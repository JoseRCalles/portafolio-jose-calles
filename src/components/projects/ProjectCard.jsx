export function ProjectCard({
  id,
  title,
  subtitle,
  description,
  bullets = [],
  tags = [],
  gridSpan = "col-span-1",
  colorTheme = "purple", // purple, cyan, green, yellow
}) {
  const themeStyles = {
    purple: {
      border: "border-neon-purple/20 hover:border-neon-purple/60 hover:shadow-[0_0_20px_rgba(170,59,255,0.2)]",
      badge: "bg-neon-purple/10 border-neon-purple/30 text-neon-purple",
      text: "text-neon-purple",
      iconColor: "text-neon-purple/70",
    },
    cyan: {
      border: "border-neon-cyan/20 hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
      badge: "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan",
      text: "text-neon-cyan",
      iconColor: "text-neon-cyan/70",
    },
    green: {
      border: "border-neon-green/20 hover:border-neon-green/60 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)]",
      badge: "bg-neon-green/10 border-neon-green/30 text-neon-green",
      text: "text-neon-green",
      iconColor: "text-neon-green/70",
    },
    yellow: {
      border: "border-yellow-500/20 hover:border-yellow-500/60 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]",
      badge: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      text: "text-yellow-400",
      iconColor: "text-yellow-500/70",
    },
  };

  const style = themeStyles[colorTheme] || themeStyles.purple;

  return (
    <div
      className={`glass-panel p-6 rounded-xl border flex flex-col justify-between transition-all duration-300 bg-bg-panel/20 relative overflow-hidden group ${gridSpan} ${style.border}`}
    >
      {/* Index Tag */}
      <div className="absolute top-0 right-0 p-1.5 mono-text text-[9px] text-neutral-600 bg-neutral-900 border-l border-b border-border-retro font-bold">
        {id}
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div>
          <span className={`mono-text text-[10px] font-black uppercase tracking-widest ${style.text}`}>
            {subtitle}
          </span>
          <h3 className="text-xl md:text-2xl font-black uppercase text-text-bright tracking-wide group-hover:text-white transition-colors mt-1">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-text-muted leading-relaxed">
          {description}
        </p>

        {/* Bullets List */}
        {bullets.length > 0 && (
          <ul className="space-y-2 text-xs text-neutral-400 pl-4 border-l border-border-retro">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="relative before:content-['›'] before:absolute before:-left-3 before:text-neutral-500">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tech Badges / Footer */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-6 border-t border-border-retro/40 pt-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`mono-text text-[9px] font-semibold px-2 py-0.5 rounded border ${style.badge}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
export default ProjectCard;
