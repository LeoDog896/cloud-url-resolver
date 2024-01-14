export type Protocol = "http" | "ws";

const inBrowser = typeof window !== "undefined";

export interface TransformationSettings {
  inBrowser: boolean;
  origin: string;
}

export const defaultOptions = Object.freeze<TransformationSettings>({
  inBrowser,
  origin: globalThis.location?.origin,
});

/**
 * Cloud URL transformation function. Designed to run on either SSR or browser.
 */
export function transform(
  port: number,
  desiredProtocol: Protocol,
  options: Partial<TransformationSettings> = {},
): string {
  const { inBrowser, origin } = { ...defaultOptions, ...options };
  const protocol = origin?.split("//")[0];

  // if the protocol is https, we want to transform the protocol to its secure counterpart
  const resolvedProtocol = protocol === "https:" ? (desiredProtocol === "http" ? "https" : "wss") : desiredProtocol;

  if (inBrowser && origin) {
    if (origin.endsWith("gitpod.io")) {
      const regex = /^https?:\/\/\d{1,5}/;
      const url = origin.replace(regex, "");

      if (!url) throw Error("workspace url not defined");

      return `${resolvedProtocol}://${port}${url}`;
    } else if (origin.endsWith("app.github.dev")) {
      const protocolRegex = /^https?:\/\//;
      const regex = /\d{1,5}\.app\.github\.dev$/;
      const url = origin.replace(regex, "").replace(protocolRegex, "");

      if (!url) throw Error("workspace url not defined");

      return `${resolvedProtocol}://${url}${port}.app.github.dev`;
    } else if (origin.endsWith("glitch.me")) {
      return `${resolvedProtocol}://${new URL(origin).host}`;
    }
  }

  return `${resolvedProtocol}://localhost:${port}`;
}
