export const navItems = [
  { id: "home", label: "خانه", href: "/" },
  {
    id: "videos",
    label: "ویدیوهای آموزشی",
    sub: [
      { label: "فیزیک", href: "/videos/physics" },
      { label: "توانمندی ذهن", href: "/videos/mindset" },
      { label: "ریاضی", href: "/videos/math" },
    ],
  },
  {
    id: "articles",
    label: "مقالات",
    sub: [
      { label: "فیزیک", href: "/articles/physics" },
      { label: "توانمندی ذهن", href: "/articles/mindset" },
      { label: "ریاضی", href: "/articles/math" },
    ],
  },
  { id: "free-videos", label: "ویدیوهای رایگان", href: "/videos/free" },
  { id: "about", label: "درباره من", href: "/aboutPage" },
];
