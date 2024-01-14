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

const protocolRegex = /^https?:\/\//;
const workspaceDefinedError = Error("workspace url not defined");

function transformWithEndingPort(
  port: number,
  resolvedProtocol: string,
  origin: string,
  regex: RegExp,
  replacer: string,
): string {
  const url = origin.replace(regex, "").replace(protocolRegex, "");

  if (!url) throw workspaceDefinedError;

  return `${resolvedProtocol}://${url}${port}.${replacer}`;
}

function transformWithStartingPort(port: number, resolvedProtocol: string, origin: string): string {
  const regex = /^https?:\/\/\d{1,5}/;
  const url = origin.replace(regex, "");

  if (!url) throw workspaceDefinedError;

  return `${resolvedProtocol}://${port}${url}`;
}

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
      return transformWithStartingPort(port, resolvedProtocol, origin);
    } else if (origin.endsWith("app.github.dev")) {
      return transformWithEndingPort(port, resolvedProtocol, origin, /\d{1,5}\.app\.github\.dev$/, "app.github.dev");
    } else if (origin.endsWith("glitch.me")) {
      return `${resolvedProtocol}://${new URL(origin).host}`;
    } else if (origin.endsWith("csb.app")) {
      return transformWithEndingPort(port, resolvedProtocol, origin, /\d{1,5}\.csb\.app$/, "csb.app");
    }
  }

  return `${resolvedProtocol}://localhost:${port}`;
}
