import { motion } from "motion/react";
import { useRef } from "react";
import donnaImg from "../donna.webp";

const awards = [
  { year: "2025-Now", title: "Interior Designer", body: "Qabany (Residential design & layout plans)" },
  { year: "2024-2025", title: "Office Administrator", body: "Mix Luxury (Dubai) - Remote coordination" },
  { year: "2024", title: "Interior Designer", body: "Values Home Furniture - Cairo" },
  { year: "2023", title: "Sales & Customer Support", body: "Matiliano & Dawood Investment" },
  { year: "2022", title: "Bachelor of Art Education", body: "Minya University" },
  { year: "2022", title: "Professional Diploma in Interior Design", body: "Makan Training Center" },
  { year: "2021-Now", title: "Freelance Designer & Art Projects", body: "Cultural Palaces, Governorate Theater, YMCA Minya Gallery" },
];

const stats = [
  { value: "5+", label: "Years experience" },
  { value: "2", label: "Design Degrees" },
  { value: "6+", label: "Professional Roles" },
  { value: "10+", label: "Workshops led" },
];

// Fade-up helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export function About() {
  const imgRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="bg-[#E0D6B8] overflow-hidden mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-20 py-16 sm:py-24">
        <div className="grid md:grid-cols-12 gap-12 md:gap-0 items-start">
          {/* Photo column */}
          <motion.div
            className="md:col-span-5 md:sticky md:top-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative" ref={imgRef}>
              <div className="relative overflow-hidden group" style={{ aspectRatio: "3/4" }}>
                <img
                  src={donnaImg}
                  alt="Madonna Nassif, interior designer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Reveal overlay */}
                <motion.div
                  className="absolute inset-0 bg-[#E0D6B8] origin-bottom"
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-[#B8645C] p-6 hidden md:block"
                style={{ width: 180 }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-[#EBE3CD] text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                >
                  Interior Designer
                </p>
                <p
                  className="text-[#EBE3CD] text-lg"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
                >
                  Madonna Nassif
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="md:col-span-6 md:col-start-7">
            <motion.p
              className="text-[#B8645C] text-xs uppercase tracking-widest mb-6"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
              {...fadeUp(0)}
            >
              About
            </motion.p>

            <motion.h2
              className="text-[#2C1E1B] leading-tight mb-8"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 300,
              }}
              {...fadeUp(0.1)}
            >
              Adding value by applying theoretical knowledge into creative practice.
            </motion.h2>

            <motion.div
              className="space-y-5 text-[#633A2C] leading-relaxed"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "1rem" }}
              {...fadeUp(0.2)}
            >
              <p>
                I'm Madonna Nassif — an Egyptian interior designer and Art Education graduate from Minya University, now based in Cairo. I am passionate about transforming ideas into functional, aesthetic, and client-tailored spaces.
              </p>
              <p>
                Currently, I work as an Interior Designer at Qabany. My professional background covers residential space planning at Values Home Furniture, remote office operations for Mix Luxury (Dubai), customer service support at Matiliano, and sales consulting at Dawood Investment.
              </p>
              <p>
                Additionally, since 2021 I have been active in freelance design and community art initiatives. This includes designing sets for the Minya Governorate Theater, governmental buildings, and organizing creative workshops at the YMCA Minya gallery.
              </p>
            </motion.div>

            <motion.div className="w-10 h-px bg-[#B8645C] my-10" {...fadeUp(0.3)} />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    className="text-[#2C1E1B]"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "2.2rem",
                      fontWeight: 300,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-[#633A2C] text-xs uppercase tracking-widest mt-1"
                    style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.12em" }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Awards */}
            <motion.div {...fadeUp(0.3)}>
              <p
                className="text-[#2C1E1B] text-xs uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
              >
                Experience & Education
              </p>
              <div className="space-y-4">
                {awards.map((a, i) => (
                  <motion.div
                    key={a.title}
                    className="flex items-start justify-between gap-4 border-b border-[#D8CDB0] pb-4 group cursor-default"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div>
                      <p
                        className="text-[#2C1E1B] group-hover:text-[#B8645C] transition-colors duration-300"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "0.95rem" }}
                      >
                        {a.title}
                      </p>
                      <p
                        className="text-[#633A2C] text-xs mt-0.5"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      >
                        {a.body}
                      </p>
                    </div>
                    <span
                      className="text-[#B8645C] text-xs shrink-0 mt-1"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {a.year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
