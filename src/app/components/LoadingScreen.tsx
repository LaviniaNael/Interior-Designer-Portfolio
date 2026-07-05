import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const start = Date.now();
    const duration = 1600;
    const raf = (id: number) => id;
    let frameId = raf(0);

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);

      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        // Start reveal curtain
        setTimeout(() => {
          setPhase("reveal");
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 900);
        }, 200);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Top curtain panel */}
          <motion.div
            className="fixed inset-x-0 top-0 z-[200] bg-[#2C1E1B] origin-top"
            style={{ height: "calc(50vh + 1px)" }}
            animate={phase === "reveal" ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom curtain panel */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[200] bg-[#2C1E1B] origin-bottom"
            style={{ height: "calc(50vh + 1px)" }}
            animate={phase === "reveal" ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center content (logo + progress) — fades out before reveal */}
          <motion.div
            className="fixed inset-0 z-[201] flex flex-col items-center justify-center pointer-events-none"
            animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex flex-col items-center gap-3 mb-16"
            >
              {/* Decorative line */}
              <motion.div
                className="w-px bg-[#B8645C]"
                initial={{ height: 0 }}
                animate={{ height: 40 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <p
                className="text-[#E0D6B8] tracking-[0.35em] uppercase text-sm"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                Madonna Nassif
              </p>
              <p
                className="text-[#A87C70] tracking-[0.25em] uppercase text-[10px]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Interior Design Studio
              </p>
              <motion.div
                className="w-px bg-[#B8645C]"
                initial={{ height: 0 }}
                animate={{ height: 40 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-48"
            >
              <div className="w-full h-px bg-[#633A2C] relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#B8645C]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p
                className="text-[#8A5A4A] text-[10px] tracking-widest uppercase text-right mt-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {Math.round(progress)}%
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
