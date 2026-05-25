import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://fde.williamrthomas.com",
  integrations: [tailwind(), react()],
  output: "static",
  build: {
    inlineStylesheets: "auto"
  }
});
