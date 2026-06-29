import { soundTags } from './editorialData';

export default function MiduToolsMarquee() {
  const items = [...soundTags, ...soundTags];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#020202] py-10 text-white">
      <div className="mx-auto max-w-[118rem] px-5 sm:px-8 md:px-10">
        <div className="mb-8 grid gap-4 md:grid-cols-[0.34fr_0.66fr] md:items-end">
          <h2 className="text-3xl font-black leading-none sm:text-4xl md:text-5xl">
            Our features &amp;
          </h2>
          <p className="text-3xl font-black leading-none text-white/28 sm:text-4xl md:text-5xl">
            your server.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex min-w-max animate-[marquee_28s_linear_infinite] items-center gap-10 whitespace-nowrap px-5 text-sm font-bold uppercase text-white/38 sm:px-8 md:px-10">
          {items.map((item, index) => (
            <span key={`a-${item}-${index}`} className="inline-flex items-center gap-10">
              {item}
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-primary/70" />
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex min-w-max animate-[marquee_28s_linear_infinite] items-center gap-10 whitespace-nowrap px-5 text-sm font-bold uppercase text-white/38 sm:px-8 md:px-10"
        >
          {items.map((item, index) => (
            <span key={`b-${item}-${index}`} className="inline-flex items-center gap-10">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent-primary/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
