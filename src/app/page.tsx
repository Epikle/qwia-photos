import Image from 'next/image';

export default function Home() {
  return (
    <main id="hero" className="isolate min-h-screen">
      <section className="relative min-h-screen grid place-items-center">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        <h1 className="text-center text-4xl font-bold uppercase text-zinc-100 drop-shadow-md md:text-8xl">qwia</h1>
      </section>
    </main>
  );
}
