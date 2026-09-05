export type Child = {
  id: string;
  name: string;
  age: number;
  avatarEmoji: string;
  favoriteColor: string;
};

export const mockChildren: Child[] = [
  {
    id: "child-1",
    name: "Emma",
    age: 6,
    avatarEmoji: "👧",
    favoriteColor: "#F472B6", // Pink
  },
  {
    id: "child-2",
    name: "Lucas",
    age: 8,
    avatarEmoji: "👦",
    favoriteColor: "#34D399", // Green
  },
  {
    id: "child-3",
    name: "Mia",
    age: 4,
    avatarEmoji: "🧒",
    favoriteColor: "#8B5CF6", // Purple
  },
];
