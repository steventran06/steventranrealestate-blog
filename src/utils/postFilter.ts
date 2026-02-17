import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const PACIFIC_TZ = "America/Los_Angeles";

const nowPacific = () => {
  const now = new Date();
  return new Date(
    now.toLocaleString("en-US", { timeZone: PACIFIC_TZ })
  ).getTime();
};

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const publishTime = new Date(data.pubDatetime).getTime();

  const isPublishTimePassed =
    nowPacific() >
    publishTime - SITE.scheduledPostMargin;

  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};


export default postFilter;
