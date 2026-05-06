/**
 * Site-wide copy and links — edit here to update the nav, resume, and contact.
 */
export const site = {
  name: "Dhruvi Malusare",
  /** First word(s) of name for logo split — rest renders in gold italic */
  logoNameParts: ["Dhruvi", " Malusare"] as const,
  title: "UX Designer · Creative Technologist",
  heroLabel: "UX Designer & Creative Technologist",
  /** Last line of hero name (italic accent) */
  heroNameAccent: "Malusare.",
  tagline:
    "I craft calm, legible experiences where research, interaction, and motion meet.",
  heroRole:
    "Crafting interfaces that feel intentional, read clearly, and respect real people.",
  availabilityTitle: "Currently available",
  availabilitySubtitle: "Open to UX & product design opportunities",
  heroStats: [
    { value: "4", label: "UX Projects" },
    { value: "3", label: "Motion Reels" },
    { value: "IS117", label: "Portfolio" },
    { value: "NJIT", label: "Coursework" },
  ] as const,
  email: "hello@example.com",
  resumeUrl: "https://example.com/resume.pdf",
  linkedinUrl: "https://www.linkedin.com/",
  aboutParagraphs: [
    "I'm a UX designer focused on research-backed flows, accessible UI, and motion that supports comprehension—not decoration for its own sake.",
    "Based in the NJIT / New Jersey area; open to internships, collaborative class projects, and roles where I can keep sharpening systems thinking and craft.",
  ] as const,
  aboutHeadlineLead: "I think in ",
  aboutHeadlineEm1: "systems,",
  aboutHeadlineMid: " design in ",
  aboutHeadlineEm2: "stories.",
  skills: [
    "UX Research",
    "Product Design",
    "Prototyping",
    "Figma",
    "Accessibility",
    "Motion Design",
    "User Testing",
    "Information Architecture",
  ] as const,
  recognitionHeading: "Recognition & experience",
  timelineItems: [
    {
      icon: "star" as const,
      title: "UX Portfolio — IS117",
      org: "NJIT · 2025–2026",
    },
    {
      icon: "star" as const,
      title: "Case studies & motion reels",
      org: "Personal work · ongoing",
    },
    {
      icon: "diamond" as const,
      title: "Human-centered design focus",
      org: "Course projects · multiple",
    },
    {
      icon: "diamond" as const,
      title: "B.S. in progress",
      org: "New Jersey Institute of Technology",
    },
  ],
  contactPre: "04 — Contact",
  contactTitleLines: ["Let's build", "something", "together."] as const,
  contactTitleEmphasis: "something",
  contactSub:
    "Reach out for collaborations, feedback on this portfolio, or internship conversations.",
} as const;
