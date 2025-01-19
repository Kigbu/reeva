export interface Post {
  userName: string;
  readMins: number;
  category: string;
  body: string;
  likes: number;
  comments: number;
  images: any[];
  isDymamic?: boolean;
}

export const post_default_data: Post[] = [
  {
    userName: "@Fvivian",
    readMins: 3,
    category: "Fitness",
    body: `A big shoutout to all the jollof rice lovers who know that Nigerian jollof reigns supreme! While others may have their own taste preferences, we proudly claim our jollof as the king of flavors! 🍚👑`,
    likes: 37,
    comments: 12,
    images: ["02", "03", "01"],
  },
  {
    userName: "@Fvivian",
    readMins: 5,
    category: "Fitness",
    body: `You’ll soon also be paid for ads appearing  when others view your profile page, how to approximately double payouts`,
    likes: 18,
    comments: 8,
    images: ["04", "01", "02"],
  },
  {
    userName: "@Fvivian",
    readMins: 2,
    category: "Banter",
    body: `You’ll soon also be paid for ads appearing  when others view your profile page, how to approximately double payouts`,
    likes: 22,
    comments: 5,
    images: ["03", "02", "04"],
  },
];
