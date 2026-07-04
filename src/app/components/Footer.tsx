import { Link } from "react-router";
import { motion } from "motion/react";

const footerLinks = [
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "What I Do", path: "/services" },
];

const contactInfo = [
  { label: "Location", value: "Cairo, Egypt" },
  { label: "Email", value: "madonnnanasef98@gmail.com" },
  { label: "Phone", value: "+20 122 711 7933" },
];

// const socials = [
//   { name: "Instagram", url: "#" },
//   { name: "Pinterest", url: "#" },
//   { name: "Houzz", url: "#" }
// ];

export function Footer() {
  return (
    <footer id="footer" className="bg-[#633A2C] px-6 sm:px-8 md:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Column 1: Brand & Socials */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <p
                className="text-[#E0D6B8] tracking-widest uppercase"
                style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.18em", fontSize: "1.25rem" }}
              >
                Madonna Nassif
              </p>
              <p
                className="text-[#DDBEA9] text-xs mt-1.5 uppercase tracking-widest"
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
              >
                Interior Designer
              </p>
            </div>

            {/* <div>
              <p
                className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
              >
                Follow
              </p>
              <div className="flex gap-5 flex-wrap">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="group relative text-[#A87C70] hover:text-[#E0D6B8] text-xs uppercase tracking-widest transition-colors duration-200 overflow-hidden"
                    style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.12em" }}
                  >
                    <span className="relative z-10">{s.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#E0D6B8] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  </a>
                ))}
              </div>
            </div> */}
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 md:col-start-6">
            <p
              className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group relative text-[#DDBEA9] hover:text-[#E0D6B8] text-xs uppercase tracking-widest transition-colors duration-200 self-start"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#DDBEA9] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:col-span-4 md:col-start-9">
            <p
              className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              Contact
            </p>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label}>
                  <p
                    className="text-[#A87C70] text-[10px] uppercase tracking-widest"
                    style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.1em" }}
                  >
                    {info.label}
                  </p>
                  <p
                    className="text-[#E0D6B8] text-sm mt-0.5"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                  >
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-px bg-[#DDBEA9]/20 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p
            className="text-[#DDBEA9]/60 text-xs"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            © 2026 Madonna Nassif. All rights reserved.
          </p>
          <p
            className="text-[#DDBEA9]/60 text-xs"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Designed &amp; Developed by{" "}
            <a target="_blank" href="https://laviniaalfons.vercel.app/" className="text-[#DDBEA9] hover:text-[#E0D6B8] transition-colors duration-200 cursor-pointer">
              Lavinia Nael
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
