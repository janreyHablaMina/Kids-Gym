export type Activity = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  ageRange: string;
  duration: string;
  image: string;
  color: string;
  learningPoints: string[];
};

export const activities: Activity[] = [
  {
    id: "act-1",
    slug: "kids-gymnastics",
    title: "Kids Gymnastics",
    shortDescription: "Build balance, strength, and confidence.",
    description: "Build balance, strength, coordination and confidence through fun movement activities designed for growing bodies.",
    ageRange: "5-10 yrs",
    duration: "45 mins",
    image: "/images/gymnastics.jpg",
    color: "#F472B6", // Pink
    learningPoints: ["Balance", "Coordination", "Strength", "Confidence", "Teamwork"],
  },
  {
    id: "act-2",
    slug: "ninja-training",
    title: "Ninja Training",
    shortDescription: "Obstacle courses and agility training.",
    description: "Navigate safe, padded obstacle courses to build agility, speed, and problem-solving skills.",
    ageRange: "6-12 yrs",
    duration: "60 mins",
    image: "/images/ninja.jpg",
    color: "#60A5FA", // Blue
    learningPoints: ["Agility", "Speed", "Problem Solving", "Focus", "Resilience"],
  },
  {
    id: "act-3",
    slug: "indoor-play",
    title: "Indoor Play",
    shortDescription: "Free exploration in a safe padded environment.",
    description: "Unstructured free play time in our massive indoor padded playground to encourage imagination and social interaction.",
    ageRange: "All Ages",
    duration: "120 mins",
    image: "/images/play.jpg",
    color: "#34D399", // Green
    learningPoints: ["Social Skills", "Imagination", "Motor Skills", "Sharing", "Active Play"],
  },
  {
    id: "act-4",
    slug: "dance-movement",
    title: "Dance & Movement",
    shortDescription: "Rhythm, music, and creative expression.",
    description: "Express creativity and learn rhythm through guided dance routines to popular kid-friendly music.",
    ageRange: "4-8 yrs",
    duration: "45 mins",
    image: "/images/dance.jpg",
    color: "#8B5CF6", // Purple
    learningPoints: ["Rhythm", "Self-Expression", "Coordination", "Listening Skills"],
  },
];
