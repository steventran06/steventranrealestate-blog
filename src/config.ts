import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://steventranrealestate.com",
  author: "Steven Tran",
  desc: "Portland Metro and Southwest Washington real estate insights, relocation guides, market updates, homebuyer resources, new construction, and investing information from Steven Tran.",
  title: "Steven Tran Real Estate Blog",
  ogImage: "linkpreview.png",
  lightAndDarkMode: false,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000,
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-US"],
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
    href: "https://www.instagram.com/steventranpdx",
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
