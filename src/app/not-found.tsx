import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-[2] mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 pt-32 pb-20">
      <h1 className="font-display text-4xl text-star-white">Page not found</h1>
      <p className="mt-4 text-cream-muted">
        That route does not exist. Return home to explore case studies and motion
        work.
      </p>
      <Link
        href="/"
        className="btn-primary-night mt-8 inline-flex w-fit rounded-none px-8 py-3"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
