"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GlassButton } from "./ui/GlassButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const SIGNALS = [
  "PG&E",
  "Irrigation",
  "Soil moisture",
  "Telemetry",
  "Labor",
  "Weather",
  "Crop health",
];

export function DataConstellation() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-white"
    >
      {/* ambient field — soft green light, slow drift */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#f3faf4_0%,#ffffff_55%)]" />
        <div className="animate-blob absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent-300/25 blur-[120px]" />
        <div className="animate-blob absolute -bottom-40 -right-24 h-[34rem] w-[34rem] rounded-full bg-accent-200/30 blur-[130px] [animation-delay:-8s]" />
        <div className="animate-blob absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent-100/40 blur-[120px] [animation-delay:-14s]" />
        {/* hairline grid, barely-there */}
        <div className="field-lines absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(60%_55%_at_50%_45%,#000_0%,transparent_75%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x flex flex-col items-center py-32 text-center"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            <span className="eyebrow !text-ink-soft">Terra OS · The Brain</span>
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-7xl lg:text-[5.5rem]"
        >
          Every signal on your farm.
          <br />
          <span className="bg-gradient-to-br from-accent-500 to-accent-700 bg-clip-text text-transparent">
            One intelligent system.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-mute sm:text-xl"
        >
          Terra connects the data you already produce — power, water, irrigation,
          labor, weather, crop health — into a single operating layer you can act
          on in real time.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <GlassButton href="#inquire" tone="brand" className="px-7 py-3.5 text-base">
            Inquire
            <ArrowRight size={16} />
          </GlassButton>
          <a
            href="#products"
            className="press group inline-flex items-center gap-1.5 px-2 py-2 text-base font-medium text-ink-soft transition-colors hover:text-accent-600"
          >
            See the platform
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* signal row — what gets unified, stated quietly */}
        <motion.div
          variants={item}
          className="mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2"
        >
          {SIGNALS.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-grass-300" />}
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-mute">
                {s}
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="eyebrow !text-[0.62rem] !text-grass-400">Scroll</span>
        <span className="relative h-9 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-3 w-px animate-[scanline_2.4s_ease-in-out_infinite] bg-accent-500" />
        </span>
      </motion.div>
    </section>
  );
}
