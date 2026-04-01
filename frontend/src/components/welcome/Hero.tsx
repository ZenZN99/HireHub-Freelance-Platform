import { LuArrowUpRight } from "react-icons/lu";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Hero = () => {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-6 pt-24 text-center"
    >
      {/* Badge */}
      <motion.div
        variants={item as any}
        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-white text-[10px] font-black tracking-[0.2em] uppercase mb-10 cursor-default"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
        </span>
        HireHub Network Status: Online
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={item as any}
        className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-8"
      >
        HIREHUB
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-white italic pr-6">
          Freelance
        </span>
      </motion.h1>

      {/* Paragraph */}
      <motion.p
        variants={item as any}
        className="max-w-2xl mx-auto text-lg text-white/40 mb-12 font-medium"
      >
        A digital workspace designed for the elite. Connect with top talent or
        launch your freelance career on a cutting-edge network.
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={item as any}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32"
      >
        <motion.button
          whileHover={{
            scale: 1.06,
            boxShadow: "0px 10px 30px rgba(52, 211, 153, 0.15)",
          }}
          whileTap={{ scale: 0.97 }}
          className="bg-white text-black px-10 py-4 rounded-full text-sm font-black flex items-center gap-2 uppercase tracking-wider hover:bg-[#34d399] hover:text-white transition-all"
        >
          Start Your Project <LuArrowUpRight size={18} strokeWidth={3} />
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.06,
            borderColor: "rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: 0.97 }}
          className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full text-sm font-black flex items-center gap-2 uppercase tracking-wider"
        >
          Explore Talent{" "}
          <LuArrowUpRight size={18} strokeWidth={3} className="text-white/30" />
        </motion.button>
      </motion.div>
    </motion.main>
  );
};

export default Hero;
