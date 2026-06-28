import { Link } from "react-router";
import { motion } from "motion/react";

const footerLinks = [
  { name: "About", path: "/about" },
  { name: "What I Do", path: "/services" },
  { name: "Contact", path: "/contact" }
];

export function Footer() {
  return (
    <footer className="bg-[#633A2C] px-6 sm:px-8 md:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p
              className="text-[#E0D6B8] tracking-widest uppercase"
              style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.18em", fontSize: "1rem" }}
            >
              Madonna Nassif
            </p>
            <p
              className="text-[#DDBEA9] text-xs mt-1 uppercase tracking-widest"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              Interior Designer
            </p>
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-10">
            {footerLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={link.path}
                  className="group relative text-[#DDBEA9] hover:text-[#E0D6B8] text-xs uppercase tracking-widest transition-colors duration-200"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#DDBEA9] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-full h-px bg-[#DDBEA9]/40 mb-8"
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
