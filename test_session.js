import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COOKIES_FILE = path.join(__dirname, "turo_session.json");

const browser = await chromium.launch({ headless: false, args: ["--start-minimized"] });
const context = await browser.newContext({
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
});

const cookies = JSON.parse(fs.readFileSync(COOKIES_FILE, "utf8"));
await context.addCookies(cookies);

const page = await context.newPage();
await page.goto("https://turo.com/us/en/host/trips");
await page.waitForLoadState("networkidle");

const url = page.url();
const text = await page.evaluate(() => document.body.innerText?.slice(0, 2000));

console.log("=== FINAL URL ===");
console.log(url);
console.log("\n=== PAGE TEXT ===");
console.log(text);

await browser.close();
