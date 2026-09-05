export type Session = {
  id: string;
  activityId: string;
  activityTitle: string;
  date: string; // ISO format or simple string
  time: string;
  spotsTotal: number;
  spotsFilled: number;
};

export const upcomingSessions: Session[] = [
  {
    id: "sess-1",
    activityId: "act-1",
    activityTitle: "Kids Gymnastics",
    date: "2026-09-12",
    time: "10:30 AM",
    spotsTotal: 15,
    spotsFilled: 9,
  },
  {
    id: "sess-2",
    activityId: "act-1",
    activityTitle: "Kids Gymnastics",
    date: "2026-09-12",
    time: "2:00 PM",
    spotsTotal: 15,
    spotsFilled: 15,
  },
  {
    id: "sess-3",
    activityId: "act-2",
    activityTitle: "Ninja Training",
    date: "2026-09-12",
    time: "1:00 PM",
    spotsTotal: 12,
    spotsFilled: 8,
  },
  {
    id: "sess-4",
    activityId: "act-4",
    activityTitle: "Dance & Movement",
    date: "2026-09-13",
    time: "9:00 AM",
    spotsTotal: 20,
    spotsFilled: 5,
  },
];
