export const sectionFade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const cardFade = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};
