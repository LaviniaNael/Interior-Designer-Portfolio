import "../styles/fonts.css";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Services } from "./components/Services";
// import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { useEffect, useState, useCallback } from "react";

// Smooth curtain page transition
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
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
      <Portfolio isHomepage={true} />
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
    const handleScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    };

    handleScroll();
    // Small timeout to ensure it scrolls to top after AnimatePresence transitions begin
    const timer = setTimeout(handleScroll, 50);
    return () => clearTimeout(timer);
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
              <Route path="/work" element={<PageTransition><Portfolio isHomepage={false} /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </motion.div>
    </>
  );
}
