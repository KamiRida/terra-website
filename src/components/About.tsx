import { Reveal } from "./ui/Reveal";
import { founders } from "@/lib/site";

export function About() {
  const jaiyen = founders.find((f) => f.name.startsWith("Jaiyen"));
  const kamran = founders.find((f) => f.name.startsWith("Kamran"));

  const k = {
    slug: "kamran",
    name: kamran?.name ?? "Kamran Salahuddin",
    role: kamran?.role ?? "Co-founder & CTO",
    school: kamran?.school ?? "University of Chicago",
  };
  const j = {
    slug: "jaiyen",
    name: jaiyen?.name ?? "Jaiyen Shetty",
    role: jaiyen?.role ?? "Co-founder & CEO",
    school: jaiyen?.school ?? "UC Berkeley Haas",
  };

  const heading = (
    <div className="relative text-center">
      <span className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/65 blur-2xl" />
      <p className="eyebrow">About us</p>
      <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
        <span className="text-ink">We grew up around farms.</span>{" "}
        <span className="text-ink-mute">And we know how to build for them.</span>
      </h2>
    </div>
  );

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div className="container-x">
        {/* desktop: big faces flanking the heading */}
        <div className="hidden items-center justify-center lg:flex">
          <Face {...k} className="z-0 w-[30rem] shrink-0 -mr-20" />
          <Reveal className="relative z-10 w-[24rem] shrink-0">{heading}</Reveal>
          <Face {...j} className="z-0 w-[30rem] shrink-0 -ml-20" />
        </div>

        {/* mobile: heading, then the two faces */}
        <div className="lg:hidden">
          <Reveal className="mx-auto max-w-md">{heading}</Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <Face {...k} className="w-full" />
            <Face {...j} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Face({
  slug,
  name,
  role,
  school,
  className = "",
}: {
  slug: string;
  name: string;
  role: string;
  school: string;
  className?: string;
}) {
  return (
    <figure className={`relative mx-auto ${className}`}>
      <div
        className="aspect-square w-full bg-contain bg-center bg-no-repeat grayscale"
        style={{
          backgroundImage: `url(/founders/${slug}.png), url(/founders/portrait-ph.svg)`,
          opacity: 0.95,
          WebkitMaskImage: "radial-gradient(72% 72% at 50% 45%, #000 60%, transparent 100%)",
          maskImage: "radial-gradient(72% 72% at 50% 45%, #000 60%, transparent 100%)",
        }}
      />
      <figcaption className="-mt-3 text-center">
        <p className="text-base font-semibold tracking-tight text-ink">{name}</p>
        <p className="text-sm font-medium text-accent">{role}</p>
        <p className="mt-0.5 text-xs text-ink-mute">{school}</p>
      </figcaption>
    </figure>
  );
}
