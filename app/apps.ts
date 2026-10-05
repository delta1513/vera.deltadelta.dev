export type VeraApp = {
  /** One simple word. It is shown under the icon. */
  name: string;
  emoji: string;
  url: string;
  /** Background color of the icon. */
  color: string;
};

/** Each inner list is one screen, in order. Apps appear in the order listed. */
export const screens: VeraApp[][] = [
  [
    {
      name: "Spelling",
      emoji: "🐝",
      url: "https://veras-spelling-bee.deltadelta.workers.dev/",
      color: "#f5b82e",
    },
    {
      name: "Counting",
      emoji: "🔢",
      url: "https://veras-counting-challenge.deltadelta.workers.dev/",
      color: "#3f9bf0",
    },
  ],
];
