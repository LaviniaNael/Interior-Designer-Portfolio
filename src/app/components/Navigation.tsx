import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "What I Do", path: "/services" }
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  const isHome = location.pathname === "/";
  const navBgClass = (scrolled || !isHome || menuOpen)
    ? "bg-[#E0D6B8]/95 backdrop-blur-sm shadow-sm"
    : "bg-transparent";

  const textColor = (!isHome || scrolled || menuOpen) ? "text-[#2C1E1B]" : "text-white";
  const logoColor = (!isHome || scrolled || menuOpen) ? "text-[#2C1E1B]" : "text-white";
  const linkColor = (!isHome || scrolled || menuOpen) ? "text-[#2C1E1B] hover:text-[#B8645C]" : "text-white/80 hover:text-white";
  const buttonBorder = (!isHome || scrolled || menuOpen) ? "border-[#2C1E1B] text-[#2C1E1B] hover:bg-[#633A2C] hover:text-[#E0D6B8] hover:border-[#633A2C]" : "border-white text-white hover:bg-white hover:text-[#633A2C]";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16 sm:h-20">
          <Link
            to="/"
            onClick={closeMenu}
            className={`font-[Fraunces] tracking-widest uppercase text-xs sm:text-sm transition-colors duration-300 ${logoColor}`}
            style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.18em" }}
          >
            Madonna Nassif
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative transition-colors duration-200 text-xs uppercase tracking-widest ${linkColor}`}
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
              >
                {link.name}
                {/* Animated underline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  } ${(!isHome || scrolled) ? "bg-[#B8645C]" : "bg-white"}`}
                />
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden p-1 transition-colors duration-200 ${textColor}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 45 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#633A2C] flex flex-col items-center justify-center"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="text-[#E0D6B8] mb-12 tracking-widest uppercase text-sm"
              style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.18em" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Madonna Nassif
            </motion.span>

            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className="group relative text-[#E0D6B8] text-3xl sm:text-4xl tracking-wide hover:text-[#DDBEA9] transition-colors duration-300"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#DDBEA9] group-hover:w-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + navLinks.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-12 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-[#E0D6B8] text-xs uppercase tracking-widest"
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
              >
                Interior Designer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
