import { motion } from "motion/react";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Interior Design & 3D Visualization",
    description:
      "Full-service interior design leveraging industry standard tools like AutoCAD, 3ds Max, and SketchUp to create detailed plans and photorealistic renders.",
    includes: ["Space planning & layouts", "3D Max modeling & rendering", "AutoCAD drafting", "Material & finish selection"],
  },
  {
    number: "02",
    title: "Freelance Décor & Styling",
    description:
      "Bespoke décor services tailored for diverse spaces including cultural palaces, governmental buildings, and private residential homes.",
    includes: ["Concept development", "Styling & accessorizing", "Furniture selection", "Vendor coordination"],
  },
  {
    number: "03",
    title: "Stage Decoration",
    description:
      "Creative set design and stage decoration for theatrical productions. Previous experience includes designing for the Minya governorate theater.",
    includes: ["Theatrical set design", "Prop sourcing & creation", "Lighting coordination", "On-site installation"],
  },
  {
    number: "04",
    title: "Arts & Crafts Workshops",
    description:
      "Educational art workshops designed for both adults and children, focusing on creative development, handicrafts, and artistic expression.",
    includes: ["Handicraft training", "Children's art games", "Adult creative workshops", "Educational art curriculum"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    body: "We start by discussing your vision, whether it's an interior space, a theatrical set, or an educational art program.",
  },
  {
    step: "02",
    title: "Concept & Planning",
    body: "I develop initial concepts, spatial layouts, or workshop curriculums tailored specifically to your goals and requirements.",
  },
  {
    step: "03",
    title: "3D Visualization",
    body: "For design projects, I create detailed AutoCAD plans and 3ds Max renderings so you can visualize the final result.",
  },
  {
    step: "04",
    title: "Material Sourcing",
    body: "I source the right materials, props, or art supplies needed to bring the concept to life within your budget.",
  },
  {
    step: "05",
    title: "Execution & Build",
    body: "I oversee the implementation phase, ensuring every detail of the design or set is executed to the highest standard.",
  },
  {
    step: "06",
    title: "Final Delivery",
    body: "A final review of the completed space or project to ensure it perfectly aligns with our initial vision.",

  },
];

function ServiceCard({
  s,
  index,
}: {
  s: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={s.number}
      className="bg-[#2C1E1B] p-8 sm:p-10 group cursor-default relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated bg fill */}
      <motion.div
        className="absolute inset-0 bg-[#633A2C]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span
            className="text-[#B8645C] text-xs"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.1em" }}
          >
            {s.number}
          </span>
          <motion.div
            className="h-px bg-[#8A5A4A] mt-2"
            animate={{ width: hovered ? 48 : 32, backgroundColor: hovered ? "#B8645C" : "#8A5A4A" }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <h3
          className="text-[#E0D6B8] mb-4"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "1.25rem" }}
        >
          {s.title}
        </h3>
        <p
          className="text-[#DDBEA9] leading-relaxed mb-6 text-sm"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
        >
          {s.description}
        </p>
        <ul className="space-y-2">
          {s.includes.map((item, j) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 text-[#DDBEA9] text-xs"
              style={{ fontFamily: "'Jost', sans-serif" }}
              animate={{ x: hovered ? 4 : 0, color: hovered ? "#E0D6B8" : "#DDBEA9" }}
              transition={{ duration: 0.25, delay: j * 0.04 }}
            >
              <span className="w-1 h-1 rounded-full bg-[#B8645C] shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProcessStep({ s, index }: { s: (typeof processSteps)[0]; index: number }) {
  return (
    <motion.div
      className={`p-6 sm:p-8 ${index < 3 ? "md:border-b border-[#D8CDB0]" : ""} ${
        index % 3 !== 2 ? "md:border-r border-[#D8CDB0]" : ""
      } border-b border-[#D8CDB0] last:border-b-0 md:last:border-b group hover:bg-[#D8CDB0] transition-colors duration-300 cursor-default`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className="text-[#B8645C] mb-6 group-hover:scale-110 transition-transform duration-300 origin-left inline-block"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "2rem",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        {s.step}
      </p>
      <h3
        className="text-[#2C1E1B] mb-3 group-hover:text-[#B8645C] transition-colors duration-300"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "1.1rem" }}
      >
        {s.title}
      </h3>
      <p
        className="text-[#633A2C] text-sm leading-relaxed"
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
      >
        {s.body}
      </p>
    </motion.div>
  );
}

export function Services() {
  return (
    <>
      <section id="services" className="bg-[#E0D6B8] mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-20 py-16 sm:py-24">
          {/* Header */}
          <div className="grid md:grid-cols-12 gap-8 sm:gap-12 mb-16 sm:mb-20">
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-[#B8645C] text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
              >
                Services
              </p>
              <h2
                className="text-[#2C1E1B] leading-tight"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                }}
              >
                How I can
                <br />
                <em>work with you</em>
              </h2>
            </motion.div>
            <motion.div
              className="md:col-span-6 md:col-start-7 flex items-end"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-[#633A2C] leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
              >
                Every home project is different. I offer a range of service levels to suit the
                scope of your project — from a single consultation to full-service design and
                build management.
              </p>
            </motion.div>
          </div>

          {/* Service cards grid */}
          <div className="grid sm:grid-cols-2 gap-px bg-[#E0D6B8]">
            {services.map((s, i) => (
              <ServiceCard key={s.number} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#E0D6B8] px-6 sm:px-8 md:px-20 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-[#B8645C] text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
              >
                Process
              </p>
              <h2
                className="text-[#2C1E1B] leading-tight"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                }}
              >
                How a home
                <br />
                <em>comes to life</em>
              </h2>
            </motion.div>

          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border border-[#DDBEA9]">
            {processSteps.map((s, i) => (
              <ProcessStep key={s.step} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
