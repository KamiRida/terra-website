"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { ReactNode } from "react";

type Tone = "brand" | "light" | "dark";

/**
 * GlassButton, a liquid-glass button that responds to the cursor with a
 * moving specular highlight and a subtle tilt. Renders an <a> when `href`
 * is set, otherwise a <button>.
 */
export function GlassButton({
  children,
  href,
  type = "button",
  onClick,
  disabled,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  tone?: Tone;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 240, damping: 16 });
  const ry = useSpring(0, { stiffness: 240, damping: 16 });

  const sheen = useMotionTemplate`radial-gradient(120px circle at ${px}% ${py}%, rgba(255,255,255,0.7), transparent 60%)`;
  const transform = useMotionTemplate`perspective(560px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  function onMove(e: React.PointerEvent) {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x * 100);
    py.set(y * 100);
    ry.set((x - 0.5) * 12);
    rx.set((0.5 - y) * 12);
  }
  function onLeave() {
    px.set(50);
    py.set(50);
    rx.set(0);
    ry.set(0);
  }

  const text = tone === "light" ? "text-white" : "text-ink";
  const tint =
    tone === "dark"
      ? "from-ink/85 to-ink/70"
      : tone === "light"
        ? "from-white/15 to-white/5"
        : "from-accent-400/35 to-accent-600/30";

  const cls = `glass-liquid glass-rim press group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold ${text} disabled:opacity-60 ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b ${tint}`}
      />
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: sheen }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const style = reduce ? undefined : { transform };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} onPointerMove={onMove} onPointerLeave={onLeave} style={style} className={cls}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={style}
      className={cls}
    >
      {inner}
    </motion.button>
  );
}
