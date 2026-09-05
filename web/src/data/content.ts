export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "What ages can attend PlayNest?",
    answer: "PlayNest Kids is designed for children ages 1 to 12. We have specific zones and structured activities tailored for different age groups to ensure safe and engaging play.",
  },
  {
    id: "faq-2",
    question: "Do I need to book in advance?",
    answer: "Yes, to ensure a safe and uncrowded environment, we require all open play sessions and structured classes to be booked in advance through our website or mobile app.",
  },
  {
    id: "faq-3",
    question: "What should my child wear?",
    answer: "Children should wear comfortable athletic clothing (t-shirts, leggings, sweatpants). For hygiene and safety, grip socks are required in all play zones. You can bring your own or purchase them at the front desk.",
  },
  {
    id: "faq-4",
    question: "Do parents need to stay?",
    answer: "For open play and most classes, parents are required to stay in the facility. We have a comfortable parent lounge with free Wi-Fi and coffee with full visibility of the play areas.",
  },
];

export type Testimonial = {
  id: string;
  text: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    text: "Emma absolutely loves gymnastics at PlayNest. She looks forward to it every weekend! The coaches are incredible and the facility is spotless.",
    author: "Sarah M.",
    role: "Parent of 6yo",
  },
  {
    id: "test-2",
    text: "The Ninja Training class gave my son so much confidence. It's the only place he can safely burn off all that energy!",
    author: "David L.",
    role: "Parent of 8yo",
  },
  {
    id: "test-3",
    text: "Best birthday party venue we've ever used. The staff handled everything, and the kids were exhausted (in a good way) by the end.",
    author: "Jessica T.",
    role: "Parent of 5yo",
  },
];
