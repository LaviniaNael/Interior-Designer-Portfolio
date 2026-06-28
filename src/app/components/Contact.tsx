import { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const contactInfo = [
  { label: "Location", value: "Cairo, Egypt" },
  { label: "Email", value: "madonnnanasef98@gmail.com" },
  { label: "Phone", value: "+20 122 711 7933" },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    budget: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#A87C70] focus:border-[#B8645C] outline-none py-3 text-[#E0D6B8] placeholder-[#A87C70] text-sm transition-colors duration-300 caret-[#B8645C]";

  return (
    <section id="contact" className="bg-[#633A2C] px-6 sm:px-8 md:px-20 py-16 sm:py-24 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">

        {/* Info column */}
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[#E3C1B4] text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-[#E0D6B8] leading-tight mb-8"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 300,
            }}
          >
            Let's talk
            <br />
            <em>about your home</em>
          </h2>
          <p
            className="text-[#A87C70] leading-relaxed text-sm mb-10"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
          >
            Whether you have a residential design project, a stage decoration need, or an educational art workshop request in mind — I'd love to hear from you.
          </p>

          <div className="space-y-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-[#DDBEA9] text-sm"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 border-t border-[#A87C70] pt-10">
            <p
              className="text-[#DDBEA9] text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
            >
              Follow
            </p>
            <div className="flex gap-5 flex-wrap">
              {["Instagram", "Pinterest", "Houzz"].map((s) => (
                <button
                  key={s}
                  className="group relative text-[#A87C70] text-xs uppercase tracking-widest transition-colors duration-200 overflow-hidden"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.12em" }}
                >
                  <span className="relative z-10 group-hover:text-[#B8645C] transition-colors duration-200">
                    {s}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#B8645C] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form column */}
        <motion.div
          className="md:col-span-6 md:col-start-7"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className="flex flex-col items-start justify-center h-full py-16 sm:py-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="w-12 h-px bg-[#B8645C] mb-8"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ originX: 0 }}
                />
                <h3
                  className="text-[#E0D6B8] mb-4"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "1.8rem", fontWeight: 300 }}
                >
                  Thank you, {form.name.split(" ")[0]}.
                </h3>
                <p
                  className="text-[#DDBEA9] leading-relaxed mb-10 max-w-sm"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                >
                  I've received your message and will be in touch within two business days.
                  I look forward to learning more about your interior project.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label
                      className="text-[#A87C70] text-xs uppercase tracking-widest block mb-2"
                      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                    >
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Smith"
                      className={inputClass}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      className="text-[#A87C70] text-xs uppercase tracking-widest block mb-2"
                      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                    >
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className={inputClass}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label
                      className="text-[#A87C70] text-xs uppercase tracking-widest block mb-2"
                      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className={inputClass}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      className="text-[#A87C70] text-xs uppercase tracking-widest block mb-2"
                      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                    >
                      Approximate Budget
                    </label>
                    <select
                      className={`${inputClass} cursor-pointer`}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="" disabled className="bg-[#2C1E1B]">Select range</option>
                      <option value="50-100k" className="bg-[#2C1E1B]">£50k – £100k</option>
                      <option value="100-200k" className="bg-[#2C1E1B]">£100k – £200k</option>
                      <option value="200-500k" className="bg-[#2C1E1B]">£200k – £500k</option>
                      <option value="500k+" className="bg-[#2C1E1B]">£500k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="text-[#A87C70] text-xs uppercase tracking-widest block mb-2"
                    style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                  >
                    Tell me about your project
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your space, what you love, what you want to change, and how you use the space..."
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="group relative overflow-hidden flex items-center gap-3 bg-[#B8645C] text-[#EBE3CD] text-xs uppercase tracking-widest px-8 py-4"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Send Enquiry
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 3, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Send size={14} />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-[#984A3D] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
