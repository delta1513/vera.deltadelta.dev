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
    {
      name: "Money",
      emoji: "💰",
      url: "https://veras-money-game.deltadelta.workers.dev/",
      color: "#2fa86b",
    },
    {
      name: "Time",
      emoji: "🕰️",
      url: "https://veras-clock-and-calendar-app.deltadelta.workers.dev/",
      color: "#e8875f",
    },
    {
      name: "Earth",
      emoji: "🌍",
      url: "https://veras-google-earth-tours.deltadelta.workers.dev/",
      color: "#14a3a8",
    },
  ],
  [
    {
      name: "LLB",
      emoji: "🛍️",
      url: "https://www.llbean.ca/",
      color: "#2f6b4f",
    },
    {
      name: "Q",
      emoji: "🛍️",
      url: "https://www.quince.com/",
      color: "#c0568a",
    },
  ],
];
