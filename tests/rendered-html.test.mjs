import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilhar-estetica-automotiva.netlify.app";
const html = await readFile(new URL("index.html", output), "utf8");

test("exports the original sections and commercial contacts", () => {
  for (const id of ["inicio", "sobre", "servicos", "ppf", "demais-servicos", "duvidas", "contato"]) {
    assert.ok(html.includes(`id="${id}"`), `Missing section: ${id}`);
  }
  for (const value of ["SEU CARRO.", "BEM CUIDADO.", "5566996919667", "brilharfinanceiro@gmail.com", "brilhar.estetica.automotiva"]) {
    assert.ok(html.includes(value), `Missing content: ${value}`);
  }
});

test("canonical and structured data use the current domain", () => {
  assert.ok(html.includes(`rel="canonical" href="${site}"`));
  assert.ok(html.includes(`property="og:url" content="${site}"`));
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(data.url, site);
  assert.equal(data.telephone, "+55 66 99691-9667");
  assert.ok(!html.includes("chatgpt.site"));
  assert.ok(!html.includes("codex-preview"));
});

test("exports robots, sitemap and a static 404 page", async () => {
  for (const file of ["robots.txt", "sitemap.xml"]) {
    const content = await readFile(new URL(file, output), "utf8");
    assert.ok(content.includes(site));
    assert.ok(!content.includes("chatgpt.site"));
  }
  await access(new URL("404.html", output));
});

test("all referenced local images, scripts, styles and CSS assets exist", async () => {
  const assets = [...html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)]
    .map((match) => match[1]).filter((path) => /\.(?:png|jpg|webp|svg|js|css|woff2)$/.test(path));
  assert.ok(assets.some((path) => path.endsWith(".js")));
  assert.ok(assets.some((path) => path.endsWith(".css")));
  for (const path of new Set(assets)) {
    await access(new URL(`.${path}`, output));
    if (path.endsWith(".css")) {
      const cssUrl = new URL(`.${path}`, output);
      const css = await readFile(cssUrl, "utf8");
      for (const [, asset] of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
        if (/^(?:data:|https?:)/.test(asset)) continue;
        await access(asset.startsWith("/") ? new URL(`.${asset}`, output) : new URL(asset, cssUrl));
      }
    }
  }
});
