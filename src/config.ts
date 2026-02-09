import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://steventranrealestate.com", // replace this with your deployed domain
  author: "Steven Tran",
  desc: "Serving Portland Metro and Southwest Washington. First-time buyers, move-up buyers, and real estate investors—plus a free Portland Relocation Guide.",
  title: "Blog | Oregon & Washington Real Estate Broker | Steven Tran",
  ogImage: "linkpreview.png",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: false,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/StevenTranPDXRealtor/",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/stevenanquan",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/steventran06/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@steventran_pdxrealtor",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@steventran_pdxrealtor",
    linkTitle: `${SITE.title} on TikTok`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:steven@diverserg.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
