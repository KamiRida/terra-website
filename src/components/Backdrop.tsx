/**
 * Backdrop, a single continuous background layer behind the whole page.
 * Soft drifting blobs give the frosted glass something to refract and make
 * every section blend into the next (no hard seams). Also hosts the shared
 * SVG displacement filter used by the liquid-glass surfaces.
 */
export function Backdrop() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
        {/* warm crimson + neutral washes that fade out, no edges, so sections melt together */}
        <div className="animate-blob absolute -left-32 top-[6%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(47,168,79,0.13),transparent)] blur-2xl" />
        <div className="animate-blob absolute right-[-10rem] top-[28%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(92,191,106,0.11),transparent)] blur-2xl [animation-delay:-8s]" />
        <div className="animate-blob absolute left-[20%] top-[58%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(120,135,118,0.09),transparent)] blur-2xl [animation-delay:-15s]" />
        <div className="animate-blob absolute right-[8%] bottom-[2%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(47,168,79,0.09),transparent)] blur-2xl [animation-delay:-20s]" />
      </div>

      {/* shared liquid-glass refraction filter (used by .glass-liquid; Chromium) */}
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0" focusable="false">
        <filter id="terra-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.2" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="58"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
}
