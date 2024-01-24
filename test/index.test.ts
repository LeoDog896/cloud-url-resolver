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

test("transform base network url with http protocol", () => {
  const port = randomPort();
  expect(transform(port, "http", {
    inBrowser: true,
    origin: `http://192.168.1.1:${randomPort()}`,
  })).toBe(`http://192.168.1.1:${port}`);
});

test("transform base network url with ws protocol", () => {
  const port = randomPort();
  expect(transform(port, "ws", {
    inBrowser: true,
    origin: `http://192.168.1.1:${randomPort()}`,
  })).toBe(`ws://192.168.1.1:${port}`);
});

test("transform rpi network url with https protocol", () => {
  const port = randomPort();
  expect(transform(port, "http", {
    inBrowser: true,
    origin: `http://raspberrypi:${randomPort()}`,
  })).toBe(`http://raspberrypi:${port}`);
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

test("transform glitch url with ws", () => {
  const port = randomPort();
  expect(transform(port, "ws", {
    inBrowser: true,
    origin: `https://hyphen-separated-name.glitch.me`,
  })).toBe(`wss://hyphen-separated-name.glitch.me`);
});

test("transform glitch url with http", () => {
  const port = randomPort();
  expect(transform(port, "http", {
    inBrowser: true,
    origin: `https://hyphen-separated-name.glitch.me`,
  })).toBe(`https://hyphen-separated-name.glitch.me`);
});

test("transform codesandbox url with ws", () => {
  const port = randomPort();
  expect(transform(port, "ws", {
    inBrowser: true,
    origin: `https://someId-${randomPort()}.csb.app`,
  })).toBe(`wss://someId-${port}.csb.app`);
});

test("transform codesandbox url with http", () => {
  const port = randomPort();
  expect(transform(port, "http", {
    inBrowser: true,
    origin: `https://someId-${randomPort()}.csb.app`,
  })).toBe(`https://someId-${port}.csb.app`);
});
