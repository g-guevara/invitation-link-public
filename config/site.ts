export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recursos",
      href: "/docs",
    },


  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recursos",
      href: "/docs",
    },
  ],
  links: {
    github: "https://github.com/g-guevara",
    twitter: "https://www.linkedin.com/in/guillermo-guevara-585267294/",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
