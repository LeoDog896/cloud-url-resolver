# cloud-url-resolver

[![NPM Version](https://img.shields.io/npm/v/cloud-url-resolver)](https://npmjs.com/package/cloud-url-resolver)

easily resolve protocol/port setups on any development platform

## Supported Platforms

- [GitHub Codespaces](https://github.com/features/codespaces)
- [Gitpod](https://www.gitpod.io/)
- [Glitch](https://glitch.com/) - _no port support_
- [CodeSandbox](https://codesandbox.io)

If you would like to add support for another platform, please open an issue about it.

## Usage

```ts
import { transform } from "cloud-url-resolver";

// returns "http://localhost:3000" if on localhost;
// otherwise, returns the transformed URL
// for the current platform
transform(3000, "http");

// for example, if on Gitpod, this returns
// wss://4000-name.region-datacenter2.gitpod.io
transform(4000, "ws");

// or https://raspberrypi:8080 if on a Raspberry Pi with https enabled
transform(8080, "http");
```
