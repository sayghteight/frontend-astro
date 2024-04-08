import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    tailwind({ 
      applyBaseStyles: false
    })
  ]
});