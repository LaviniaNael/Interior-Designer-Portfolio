import "../styles/fonts.css";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Services } from "./components/Services";
// import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { useEffect, useState, useCallback } from "react";

// Smooth curtain page transition
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  return (
    <PageTransition>
      <Hero />
      <Portfolio />
      {/* <Testimonials /> */}
    </PageTransition>
  );
}

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    // Short delay so curtains fully retract before showing content
    setTimeout(() => setShowContent(true), 100);
    setTimeout(() => setLoading(false), 200);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <motion.div
        className="min-h-screen bg-[#E0D6B8] flex flex-col"
        style={{ scrollBehavior: "smooth" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <Navigation />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </motion.div>
    </>
  );
}
