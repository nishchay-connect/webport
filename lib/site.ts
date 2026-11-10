/** Personal details and profile links belong here, not scattered across components. */
export const site = {
  name: "Nishchay",
  fullName: "Nishchay",
  shortDescription:
    "A personal space for engineering, interdisciplinary exploration, and unanswered questions.",
  university: "Central University of Rajasthan",
  location: "India",
  // Replace null with your real values. Missing profiles render as honest placeholders.
  links: {
    github: null as string | null,
    linkedin: null as string | null,
    email: null as string | null,
  },
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/explore", label: "Explore" },
  { href: "/writing", label: "Writing" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/contact", label: "Contact" },
] as const;

export const explorationAreas = [
  {
    id: "01",
    name: "Artificial intelligence",
    kind: "Systems & intelligence",
    description:
      "Learning how models learn, reason, fail, and become useful in real settings—not just in a benchmark.",
    questions: ["What should be learned, and what should be designed?", "What makes an AI system reliable?"],
  },
  {
    id: "02",
    name: "Healthcare & biomedicine",
    kind: "Human-centered technology",
    description:
      "Interested in tools that improve access, context, and continuity without removing human judgment.",
    questions: ["What gets lost between first symptoms and proper care?", "Where can software actually help?"],
  },
  {
    id: "03",
    name: "Materials & nanotechnology",
    kind: "The physical frontier",
    description:
      "Curious about the behavior of materials, sensing mechanisms, and the engineering possibilities at small scales.",
    questions: ["How does a material become a sensor?", "Which properties matter outside the lab?"],
  },
  {
    id: "04",
    name: "Robotics & embodied systems",
    kind: "Intelligence in motion",
    description:
      "Exploring the intersection of perception, control, electronics, and the physical world.",
    questions: ["What changes when intelligence has a body?", "How do real environments challenge models?"],
  },
  {
    id: "05",
    name: "Biology & living systems",
    kind: "Complexity & life",
    description:
      "Looking at biological systems as scientific mysteries in their own right, not merely metaphors for computing.",
    questions: ["How does complexity produce robust behavior?", "What can engineering learn from life?"],
  },
  {
    id: "06",
    name: "Consciousness & philosophy",
    kind: "Questions beyond engineering",
    description:
      "Thoughts about memory, experience, existence, the nature of God, and what science may or may not explain.",
    questions: ["What is it like to know?", "Which questions can technology never settle alone?"],
  },
] as const;

export const initiatives = [
  {
    number: "01",
    title: "ENAC",
    subtitle: "Engineering community · CURAJ",
    description:
      "An initiative to connect students around engineering, technology, and collaborative exploration. The focus is on making it easier to learn, make, and exchange ideas together.",
    involvement: "Community building & organization",
    next: "Add events, photographs, team roles, and verified milestones.",
  },
  {
    number: "02",
    title: "B² Chess Club",
    subtitle: "Chess community · CURAJ",
    description:
      "A student community built around chess and the simple idea that a shared interest can bring people together. Organizing a space for play, learning, and competition is part of the work.",
    involvement: "Community building & events",
    next: "Add tournament archives, photographs, and event links.",
  },
] as const;
