import type { Site } from "./types";
import { loadBrand } from "./brands";

export const BRAND = loadBrand();
export const IS_PORTLAND_HOME_GUIDE = BRAND.id === "portland-home-guide";

export const SITE: Site = {
  website: BRAND.website,
  author: BRAND.author,
  desc: BRAND.description,
  title: BRAND.blogTitle,
  ogImage: BRAND.ogImage,
  lightAndDarkMode: false,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000,
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-US"],
} as const;

export const LOGO_IMAGE = {
  enable: Boolean(BRAND.logo),
  svg: false,
  width: 216,
  height: 46,
};

export const SOCIALS = BRAND.socials;
