import type { SocialObjects } from "./types";

export type BrandId = "steven-tran" | "portland-home-guide";

export type BlogBrand = {
  id: BrandId;
  siteName: string;
  blogTitle: string;
  description: string;
  author: string;
  website: string;
  mainSiteUrl: string;
  communitiesUrl: string;
  relocationUrl: string;
  helpUrl: string;
  helpLabel: string;
  externalAboutUrl: string;
  externalAboutLabel: string;
  headerMainLabel: string;
  headerCtaLabel: string;
  headerCtaUrl: string;
  contentEyebrow: string;
  articleEyebrow: string;
  brandName: string;
  brandSubtitle: string;
  logo?: string;
  logoAlt?: string;
  favicon: string;
  ogImage: string;
  footerDescription: string;
  footerDescriptor: string;
  analyticsId?: string;
  socials: SocialObjects;
};

const STEVEN_SOCIALS: SocialObjects = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/StevenTranPDXRealtor/",
    linkTitle: "Steven Tran Real Estate Blog on Facebook",
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/steventranpdx",
    linkTitle: "Steven Tran Real Estate Blog on Instagram",
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/steventran06/",
    linkTitle: "Steven Tran Real Estate Blog on LinkedIn",
    active: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@steventran_pdxrealtor",
    linkTitle: "Steven Tran Real Estate Blog on YouTube",
    active: true,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@steventran_pdxrealtor",
    linkTitle: "Steven Tran Real Estate Blog on TikTok",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:steven@diverserg.com",
    linkTitle: "Send Steven Tran an email",
    active: true,
  },
];

export const BRANDS: Record<BrandId, BlogBrand> = {
  "steven-tran": {
    id: "steven-tran",
    siteName: "Steven Tran Real Estate Blog",
    blogTitle: "Steven Tran Real Estate Blog",
    description:
      "Portland Metro and Southwest Washington real estate insights, relocation guides, market updates, homebuyer resources, new construction, and investing information from Steven Tran.",
    author: "Steven Tran",
    website: "https://steventranrealestate.com",
    analyticsId: "G-PCBBTVNK95",
    mainSiteUrl: "https://steventranrealestate.com/",
    communitiesUrl: "https://steventranrealestate.com/communities/",
    relocationUrl: "https://steventranrealestate.com?section=relocate",
    helpUrl: "https://calendly.com/steven-diverserg/new-meeting",
    helpLabel: "Schedule a Call",
    externalAboutUrl: "https://steventranrealestate.com/",
    externalAboutLabel: "Visit My Real Estate Site",
    headerMainLabel: "Real Estate",
    headerCtaLabel: "Schedule a Call",
    headerCtaUrl: "https://calendly.com/steven-diverserg/new-meeting",
    contentEyebrow: "Steven Tran Real Estate",
    articleEyebrow: "Portland Metro Real Estate",
    brandName: "Steven Tran Real Estate",
    brandSubtitle: "Real Estate Blog",
    logo: "/assets/steventranlogo.png",
    footerLogo: "/assets/steventranlogo.png",
    logoAlt: "Steven Tran Real Estate",
    favicon: "/favicon.ico",
    ogImage: "linkpreview.png",
    footerDescription:
      "Oregon & Washington real estate broker serving Portland Metro and Southwest Washington.",
    footerDescriptor: "Oregon & Washington Real Estate Broker",
    socials: STEVEN_SOCIALS,
  },
  "portland-home-guide": {
    id: "portland-home-guide",
    siteName: "Portland Home Guide Blog",
    blogTitle: "Portland Home Guide Blog",
    description:
      "Long-form Portland Metro and Southwest Washington housing research, relocation guides, community comparisons, market explainers and practical home-buying context from Portland Home Guide.",
    author: "Steven Tran",
    website: "https://portlandhomeguide.com",
    analyticsId: "G-BPCRJJ02BR",
    mainSiteUrl: "https://portlandhomeguide.com/",
    communitiesUrl: "https://portlandhomeguide.com/communities/",
    relocationUrl: "https://portlandhomeguide.com?section=relocate",
    helpUrl: "https://calendly.com/steven-diverserg/new-meeting",
    helpLabel: "Get Local Help",
    externalAboutUrl: "https://steventranrealestate.com/",
    externalAboutLabel: "About Steven Tran",
    headerMainLabel: "Home Guide",
    headerCtaLabel: "Explore Home Guide",
    headerCtaUrl: "https://portlandhomeguide.com/",
    contentEyebrow: "Portland Home Guide",
    articleEyebrow: "Portland Home Guide Research",
    brandName: "Portland Home Guide",
    brandSubtitle: "Market Insights & Articles",
    logo: "/assets/portland-home-guide-logo.png",
    footerLogo: "/assets/portland-home-guide-logo-gray.png",
    favicon: "/portlandhomeguide-favicon.ico",
    ogImage: "assets/portlandhomeguidelinkpreview.png.png",
    footerDescription:
      "Research-first Portland Metro and Southwest Washington housing guides, relocation resources and local market context.",
    footerDescriptor: "Portland Metro Housing Research & Local Guides",
    socials: [],
  },
};

export function resolveBrandId(value?: string): BrandId {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();

  if (
    normalized === "portland-home-guide" ||
    normalized === "portlandhomeguide" ||
    normalized === "phg"
  ) {
    return "portland-home-guide";
  }

  return "steven-tran";
}

export function loadBrand(): BlogBrand {
  const runtime = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };
  const env = runtime.process?.env ?? {};

  const id = resolveBrandId(env.SITE_BRAND);
  const base = BRANDS[id];
  const siteUrl = String(env.SITE_URL ?? "").trim();
  const analyticsId = String(env.SITE_GA_ID ?? "").trim();

  return {
    ...base,
    website: siteUrl || base.website,
    analyticsId: analyticsId || base.analyticsId,
  };
}
