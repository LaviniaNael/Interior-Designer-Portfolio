import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Dynamically import all images from ../work/ directory (re-triggered glob)
// @ts-ignore
const imageModules = import.meta.glob('../work/**/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}', { eager: true }) as Record<string, any>;

interface GalleryItem {
  id: string;
  src: string;
  category: string;
  fileName: string;
}

const categoryDisplayNameMap: Record<string, string> = {
  kitchen: "Kitchens",
  dressing: "Dressing Rooms",
};

const getCategoryDisplayName = (cat: string) => {
  if (cat === "All") return "All";
  return categoryDisplayNameMap[cat.toLowerCase()] || (cat.charAt(0).toUpperCase() + cat.slice(1).replace(/[-_]/g, ' '));
};

// Parse and format items
const galleryItems: GalleryItem[] = Object.entries(imageModules).map(([path, mod]: [string, any]) => {
  const parts = path.split('/');
  const category = parts[parts.length - 2] || "Other";
  const fileName = parts[parts.length - 1] || "";
  return {
    id: path,
    src: mod.default || mod,
    category,
    fileName,
  };
});

// Sort items numerically/alphabetically so order is always stable
galleryItems.sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: 'base' }));

// Get unique categories present in the images folders
const rawCategories = Array.from(new Set(galleryItems.map(item => item.category)));
const filters = ["All", ...rawCategories];

// ── Lightbox Modal ──────────────────────────────────────────────────
interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ items, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const currentItem = items[currentIndex];

  // Disable background scrolling while lightbox is active
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose]);

  if (!currentItem) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1110]/95 backdrop-blur-md select-none">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 z-10" onClick={onClose} />

      {/* Header Info (Left) */}
      <div className="absolute top-6 left-6 z-20 text-[#E0D6B8] font-[Jost] text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3">
        <span className="font-medium text-white">{getCategoryDisplayName(currentItem.category)}</span>
        <span className="text-white/40">|</span>
        <span className="text-white/60">{currentIndex + 1} of {items.length}</span>
      </div>

      {/* Close button (Right) */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 cursor-pointer"
        aria-label="Close gallery"
      >
        <X size={20} />
      </button>

      {/* Main Image Viewport */}
      <div className="relative z-20 max-w-[90vw] max-h-[82vh] sm:max-h-[85vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentItem.id}
            src={currentItem.src}
            alt={currentItem.fileName}
            className="max-w-full max-h-[80vh] sm:max-h-[83vh] object-contain rounded-sm shadow-2xl select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (Desktop on the sides, responsive) */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 cursor-pointer shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 cursor-pointer shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </div>,
    document.body
  );
}

// ── Portfolio Section ─────────────────────────────────────────────
interface PortfolioProps {
  isHomepage?: boolean;
}

export function Portfolio({ isHomepage = false }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Filter gallery items
  const baseItems = isHomepage ? galleryItems.slice(0, 8) : galleryItems;
  const filteredItems =
    isHomepage || activeFilter === "All"
      ? baseItems
      : baseItems.filter((item) => item.category === activeFilter);

  // Navigation handlers for Lightbox
  const handleNext = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  return (
    <>
      <section id="work" className="bg-[#E0D6B8] px-4 sm:px-8 md:px-20 py-16 sm:py-24 max-w-7xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
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
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 300,
              }}
            >
              Design Gallery
            </h2>
          </div>
          
          {/* Only show filters if NOT on the homepage preview */}
          {!isHomepage && (
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setActiveFilter(f);
                    setSelectedImageIndex(null); // Close lightbox if open on change
                  }}
                  className={`text-xs uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                    activeFilter === f
                      ? "border-[#633A2C] bg-[#633A2C] text-[#E0D6B8] shadow-md transform -translate-y-0.5"
                      : "border-[#D8CDB0] text-[#633A2C] hover:border-[#633A2C] hover:text-[#2C1E1B] hover:bg-black/5"
                  }`}
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.12em" }}
                >
                  {getCategoryDisplayName(f)}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Gallery Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance] w-full">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-xl bg-[#D8CDB0]/40 border border-[#D8CDB0]/30 shadow-sm hover:shadow-lg transition-all duration-500"
                onClick={() => setSelectedImageIndex(idx)}
              >
                {/* Image */}
                <div className="w-full relative overflow-hidden bg-[#D8CDB0]/10">
                  <img
                    src={item.src}
                    alt={item.fileName}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-[#2C1E1B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                    {/* Top Right Expand Icon */}
                    <div className="self-end bg-[#E0D6B8]/90 p-2.5 rounded-full backdrop-blur-sm transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                      <Maximize2 size={14} className="text-[#2C1E1B]" />
                    </div>

                    {/* Bottom Left Info */}
                    <div className="transform translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[#DDBEA9] text-[9px] uppercase tracking-widest block font-medium">
                        {getCategoryDisplayName(item.category)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* See More Work Button for Homepage */}
        {isHomepage && (
          <div className="flex justify-center mt-12">
            <Link
              to="/work"
              className="group relative overflow-hidden bg-[#B8645C] text-[#EBE3CD] text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 cursor-pointer shadow-md"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              <span className="relative z-10">See More Work</span>
              <span className="absolute inset-0 bg-[#984A3D] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <Lightbox
            items={filteredItems}
            currentIndex={selectedImageIndex}
            onClose={() => setSelectedImageIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}
