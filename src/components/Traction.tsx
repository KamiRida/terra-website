"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { TiltGlass } from "./ui/TiltGlass";
import { tractionStats, signedFarms } from "@/lib/site";

export function Traction() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <p className="eyebrow">Traction</p>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
          <span className="text-ink">Trusted by </span>
          <span className="text-accent">185,000 acres.</span>
        </h2>

        <div ref={gridRef} className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {tractionStats.map((s, i) => (
            <TiltGlass key={s.label} className="flex h-full flex-col gap-1 p-6" max={5}>
              <span className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                <CountUp value={s.value} play={inView} delay={i * 0.06} />
              </span>
              <span className="text-sm leading-snug text-ink-mute">{s.label}</span>
            </TiltGlass>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-mute">
          <span className="eyebrow">Including</span>
          {signedFarms.map((f) => (
            <span
              key={f}
              className="rounded-full border border-line bg-white px-3 py-1 font-medium text-ink"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function parseValue(value: string) {
  const m = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!m) return { prefix: "", target: 0, suffix: value, comma: false };
  const target = parseInt(m[2].replace(/,/g, ""), 10);
  return {
    prefix: m[1],
    target,
    suffix: m[3],
    comma: m[2].includes(",") || target >= 1000,
  };
}

function fmt(v: number, comma: boolean) {
  const n = Math.round(v);
  return comma ? n.toLocaleString("en-US") : String(n);
}

/** Quickly counts up to the value when it scrolls into view. */
function CountUp({ value, play, delay }: { value: string; play: boolean; delay: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, target, suffix, comma } = parseValue(value);
  const mv = useMotionValue(0);

  useMotionValueEvent(mv, "change", (v) => {
    if (ref.current) ref.current.textContent = fmt(v, comma);
  });

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = fmt(target, comma);
      return;
    }
    if (play) {
      const controls = animate(mv, target, { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay });
      return () => controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, reduce]);

  return (
    <>
      {prefix}
      <span ref={ref}>{fmt(0, comma)}</span>
      {suffix}
    </>
  );
}
