import { Reveal, Stagger, RevealItem } from "./ui/Reveal";
import { TiltGlass } from "./ui/TiltGlass";
import { problems, stakes } from "@/lib/site";

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">The problem</p>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            <span className="text-ink">Farming hasn&apos;t changed in twenty years.</span>{" "}
            <span className="text-accent">The stakes have.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.1}>
          {problems.map((p) => (
            <RevealItem key={p.title} className="h-full">
              <TiltGlass className="h-full p-7">
                <h3 className="text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink-mute">{p.body}</p>
              </TiltGlass>
            </RevealItem>
          ))}
        </Stagger>

        <Reveal delay={0.05}>
          <h2 className="mt-20 max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            <span className="text-ink">And everyone</span>{" "}
            <span className="text-accent">pays.</span>
          </h2>
        </Reveal>
        <Stagger className="mt-6 grid gap-5 md:grid-cols-2" stagger={0.1}>
          {stakes.map((s) => (
            <RevealItem key={s.value} className="h-full">
              <TiltGlass className="flex h-full gap-5 p-7">
                <span className="text-4xl font-semibold leading-none tracking-tight text-ink">
                  {s.value}
                </span>
                <p className="text-[0.95rem] leading-relaxed text-ink-mute">{s.body}</p>
              </TiltGlass>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
