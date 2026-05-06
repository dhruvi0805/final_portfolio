import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllUxProjectIds,
  getUxProjectById,
  uxProjects,
} from "@/data/projects";
import { site } from "@/data/site";

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
    <article className="bg-impasto-vibrant pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm text-canvas-ink/65">
            <li>
              <Link href="/" className="hover:text-canvas-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#work" className="hover:text-canvas-ink">
                Work
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-canvas-ink">{project.title}</li>
          </ol>
        </nav>

        <header className="glass-surface-strong mt-10 rounded-3xl p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cobalt">
            Case study
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-canvas-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-canvas-ink/80">{project.subtitle}</p>
          <p className="mt-6 text-base leading-relaxed text-canvas-ink/85">
            {project.summary}
          </p>

          <dl className="mt-8 grid gap-4 border-t border-canvas-ink/10 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-canvas-ink/55">
                Role
              </dt>
              <dd className="mt-1 text-sm text-canvas-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-canvas-ink/55">
                Timeline
              </dt>
              <dd className="mt-1 text-sm text-canvas-ink">
                {project.timeline}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-xs font-semibold uppercase tracking-wide text-canvas-ink/55">
                Tools
              </dt>
              <dd className="mt-1 text-sm text-canvas-ink">
                {project.tools.join(" · ")}
              </dd>
            </div>
          </dl>

          {project.outcome ? (
            <p className="mt-8 rounded-2xl border border-sage/40 bg-sage/10 px-5 py-4 text-sm leading-relaxed text-canvas-ink">
              <span className="font-semibold text-canvas-ink">Outcome — </span>
              {project.outcome}
            </p>
          ) : null}

          {project.links?.length ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="glass-surface inline-flex rounded-full px-4 py-2 text-sm font-semibold text-cobalt transition duration-200 hover:border-cobalt/40"
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
            <section key={section.heading} className="glass-surface rounded-3xl p-7 sm:p-8">
              <h2 className="font-display text-2xl text-canvas-ink sm:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-canvas-ink/85">
                {section.body}
              </p>
              {section.image ? (
                <figure className="mt-6 overflow-hidden rounded-2xl border border-canvas-ink/10 bg-canvas-ink/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image}
                    alt={section.imageAlt ?? ""}
                    className="w-full object-cover"
                  />
                  {section.imageAlt ? (
                    <figcaption className="px-4 py-3 text-center text-xs text-canvas-ink/65">
                      {section.imageAlt}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </section>
          ))}
        </div>

        <footer className="glass-surface mt-16 rounded-3xl p-7 sm:p-8">
          <p className="text-sm font-medium text-canvas-ink/70">
            Content for this case study lives in{" "}
            <code className="rounded bg-canvas-ink/5 px-1.5 py-0.5 text-canvas-ink">
              src/data/projects.ts
            </code>{" "}
            — edit the{" "}
            <code className="rounded bg-canvas-ink/5 px-1.5 py-0.5 text-canvas-ink">
              {project.id}
            </code>{" "}
            entry to update copy, links, and imagery paths.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                href={`/work/${prev.id}`}
                className="group glass-surface rounded-2xl p-4 transition duration-200 hover:border-cobalt/35 sm:max-w-[48%]"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-canvas-ink/55">
                  Previous
                </span>
                <span className="mt-1 block font-display text-lg text-canvas-ink group-hover:text-cobalt">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/work/${next.id}`}
                className="group glass-surface rounded-2xl p-4 text-right transition duration-200 hover:border-cobalt/35 sm:max-w-[48%]"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-canvas-ink/55">
                  Next
                </span>
                <span className="mt-1 block font-display text-lg text-canvas-ink group-hover:text-cobalt">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
          <Link
            href="/#work"
            className="mt-10 inline-flex text-sm font-semibold text-cobalt hover:underline"
          >
            ← All UX projects
          </Link>
        </footer>
      </div>
    </article>
  );
}
