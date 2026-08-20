import fs from "node:fs";
import path from "node:path";

const key = String(process.env.INDEXNOW_KEY ?? "").trim();

if (!key) {
  console.warn("INDEXNOW_KEY is not set. Skipping IndexNow verification file generation.");
  process.exit(0);
}

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  console.error(
    "INDEXNOW_KEY must be 8–128 characters and contain only letters, numbers, or hyphens."
  );
  process.exit(1);
}

const publicDir = path.resolve("public");
fs.mkdirSync(publicDir, { recursive: true });

const outputFile = path.join(publicDir, `${key}.txt`);
fs.writeFileSync(outputFile, key, "utf8");

console.log(`Generated IndexNow verification file: public/${key}.txt`);
