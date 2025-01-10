export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Link Invitación",
  description: "Crea una pagina web con Guillermo Guevara.",
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
    {
      label: "-",
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
