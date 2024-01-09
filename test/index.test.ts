import { expect, test } from "vitest";
import { transform } from "../src";

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const randomPort = () => random(0, 65535);

test("transform base local url", () => {
  const port = randomPort();
  expect(transform(port, "http")).toBe(`http://localhost:${port}`);
});

test("transform base url with ws protocol", () => {
  const port = randomPort();
  expect(transform(port, "ws")).toBe(`ws://localhost:${port}`);
});

test("transform gitpod url with ws", () => {
  const port = randomPort();
  expect(transform(port, "ws", {
    inBrowser: true,
    origin: `https://${randomPort()}-hyphen-separated-name.region-datacenter5.gitpod.io`,
  })).toBe(`wss://${port}-hyphen-separated-name.region-datacenter5.gitpod.io`);
});

test("transform gitpod url with http", () => {
  const port = randomPort();
  expect(transform(port, "http", {
    inBrowser: true,
    origin: `https://${randomPort()}-hyphen-separated-name.region-datacenter5.gitpod.io`,
  })).toBe(`https://${port}-hyphen-separated-name.region-datacenter5.gitpod.io`);
});

test("transform github codespaces url with ws", () => {
  const port = randomPort();
  expect(transform(port, "ws", {
    inBrowser: true,
    origin: `https://hyphen-separated-name-${randomPort()}.app.github.dev`,
  })).toBe(`wss://hyphen-separated-name-${port}.app.github.dev`);
});

test("transform github codespaces url with http", () => {
  const port = randomPort();
  expect(transform(port, "http", {
    inBrowser: true,
    origin: `https://hyphen-separated-name-${randomPort()}.app.github.dev`,
  })).toBe(`https://hyphen-separated-name-${port}.app.github.dev`);
});
