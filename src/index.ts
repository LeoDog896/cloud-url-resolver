export type Protocol = "http" | "ws";

const inBrowser = typeof window !== "undefined";

interface TransformationSettings {
  inBrowser: boolean;
  origin: string;
  protocol: string;
}

const defaultOptions = Object.freeze<TransformationSettings>({
  inBrowser,
  origin: globalThis.location?.origin,
  protocol: globalThis.location?.protocol,
});

/**
 * Cloud URL transformation function. Designed to run on either SSR or browser.
 */
export function transform(
  port: number,
  desiredProtocol: Protocol = "http",
  options: Partial<TransformationSettings> = {},
): string {
  const { inBrowser, origin, protocol } = { ...defaultOptions, ...options };

  // if the protocol is https, we want to transform the protocol to its secure counterpart
  const resolvedProtocol = protocol === "https:" ? (desiredProtocol === "http" ? "https" : "wss") : desiredProtocol;

  if (inBrowser && origin) {
    if (origin.includes("gitpod.io")) {
      const regex = /^https:\/\/\d{1,}$/;
      const url = origin.replace(regex, "");

      if (!url) throw Error("workspace url not defined");

      return `${resolvedProtocol}://${port}${url}`;
    } else if (origin.includes("github.dev")) {
      // TODO: codespace support
    }
  }

  return `${resolvedProtocol}://localhost:${port}`;
}
