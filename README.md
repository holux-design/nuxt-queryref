<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: nuxt-queryref
- Description: My new Nuxt module
-->

# `useQueryRef` - URL-persisted `ref` for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

## Features

<!-- Highlight some of the features your module provide here -->

- Drop-in support instead of `ref()`
- Supports all common types (string, number, boolean, Arrays, Objects)
- Coherently typed for good DX

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-queryref
```

That's it! You can now use `useQueryRef` in your Nuxt app ✨

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-queryref/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-queryref
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-queryref.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-queryref
[license-src]: https://img.shields.io/npm/l/nuxt-queryref.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-queryref
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
