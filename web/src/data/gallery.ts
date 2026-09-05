export type GalleryImage = {
  id: string;
  url: string;
  title: string;
  category: "indoor-play" | "gymnastics" | "ninja" | "dance" | "toddler";
};

export const gallery: GalleryImage[] = [
  {
    id: "g-1",
    url: "/images/gymnastics.jpg",
    title: "Kids Gymnastics Class",
    category: "gymnastics",
  },
  {
    id: "g-2",
    url: "/images/ninja.jpg",
    title: "Ninja Obstacle Course",
    category: "ninja",
  },
  {
    id: "g-3",
    url: "/images/play.jpg",
    title: "Main Padded Playground",
    category: "indoor-play",
  },
  {
    id: "g-4",
    url: "/images/dance.jpg",
    title: "Dance Movement Rhythm",
    category: "dance",
  },
  {
    id: "g-5",
    url: "/images/play.jpg",
    title: "Toddler Zone",
    category: "toddler",
  },
  {
    id: "g-6",
    url: "/images/hero.jpg",
    title: "Making Friends",
    category: "indoor-play",
  },
  {
    id: "g-7",
    url: "/images/gymnastics.jpg",
    title: "Balance Beam Practice",
    category: "gymnastics",
  },
  {
    id: "g-8",
    url: "/images/ninja.jpg",
    title: "Climbing Wall",
    category: "ninja",
  }
];
