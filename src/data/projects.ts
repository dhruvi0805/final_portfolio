/**
 * Portfolio content — edit this file to update case studies, 3D reels, and metadata.
 * Images: add files under /public and reference as "/your-image.jpg"
 * Video: add MP4s under /public/videos and set videoPath (e.g. "/videos/reel.mp4")
 */

export type CaseStudySection = {
  heading: string;
  body: string;
  /** Optional image path in /public */
  image?: string;
  imageAlt?: string;
};

export type UXProject = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  timeline: string;
  tools: string[];
  outcome?: string;
  heroGradient?: string;
  sections: CaseStudySection[];
  links?: { label: string; href: string }[];
};

export type AnimationProject = {
  id: string;
  title: string;
  brief: string;
  /** Path under public, e.g. /videos/clip.mp4 */
  videoPath: string;
};

export const uxProjects: UXProject[] = [
  {
    id: "funnymoney",
    title: "FunnyMoney",
    subtitle: "Making household budgeting feel human, not punitive.",
    summary:
      "A mobile-first budgeting flow that uses progressive disclosure and playful microcopy to reduce anxiety around spending.",
    role: "Lead UX · Research · Prototyping",
    timeline: "12 weeks",
    tools: ["Figma", "Maze", "Principle", "Notion"],
    outcome:
      "Task success on “set a weekly limit” rose in moderated tests; users described the tone as “relieving” versus competitor apps.",
    sections: [
      {
        heading: "Problem",
        body: "Young renters avoided budgeting apps that felt like scolding dashboards. The team needed a trustworthy voice and a gentler first-run experience.",
      },
      {
        heading: "Research",
        body: "Eight diary studies and a competitive audit surfaced three emotional blockers: shame, unpredictability, and jargon. I translated these into design principles: clarity, control, and warmth.",
      },
      {
        heading: "Design decisions",
        body: "I collapsed account linking into a three-step narrative, introduced contextual education at the moment of input, and paired high-contrast type with soft sage accents for AA contrast on off-white.",
      },
      {
        heading: "Validation",
        body: "Iterative prototype tests in Maze showed fewer drop-offs when limits were framed as “guides” rather than “caps.” Final specs included motion notes for Framer-style spring transitions.",
      },
    ],
    links: [
      { label: "Prototype deck", href: "#" },
      { label: "Research summary", href: "#" },
    ],
  },
  {
    id: "thrive",
    title: "Thrive",
    subtitle: "Habit coaching for neurodivergent students.",
    summary:
      "A companion app that adapts reminders and pacing to energy levels, grounded in co-design sessions with students.",
    role: "UX Research · IA · UI Systems",
    timeline: "10 weeks",
    tools: ["Figma", "FigJam", "Dovetail", "Loom"],
    sections: [
      {
        heading: "Context",
        body: "Thrive targeted commuter students juggling work and coursework. Existing habit apps assumed rigid streaks, which increased guilt rather than motivation.",
      },
      {
        heading: "Co-design",
        body: "Workshops with six participants produced “energy-aware” scheduling: users pick a daily capacity band, and the product suggests one meaningful action instead of a long checklist.",
      },
      {
        heading: "System",
        body: "I defined a modular card system with consistent tap targets, a cobalt accent for actions, and lilac for reflective prompts to separate “do” from “think.”",
      },
      {
        heading: "Outcome",
        body: "Pilot usability sessions showed faster orientation to the home screen and high comprehension of the capacity metaphor without onboarding tooltips.",
      },
    ],
  },
  {
    id: "wayfinding",
    title: "Wayfinding",
    subtitle: "Campus navigation that respects cognitive load.",
    summary:
      "Signage and digital wayfinding aligned to a single mental model: landmarks first, then paths, then room numbers.",
    role: "Service mapping · UX Writing · Visual specs",
    timeline: "6 weeks",
    tools: ["Illustrator", "Figma", "Miro"],
    sections: [
      {
        heading: "Discovery",
        body: "Observational walks and intercept interviews revealed split attention between phone maps and physical signs. Visitors wanted reassurance, not more data.",
      },
      {
        heading: "Information architecture",
        body: "I reframed hierarchy around three anchors per intersection: You are here, next landmark, estimated time. Digital screens mirrored the physical color bands for cross-channel consistency.",
      },
      {
        heading: "Accessibility",
        body: "Specs included minimum type scales, non-color cues for routes, and audio-friendly descriptions for the companion mobile page.",
      },
    ],
  },
  {
    id: "researchgate",
    title: "ResearchGate",
    subtitle: "Scholarly discovery without the clutter.",
    summary:
      "A desktop exploration that simplifies literature triage through scannable metadata, saved searches, and respectful density.",
    role: "Product UX · Interaction design",
    timeline: "8 weeks",
    tools: ["Figma", "Hotjar", "Sheets"],
    sections: [
      {
        heading: "Hypothesis",
        body: "Researchers abandon results pages when abstracts compete with ads and noisy sidebars. A calmer reading column should improve scan speed.",
      },
      {
        heading: "Interaction model",
        body: "I prototyped a two-pane layout: a narrow filter rail with persistent scope, and a reading stack with expandable citations. Keyboard shortcuts mirrored common reference managers.",
      },
      {
        heading: "Measurement plan",
        body: "Success metrics paired qualitative codes (confidence in source quality) with behavioral proxies (time to open three relevant papers).",
      },
    ],
  },
];

export const animationProjects: AnimationProject[] = [
  {
    id: "reel-aurora",
    title: "Aurora Drift",
    brief: "Soft volumetric lighting study — loopable hero motion for a climate-tech landing page.",
    videoPath: "/videos/placeholder-1.mp4",
  },
  {
    id: "reel-terra",
    title: "Terra Form",
    brief: "Hard-surface product spin with tactile pause frames for social cutdowns.",
    videoPath: "/videos/placeholder-2.mp4",
  },
  {
    id: "reel-liquify",
    title: "Liquify Bloom",
    brief: "Organic morph inspired by impasto strokes; explores brand motion language.",
    videoPath: "/videos/placeholder-3.mp4",
  },
];

export function getUxProjectById(id: string): UXProject | undefined {
  return uxProjects.find((p) => p.id === id);
}

export function getAllUxProjectIds(): string[] {
  return uxProjects.map((p) => p.id);
}
