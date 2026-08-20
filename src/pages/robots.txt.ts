import type { APIRoute } from "astro";
import { SITE } from "../config";

export const GET: APIRoute = () => {
  const siteUrl = SITE.website.replace(/\/$/, "");

  const body = `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
