// Design tokens — single source of truth for components that need raw values
// (e.g., inline SVG attributes). UI components should prefer Tailwind utilities
// (bg-ink, text-sage, etc.) which read these via @theme in globals.css.

export const tokens = {
  color: {
    ink: "#15201C",
    paper: "#F4F1EA",
    sage: "#5C7A6E",
    sageSoft: "#E3E8E1",
    muted: "#6B7670",
    line: "#E0DDD3",
    surface: "#FFFFFF",
    ink2: "#1A2622",
    ink3: "#2C3A35",
    mist1: "#A8C0B4",
    mist2: "#9BA89F",
    mist3: "#C9D2C8",
    mist4: "#D8DDD8",
    mist5: "#7A8A82",
  },
  ease: {
    quart: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  },
} as const;

export type Tokens = typeof tokens;
