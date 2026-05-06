import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllUxProjectIds,
  getUxProjectById,
  uxProjects,
} from "@/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllUxProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getUxProjectById(id);
  if (!project) {
    return { title: "Work" };
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

const linkMuted =
  "text-sm text-cream-soft transition-colors hover:text-star-white";
const metaLabel =
  "text-xs font-semibold uppercase tracking-wide text-cream-faint";
const glassCard =
  "glass-dark-strong relative overflow-hidden rounded-2xl border border-[var(--glass-border)]";

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const project = getUxProjectById(id);
  if (!project) {
    notFound();
  }

  const index = uxProjects.findIndex((p) => p.id === project.id);
  const prev = index > 0 ? uxProjects[index - 1] : null;
  const next =
    index < uxProjects.length - 1 ? uxProjects[index + 1] : null;

  return (
    <article className="relative z-[2] pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm text-cream-faint">
            <li>
              <Link href="/" className={linkMuted}>
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#work" className={linkMuted}>
                Work
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-star-white">{project.title}</li>
          </ol>
        </nav>

        <header className={`${glassCard} mt-10 p-7 sm:p-10`}>
          <p className="font-mono text-xs font-light uppercase tracking-[0.2em] text-night-cerulean">
            Case study
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-star-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-cream-muted">{project.subtitle}</p>
          <p className="mt-6 text-base leading-relaxed text-cream-muted">
            {project.summary}
          </p>

          <dl className="mt-8 grid gap-4 border-t border-[rgba(100,160,255,0.08)] pt-8 sm:grid-cols-3">
            <div>
              <dt className={metaLabel}>Role</dt>
              <dd className="mt-1 text-sm text-star-cream">{project.role}</dd>
            </div>
            <div>
              <dt className={metaLabel}>Timeline</dt>
              <dd className="mt-1 text-sm text-star-cream">{project.timeline}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className={metaLabel}>Tools</dt>
              <dd className="mt-1 text-sm text-star-cream">
                {project.tools.join(" · ")}
              </dd>
            </div>
          </dl>

          {project.outcome ? (
            <p className="mt-8 rounded-2xl border border-[rgba(240,180,41,0.28)] bg-[rgba(240,180,41,0.06)] px-5 py-4 text-sm leading-relaxed text-cream-muted">
              <span className="font-semibold text-star-white">Outcome — </span>
              {project.outcome}
            </p>
          ) : null}

          {project.links?.length ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="inline-flex rounded-full border border-[rgba(100,160,255,0.25)] bg-[rgba(20,40,90,0.2)] px-4 py-2 text-sm font-semibold text-night-cerulean backdrop-blur-sm transition duration-200 hover:border-star-gold hover:text-star-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="mt-12 space-y-14">
          {project.sections.map((section) => (
            <section key={section.heading} className={`${glassCard} p-7 sm:p-8`}>
              <h2 className="font-display text-2xl text-star-white sm:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-cream-muted">
                {section.body}
              </p>
              {section.image ? (
                <figure className="mt-6 overflow-hidden rounded-2xl border border-[rgba(100,160,255,0.12)] bg-[rgba(10,11,26,0.4)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image}
                    alt={section.imageAlt ?? ""}
                    className="w-full object-cover"
                  />
                  {section.imageAlt ? (
                    <figcaption className="px-4 py-3 text-center text-xs text-cream-faint">
                      {section.imageAlt}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </section>
          ))}
        </div>

        <footer className={`${glassCard} mt-16 p-7 sm:p-8`}>
          <p className="text-sm font-medium text-cream-soft">
            Content for this case study lives in{" "}
            <code className="rounded border border-[rgba(100,160,255,0.12)] bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 text-star-cream">
              src/data/projects.ts
            </code>{" "}
            — edit the{" "}
            <code className="rounded border border-[rgba(100,160,255,0.12)] bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 text-star-cream">
              {project.id}
            </code>{" "}
            entry to update copy, links, and imagery paths.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                href={`/work/${prev.id}`}
                className={`group ${glassCard} block rounded-2xl p-4 transition duration-200 hover:border-[rgba(100,160,255,0.35)] sm:max-w-[48%]`}
              >
                <span className={metaLabel}>Previous</span>
                <span className="mt-1 block font-display text-lg text-star-white transition group-hover:text-night-cerulean">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/work/${next.id}`}
                className={`group ${glassCard} block rounded-2xl p-4 text-right transition duration-200 hover:border-[rgba(100,160,255,0.35)] sm:max-w-[48%]`}
              >
                <span className={metaLabel}>Next</span>
                <span className="mt-1 block font-display text-lg text-star-white transition group-hover:text-night-cerulean">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
          <Link
            href="/#work"
            className="mt-10 inline-flex text-sm font-semibold text-star-gold hover:underline"
          >
            ← All UX projects
          </Link>
        </footer>
      </div>
    </article>
  );
}
