# cloud-url-resolver

![NPM Version](https://img.shields.io/npm/v/cloud-url-resolver)

easily resolve protocol/port setups on any development platform

## Supported Platforms

- [GitHub Codespaces](https://github.com/features/codespaces)
- [Gitpod](https://www.gitpod.io/)

If you would like to add support for another platform, please open an issue about it.

## Usage

```ts
import { resolve } from "cloud-url-resolver";

transform(3000, "http"); // returns "http://localhost:3000" if on localhost; otherwise, returns the transformed for the current platform
```
