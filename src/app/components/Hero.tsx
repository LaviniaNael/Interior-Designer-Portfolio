import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        const offset = window.scrollY * 0.35;
        imgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#633A2C]">
      {/* Parallax image */}
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1722605090433-41d1183a792d?w=1800&h=1200&fit=crop&auto=format"
          alt="Elegant interior with marble countertops and custom cabinetry"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1110]/20 via-transparent to-[#1A1110]/60" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen pb-16 sm:pb-20 px-6 sm:px-8 md:px-20 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p
            className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Hi, I'm Madonna — Interior Designer
          </motion.p>

          {/* Headline — word-by-word reveal */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-white leading-[1.05]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2.8rem, 8vw, 7rem)",
                fontWeight: 300,
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Homes Designed
              <br />
              <em>to be Lived In</em>
            </motion.h1>
          </div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative overflow-hidden bg-[#B8645C] text-[#EBE3CD] text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              <span className="relative z-10">View Portfolio</span>
              <span className="absolute inset-0 bg-[#984A3D] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </button>
            <Link
              to="/about"
              className="group text-[#DDBEA9] hover:text-white text-xs uppercase tracking-widest pb-0.5 transition-all duration-300 relative"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              About Me
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#DDBEA9] group-hover:bg-white transition-colors duration-300" />
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute right-8 sm:right-10 bottom-20 sm:bottom-24 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <span
            className="text-[#DDBEA9] text-[10px] uppercase tracking-widest rotate-90 origin-center"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px bg-gradient-to-b from-[#DDBEA9] to-transparent"
            animate={{ height: [24, 64, 24] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Est. badge */}
      <motion.div
        className="absolute top-28 sm:top-32 right-8 sm:right-12 hidden lg:block"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="border border-white/20 p-6 max-w-xs hover:border-white/40 transition-colors duration-500">
          <p
            className="text-white/60 text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
          >
            My Journey Since
          </p>
          <p
            className="text-white text-2xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
          >
            2022
          </p>
          <div className="w-8 h-px bg-[#B8645C] my-4" />
          <p
            className="text-white/70 text-xs leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            I've been crafting thoughtful spaces and creative arts across homes and cultural buildings in Egypt.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
