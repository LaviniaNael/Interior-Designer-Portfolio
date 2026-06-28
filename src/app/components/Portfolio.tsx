import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X, MapPin, Calendar, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    id: 1,
    title: "Cairo Residential",
    location: "Cairo, Egypt",
    year: "2024",
    style: "Contemporary Classic",
    description:
      "A sweeping open-plan interior design leveraging 3D visualization and AutoCAD to perfect every detail.",
    longDescription:
      "This project involved a complete interior transformation of a 250m² residential apartment in the heart of Cairo. The client wanted a space that felt both modern and timeless — blending clean contemporary lines with warm, classic finishes. Every room was meticulously planned using AutoCAD for spatial accuracy and 3ds Max for photorealistic pre-visualization, allowing the client to experience the space before a single piece of furniture was moved. The result is a home that breathes elegance through its restrained palette of ivory, warm walnut, and brushed gold accents.",
    image:
      "https://images.unsplash.com/photo-1722605090433-41d1183a792d?w=1400&h=900&fit=crop&auto=format",
    size: "large",
    category: "Interior",
    deliverables: ["AutoCAD Floor Plans", "3ds Max Renderings", "Material Selection", "Furniture Sourcing"],
  },
  {
    id: 2,
    title: "Minya Governorate Theater",
    location: "Minya, Egypt",
    year: "2023",
    style: "Theatrical Set",
    description:
      "Stage decoration and bespoke set design creating an immersive environment for local theatrical productions.",
    longDescription:
      "Commissioned by the Minya Governorate cultural authority, this project required designing and building a fully immersive theatrical set for a major regional production. The challenge was to create a visually compelling environment that could transform for multiple scenes using minimal structural changes. Handcrafted props, bespoke painted backdrops, and precise lighting coordination brought the story to life. The production received widespread acclaim from both audiences and critics across the region.",
    image:
      "https://images.unsplash.com/photo-1595521799292-6d27cdb213b1?w=900&h=1200&fit=crop&auto=format",
    size: "tall",
    category: "Stage Design",
    deliverables: ["Concept Design", "Set Construction", "Prop Sourcing", "Lighting Coordination"],
  },
  {
    id: 3,
    title: "Culture Palace Décor",
    location: "Minya, Egypt",
    year: "2023",
    style: "Governmental",
    description:
      "Freelance décor and internal design focused on honoring Egyptian heritage while modernizing cultural public spaces.",
    longDescription:
      "The Minya Culture Palace project was an ambitious undertaking to refresh and revitalize a beloved public cultural institution. The design brief called for a delicate balance — celebrating Egypt's rich artistic heritage while presenting it in a contemporary, accessible way. The outcome features curated display arrangements, bespoke wayfinding elements, and a refined color story drawn from traditional Egyptian pigments adapted for a modern setting.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=600&fit=crop&auto=format",
    size: "medium",
    category: "Décor",
    deliverables: ["Interior Styling", "Display Curation", "Color Consultancy", "Vendor Coordination"],
  },
  {
    id: 4,
    title: "YMCA Handcrafts Gallery",
    location: "Minya, Egypt",
    year: "2022",
    style: "Art & Handcrafts",
    description:
      "A private gallery exhibition showcasing bespoke handcrafts and facilitating children's art games.",
    longDescription:
      "Partnering with the YMCA Minya branch, this project involved designing and curating a temporary gallery space that doubled as an interactive art workshop venue. The space needed to feel welcoming and inspiring for both young children discovering art for the first time and adult visitors appreciating fine handcrafts. Flexible display systems and interactive zones were designed to make art feel tangible, joyful, and accessible to all ages.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&h=600&fit=crop&auto=format",
    size: "medium",
    category: "Workshop",
    deliverables: ["Gallery Design", "Interactive Zones", "Curation", "Workshop Facilitation"],
  },
  {
    id: 5,
    title: "Matiliano Studio Design",
    location: "Cairo, Egypt",
    year: "2023",
    style: "Commercial",
    description:
      "Professional interior design work combining aesthetic appeal with functional workspace solutions.",
    longDescription:
      "During my tenure at Matiliano Design Studio, I contributed to a series of commercial interior projects across Cairo. This included office fit-outs, retail environments, and hospitality spaces — each requiring a unique design language while maintaining brand cohesion. Key responsibilities included space planning, material specification, client presentation, and on-site coordination with contractors to ensure flawless execution.",
    image:
      "https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=1400&h=900&fit=crop&auto=format",
    size: "wide",
    category: "Interior",
    deliverables: ["Space Planning", "Material Specification", "Client Presentations", "Site Coordination"],
  },
  {
    id: 6,
    title: "Children's Creative Arts",
    location: "Minya, Egypt",
    year: "2021",
    style: "Educational",
    description:
      "Interactive art workshops designed for adults and children, supporting human development through creative arts.",
    longDescription:
      "As part of my ongoing volunteer commitment with the Scout movement, I designed and led a series of creative arts workshops across Minya for both children and adults. Each session was carefully structured to introduce participants to different artistic mediums — from painting and collage to basic sculpture — in a supportive, encouraging environment. The curriculum focused on self-expression, fine motor skills, and collaborative creativity, with measurable positive impacts reported by community organizers.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&h=1200&fit=crop&auto=format",
    size: "tall",
    category: "Workshop",
    deliverables: ["Workshop Curriculum", "Materials Preparation", "Group Facilitation", "Progress Reporting"],
  },
];

const filters = ["All", "Interior", "Stage Design", "Décor", "Workshop"];

type Project = (typeof projects)[0];

// ── Project Detail Modal ──────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Lock body scroll and hide nav when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const nav = document.querySelector("nav") as HTMLElement | null;
    if (nav) {
      nav.style.transition = "opacity 0.3s ease";
      nav.style.opacity = "0";
      nav.style.pointerEvents = "none";
    }
    return () => {
      document.body.style.overflow = "";
      if (nav) {
        nav.style.opacity = "1";
        nav.style.pointerEvents = "";
      }
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#2C1E1B]/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 bg-[#E0D6B8] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Close button — light, positioned over the hero image */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors duration-200"
            aria-label="Close project"
          >
            <X size={16} className="text-white" />
          </button>

          {/* Hero image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/7" }} >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E1B]/50 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p
                className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-1"
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
              >
                {project.category} · {project.style}
              </p>
              <h2
                className="text-white"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300 }}
              >
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-10">
            {/* Meta row */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[#D8CDB0]">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#B8645C]" />
                <span className="text-[#633A2C] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {project.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={13} className="text-[#B8645C]" />
                <span className="text-[#633A2C] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {project.year}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={13} className="text-[#B8645C]" />
                <span className="text-[#633A2C] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {project.style}
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
              {/* Long description */}
              <div className="sm:col-span-2">
                <p
                  className="text-[#B8645C] text-xs uppercase tracking-widest mb-4"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
                >
                  About this project
                </p>
                <p
                  className="text-[#633A2C] leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.95rem" }}
                >
                  {project.longDescription}
                </p>
              </div>

              {/* Deliverables */}
              <div>
                <p
                  className="text-[#B8645C] text-xs uppercase tracking-widest mb-4"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
                >
                  Deliverables
                </p>
                <ul className="space-y-2">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B8645C] shrink-0" />
                      <span
                        className="text-[#633A2C] text-sm"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      >
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ── Project Card ──────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      layout
      className={`relative overflow-hidden cursor-pointer group ${
        project.size === "large"
          ? "md:col-span-2 md:row-span-2"
          : project.size === "tall"
          ? "md:row-span-2"
          : project.size === "wide"
          ? "md:col-span-2"
          : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
    >
      <div
        className="relative overflow-hidden bg-[#D8CDB0]"
        style={{
          aspectRatio:
            project.size === "tall"
              ? "3/4"
              : project.size === "large"
              ? "16/9"
              : "4/3",
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[#2C1E1B]"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.55 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 p-6 flex flex-col justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.4, delay: hovered ? 0.1 : 0 }}
        >
          <p
            className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-2"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
          >
            {project.category} · {project.style}
          </p>
          <p
            className="text-white/90 text-sm leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {project.description}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span
              className="text-[#E0D6B8] text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              View Project
            </span>
            <ArrowUpRight size={14} className="text-[#E0D6B8]" />
          </div>
        </motion.div>

        <div className="absolute top-4 right-4">
          <motion.div
            className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center bg-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={14} className="text-white" />
          </motion.div>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3
              className="text-[#2C1E1B] transition-colors duration-300 group-hover:text-[#B8645C]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 400,
                fontSize: "1.1rem",
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-[#633A2C] text-xs mt-0.5"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {project.location} · {project.year}
            </p>
          </div>
          <span
            className="text-[#633A2C] text-xs mt-1"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            0{index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Portfolio Section ─────────────────────────────────────────────
export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <section id="work" className="bg-[#E0D6B8] px-4 sm:px-8 md:px-20 py-16 sm:py-24 max-w-7xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p
              className="text-[#B8645C] text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
            >
              Selected Work
            </p>
            <h2
              className="text-[#2C1E1B] leading-tight"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
              }}
            >
              Interior Projects
              <br />
              <em>2021–2024</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                  activeFilter === f
                    ? "border-[#633A2C] bg-[#633A2C] text-[#E0D6B8] shadow-md transform -translate-y-0.5"
                    : "border-[#D8CDB0] text-[#633A2C] hover:border-[#633A2C] hover:text-[#2C1E1B] hover:bg-black/5"
                }`}
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.12em" }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-3 gap-6 auto-rows-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
