export type DayEntry = {
  date: string;
  title: string;
  text: string;
  placeholder?: boolean;
};

export const days: DayEntry[] = [
  {
    date: "2026-11-17",
    title: "A new chapter",
    text: "Replace this sample with a real moment, milestone, or thought from your day.",
    placeholder: true,
  },
  {
    date: "2026-11-10",
    title: "Learning in progress",
    text: "Use this entry to share something you learned or made progress on.",
    placeholder: true,
  },
  {
    date: "2026-11-03",
    title: "A small win",
    text: "Add a short note about a real project update, idea, or everyday highlight.",
    placeholder: true,
  },
];
