import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 pt-32 pb-20">
      <h1 className="font-display text-4xl text-canvas-ink">Page not found</h1>
      <p className="mt-4 text-canvas-ink/80">
        That route does not exist. Return home to explore case studies and motion
        work.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit rounded-full bg-ochre px-5 py-2.5 text-sm font-semibold text-canvas-ink transition hover:brightness-95"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
