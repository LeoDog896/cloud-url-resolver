export type Protocol = 'http' | 'ws';

const inBrowser = typeof window !== 'undefined';

interface TransformationSettings {
    inBrowser: boolean;
    location: {
        origin: string | undefined;
        protocol: string | undefined;
    }
}

const defaultOptions = Object.freeze<TransformationSettings>({
    inBrowser,
    location: {
        origin: location ? location.origin : undefined,
        protocol: location ? location.protocol : undefined,
    }
});

/**
 * Cloud URL transformation function. Designed to run on either SSR or browser.
 */
export function transform(
    port: number,
    protocol: Protocol = 'http',
    options: Partial<TransformationSettings> = {}
): string {

    const { inBrowser, location } = { ...defaultOptions, ...options };

	const resolvedProtocol =
		location.protocol === 'https:' ? (protocol === 'http' ? 'https' : 'wss') : protocol;

	if (inBrowser && location.origin) {
		if (location.origin.includes('gitpod.io')) {
            const regex = /^https:\/\/\d{1,}$/;
            const url = location.origin.replace(regex, '');

			if (!url) throw Error('workspace url not defined');

			return `${resolvedProtocol}://${port}${url}`;
		} else if (location.origin.includes('github.dev')) {
            // TODO: codespace support
        }
	}

	return `${resolvedProtocol}://localhost:${port}`;
}
