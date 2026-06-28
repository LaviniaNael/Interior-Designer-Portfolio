import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    quote:
      "Madonna has an incredible ability to transform theoretical knowledge into beautiful, tangible spaces. Her work on our cultural building honored our heritage while giving it a fresh, modern breath of life.",
    author: "Governmental Official",
    location: "Minya, Egypt",
    project: "Culture Palace Décor",
    image: "https://images.unsplash.com/photo-1725257928373-dc6d2ac7b145?w=800&h=500&fit=crop&auto=format",
  },
  {
    quote:
      "The set she designed for our theatrical production was breathtaking. Madonna managed every detail with calm precision, creating an immersive environment that truly elevated our performance.",
    author: "Theater Director",
    location: "Minya Governorate",
    project: "Stage Decoration",
    image: "https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=800&h=500&fit=crop&auto=format",
  },
  {
    quote:
      "My children absolutely love her art workshops. Madonna doesn't just teach art; she uses it as a tool for human development and creative expression. The impact on our community has been profound.",
    author: "Parent from YMCA",
    location: "Minya, Egypt",
    project: "Creative Arts Workshop",
    image: "https://images.unsplash.com/photo-1643949915134-73a4c880f7c7?w=800&h=500&fit=crop&auto=format",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };
  const next = () => {
    setDirection(1);
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const t = testimonials[active];

  return (
    <section className="bg-[#EBE3CD] px-6 sm:px-8 md:px-20 py-16 sm:py-24 border-t border-[#D8CDB0]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-[#B8645C] text-xs uppercase tracking-widest mb-12 sm:mb-16"
          style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Client Stories
        </motion.p>

        <div className="grid md:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Image */}
          <motion.div
            className="md:col-span-6 relative overflow-hidden"
            style={{ aspectRatio: "4/3" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={active}
                src={t.image}
                alt={t.project}
                className="w-full h-full object-cover absolute inset-0"
                custom={direction}
                initial={{ opacity: 0, x: direction * 60, scale: 1.05 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -60, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110]/30 to-transparent pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute bottom-5 left-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p
                  className="text-white/80 text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                >
                  {t.project}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Quote */}
          <motion.div
            className="md:col-span-5 md:col-start-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="text-[#B8645C] mb-6"
              style={{ fontFamily: "'Fraunces', serif", fontSize: "4rem", lineHeight: 1, fontWeight: 300 }}
            >
              "
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote
                  className="text-[#633A2C] leading-relaxed mb-8"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                    fontWeight: 300,
                  }}
                >
                  {t.quote}
                </blockquote>
                <div className="w-8 h-px bg-[#B8645C] mb-6" />
                <p
                  className="text-[#2C1E1B]"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "1rem" }}
                >
                  {t.author}
                </p>
                <p
                  className="text-[#A87C70] text-xs mt-1"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {t.location}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 border border-[#DDBEA9] flex items-center justify-center text-[#A87C70] hover:border-[#633A2C] hover:text-[#2C1E1B] hover:bg-[#633A2C]/5 transition-all duration-200 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > active ? 1 : -1);
                      setActive(i);
                    }}
                    className={`h-px transition-all duration-400 ${
                      i === active ? "bg-[#B8645C] w-8" : "bg-[#DDBEA9] w-4 hover:bg-[#A87C70]"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 border border-[#DDBEA9] flex items-center justify-center text-[#A87C70] hover:border-[#633A2C] hover:text-[#2C1E1B] hover:bg-[#633A2C]/5 transition-all duration-200 group"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
