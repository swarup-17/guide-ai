import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "guide-ai", // Unique app ID
  name: "Career Guide",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
