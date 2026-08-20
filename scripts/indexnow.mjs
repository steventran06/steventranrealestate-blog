const BRAND_SITES = {
  "steven-tran": "https://blog.steventranrealestate.com",
  "portland-home-guide": "https://articles.portlandhomeguide.com",
};

function resolveBrandId(value) {
  const normalized = String(value ?? "").trim().toLowerCase();

  if (
    normalized === "portland-home-guide" ||
    normalized === "portlandhomeguide" ||
    normalized === "phg"
  ) {
    return "portland-home-guide";
  }

  return "steven-tran";
}

const brandId = resolveBrandId(process.env.SITE_BRAND);
const siteUrl = BRAND_SITES[brandId];
const host = new URL(siteUrl).hostname;
const key = String(process.env.INDEXNOW_KEY ?? "").trim();

if (!key) {
  console.error("Missing INDEXNOW_KEY");
  process.exit(1);
}

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  console.error("Invalid INDEXNOW_KEY. Expected 8–128 letters, numbers, or hyphens.");
  process.exit(1);
}

const args = process.argv.slice(2);

if (!args.length) {
  console.error(`No URLs supplied.\n\nExamples:\n  npm run indexnow -- /posts/example/\n  npm run indexnow:portland-home-guide -- /posts/example/`);
  process.exit(1);
}

function normalizeUrl(value) {
  const url =
    value.startsWith("http://") || value.startsWith("https://")
      ? new URL(value)
      : new URL(value.startsWith("/") ? value : `/${value}`, `${siteUrl}/`);

  if (url.hostname !== host) {
    throw new Error(`URL must belong to ${host}: ${url.href}`);
  }

  url.hash = "";
  return url.href;
}

let urls;
try {
  urls = [...new Set(args.map(normalizeUrl))];
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

if (urls.length > 10000) {
  console.error("IndexNow allows at most 10,000 URLs per request.");
  process.exit(1);
}

const payload = {
  host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls,
};

console.log(`SITE_BRAND: ${brandId}`);
console.log(`IndexNow host: ${host}`);
for (const url of urls) console.log(`Submitting: ${url}`);

try {
  const response = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`IndexNow failed: HTTP ${response.status}${body ? `\n${body}` : ""}`);
    process.exit(1);
  }

  console.log(`IndexNow accepted ${urls.length} URL(s). HTTP ${response.status}`);
} catch (error) {
  console.error("IndexNow request failed:", error);
  process.exit(1);
}
