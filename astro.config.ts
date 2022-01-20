import type { AstroUserConfig } from "astro";

const config: AstroUserConfig = {
  buildOptions: {
    site: "https://tsday.ng-bolivia.org",
    sitemap: true,
  },
  renderers: [
    '@astrojs/renderer-react'
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
};

export default config;
