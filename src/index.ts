export type Protocol = 'http' | 'ws';

const inBrowser = typeof window !== 'undefined';

/**
 * Cloud URL transformation function. Designed to run on either SSR or browser.
 */
export function transform(port: number, protocol: Protocol = 'http'): string {
	const resolvedProtocol =
		location.protocol === 'https:' ? (protocol === 'http' ? 'https' : 'wss') : protocol;

	if (inBrowser) {
		if (location.origin.includes('gitpod.io')) {
			const url = location.origin.substring('https://xxxx'.length);

			if (!url) throw Error('workspace url not defined');

			const transformedURL = `${resolvedProtocol}://${port}${url}`;

			return transformedURL;
		}

		// TODO: codespace support
	}

	return `${resolvedProtocol}://localhost:${port}`;
}
