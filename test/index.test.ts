import { expect, test } from "vitest";
import { transform } from "../src";

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const randomPort = () => random(0, 65535);

test("transform base local url", () => {
  const port = randomPort();
  expect(transform(port, 'http')).toBe(`http://localhost:${port}`);
});

test("transform base url with ws protocol", () => {
  const port = randomPort();
    expect(transform(port, 'ws')).toBe(`ws://localhost:${port}`);
});
