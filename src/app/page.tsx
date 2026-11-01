import { site } from "@/data/content";

export default function Home() {
  return (
    <main id="konten-utama" className="page-shell min-h-svh py-16">
      <p className="eyebrow">{site.event}</p>
      <h1 className="mt-6 max-w-4xl text-[clamp(3rem,10vw,8rem)] leading-[0.92] tracking-[-0.04em]">
        {site.name}
      </h1>
      <p className="lede mt-8">{site.description}</p>
      <p className="mt-6 font-mono text-sm text-muted">
        Fase 0 &mdash; fondasi siap. Section akan dibangun pada fase berikutnya.
      </p>
      <div className="mt-10 flex flex-wrap gap-3" aria-hidden="true">
        {["--bg", "--surface", "--text", "--muted", "--alert", "--hope", "--warn"].map(
          (token) => (
            <span
              key={token}
              className="h-12 w-12 rounded-xl border border-white/15"
              style={{ backgroundColor: `var(${token})` }}
            />
          ),
        )}
      </div>
    </main>
  );
}
