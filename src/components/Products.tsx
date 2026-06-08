"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";

const BARS = [40, 62, 50, 78, 58, 84, 70, 92, 66, 80];

export function Products() {
  const ref = useRef<HTMLElement>(null);
  // tall section + sticky inner = the page "pins" while the bars fill, then releases
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      id="products"
      ref={ref}
      className="relative w-full scroll-mt-24"
      style={{ backgroundColor: "#1c6e33", height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* grain */}
        <div className="grain-overlay pointer-events-none absolute inset-0 z-50" />

        {/* ghost product name, gray */}
        <div
          className="pointer-events-none absolute inset-x-0 z-[2] flex select-none items-center justify-center"
          style={{ top: "16%" }}
        >
          <span
            className="whitespace-nowrap font-bold uppercase leading-none"
            style={{
              fontSize: "clamp(64px, 18vw, 280px)",
              letterSpacing: "-0.03em",
              color: "rgba(0,0,0,0.16)",
            }}
          >
            THE BRAIN
          </span>
        </div>

        {/* brand */}
        <span className="absolute left-4 top-6 z-[60] text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:left-8">
          Terra · Products
        </span>

        {/* dashboard */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center px-6">
          <div
            style={{
              width: "min(86vw, 560px)",
              height: "min(58vh, 420px)",
              transform: "translateY(12%)",
            }}
          >
            <BrainDash progress={scrollYProgress} />
          </div>
        </div>

        {/* bottom-left text (bigger) */}
        <div className="absolute bottom-8 left-4 z-[60] max-w-md sm:bottom-16 sm:left-12">
          <p className="mb-3 text-2xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            The Brain · Terra OS
          </p>
          <p className="hidden text-sm leading-relaxed text-white/85 sm:block sm:text-lg">
            The AI operating layer. It unifies every signal on your farm, bills, logs,
            telemetry, labor, finance, then acts before the cost hits.
          </p>
        </div>

        {/* bottom-right link */}
        <a
          href="#camera"
          className="group absolute bottom-8 right-4 z-[60] inline-flex items-center gap-2 uppercase text-white/95 transition-opacity hover:opacity-100 sm:bottom-16 sm:right-10"
          style={{ fontSize: "clamp(20px, 4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          <span className="font-bold">The Eyes</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </section>
  );
}

/* Terra OS dashboard mockup, bars climb/fall with scroll while the section is pinned */
function BrainDash({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-grass-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-grass-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-grass-300" />
        <span className="ml-3 text-xs font-semibold text-ink-soft">Terra OS</span>
        <span className="ml-auto rounded-full bg-accent-50 px-2 py-0.5 text-[0.65rem] font-medium text-accent-700">
          Operational layer · live
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[88px_1fr] overflow-hidden">
        <div className="hidden flex-col gap-1 border-r border-line bg-mist p-3 sm:flex">
          {["Field", "Water", "Energy", "Labor", "Agents"].map((s, i) => (
            <span
              key={s}
              className={`rounded-md px-2 py-1.5 text-[0.7rem] font-medium ${i === 4 ? "bg-accent-500 text-white" : "text-ink-mute"}`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2.5 p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["12", "sources"],
              ["$3,000", "saved"],
              ["98%", "uptime"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-lg border border-line bg-white p-2.5">
                <p className="text-base font-semibold text-ink">{v}</p>
                <p className="text-[0.65rem] text-ink-mute">{l}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-accent-200 bg-accent-50 px-3 py-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent-500" />
            <p className="text-[0.72rem] text-ink-soft">
              <span className="font-semibold text-ink">Agent flagged:</span> mistimed pump · save $3,000
            </p>
          </div>
          <div className="flex flex-1 items-end gap-1 rounded-lg border border-line bg-white p-3">
            {BARS.map((h, i) => (
              <ScrollBar key={i} progress={progress} h={h} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollBar({ progress, h, index }: { progress: MotionValue<number>; h: number; index: number }) {
  const start = 0.06 + index * 0.012;
  const scaleY = useTransform(progress, [start, start + 0.28], [0, 1]);
  return (
    <motion.span
      className="w-full rounded-sm bg-accent-200"
      style={{ height: `${h}%`, transformOrigin: "bottom", scaleY }}
    />
  );
}
