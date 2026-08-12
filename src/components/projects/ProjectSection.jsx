import { BentoGrid } from "./PorjectGrid";
import { ProjectCard } from "./ProjectCard";

export function BentoSection() {
  const projects = [
    {
      id: "PROJ_01",
      title: "PEDILOVO — Logística & E-Commerce",
      subtitle: "Software Engineer | 2024 – Presente",
      description: "Plataforma mobile de logística y e-commerce basada en microservicios y API Gateways para separar responsabilidades y facilitar la evolución del sistema.",
      bullets: [
        "Diseñé la arquitectura móvil utilizando Clean Architecture.",
        "Desarrollé la integración con múltiples proveedores para gestionar catálogos dinámicos.",
        "Organicé código compartido y dependencias mediante un monorepo administrado con Melos."
      ],
      tags: ["Flutter", "Dart", "Python", "FastAPI", "Microservicios", "Supabase", "Melos"],
      gridSpan: "col-span-1 lg:col-span-2",
      colorTheme: "purple",
    },
    {
      id: "PROJ_02",
      title: "RUTEA — Rastreo & Geolocalización",
      subtitle: "Mobile Developer | 2024",
      description: "Aplicación mobile para la consulta de rutas de transporte local mediante geolocalización y APIs de mapas.",
      bullets: [
        "Implementé un algoritmo de búsqueda tokenizada multipalabra para mejorar consultas.",
        "Optimicé la estructura de widgets para mantener interfaces fluidas con mapas."
      ],
      tags: ["Flutter", "Dart", "Map APIs", "Geolocalización", "Algoritmos"],
      gridSpan: "col-span-1",
      colorTheme: "cyan",
    },
    {
      id: "PROJ_03",
      title: "HIDROFALCÓN — Control de Activos",
      subtitle: "Full-Stack Developer | 2023",
      description: "Plataforma web centralizada para la gestión, asignación y desincorporación de activos de infraestructura pública.",
      bullets: [
        "Automaticé auditorías de bienes, reduciendo en 40% los tiempos manuales.",
        "Implementé mecanismos de trazabilidad y registro de operaciones por usuario."
      ],
      tags: ["PHP", "JavaScript", "HTML5", "CSS3", "MySQL"],
      gridSpan: "col-span-1",
      colorTheme: "yellow",
    },
    {
      id: "PROJ_04",
      title: "UPTAG — Inventario Médico",
      subtitle: "Full-Stack Developer | 2022 – 2023",
      description: "Plataforma para el control de insumos médicos y seguimiento preventivo de existencias en almacenes.",
      bullets: [
        "Implementé alertas para identificar productos próximos a expirar.",
        "Diseñé bases de datos para mantener la consistencia del stock."
      ],
      tags: ["JavaScript", "PHP", "HTML5", "MySQL"],
      gridSpan: "col-span-1",
      colorTheme: "purple",
    },
    {
      id: "PROJ_05",
      title: "ADMINISTRATIVE VISION",
      subtitle: "Lic. Administración (UNESR)",
      description: "Mi formación complementaria en Administración de Empresas me permite comprender los aspectos operativos, financieros y de negocio detrás de un desarrollo técnico.",
      bullets: [
        "Capacidad de traducir requerimientos comerciales en soluciones de código óptimo.",
        "Atención al retorno de inversión (ROI) y tiempos de entrega de proyectos."
      ],
      tags: ["Administración", "Finanzas", "Procesos", "Análisis de Negocio"],
      gridSpan: "col-span-1",
      colorTheme: "green",
    },
    {
      id: "PROJ_06",
      title: "INGENIERÍA & IDIOMAS",
      subtitle: "UPTAG Graduado & English C1",
      description: "Graduado de Ingeniería Informática y T.S.U. en Informática. Nivel de inglés avanzado enfocado en la lectura de especificaciones técnicas, arquitectura y documentación profesional.",
      bullets: [
        "T.S.U. en Informática (UPTAG, 2022 – 2024)",
        "Inglés Técnico Profesional: Lectura fluida, escritura de documentación y comunicación escrita empresarial."
      ],
      tags: ["Ingeniería Informática", "Inglés Avanzado", "Arquitectura"],
      gridSpan: "col-span-1 lg:col-span-2",
      colorTheme: "cyan",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl font-black uppercase text-text-bright tracking-wider">
          RACK DE PROYECTOS
        </h2>
        <p className="mono-text text-xs text-neutral-500 uppercase tracking-widest">
          Presentación asimétrica que muestra la entrega de software de ingeniería central
        </p>
      </div>

      <BentoGrid>
        {projects.map((proj, idx) => (
          <ProjectCard
            key={idx}
            id={proj.id}
            title={proj.title}
            subtitle={proj.subtitle}
            description={proj.description}
            bullets={proj.bullets}
            tags={proj.tags}
            gridSpan={proj.gridSpan}
            colorTheme={proj.colorTheme}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
export default BentoSection;
