import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COOKIES_FILE = path.join(__dirname, "turo_session.json");

console.log("Opening Turo login page...");
const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://turo.com/login");
console.log("Please log in to Turo in the browser window that just opened.");
console.log("Waiting up to 2 minutes...");

try {
  await page.waitForURL("**/search**", { timeout: 120000 });
} catch {}
try {
  await page.waitForURL("**/dashboard**", { timeout: 5000 });
} catch {}

const cookies = await context.cookies();
fs.writeFileSync(COOKIES_FILE, JSON.stringify(cookies, null, 2));
console.log("Session saved! You can close this terminal.");
await browser.close();
