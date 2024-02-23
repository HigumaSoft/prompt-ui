import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: false,
  fileServerFolder: '.',
  video: true,
  // viewportWidth: 1440,
  // viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'e2e/integration/**/*.{js,jsx,ts,tsx}',
    supportFile: false,
  },
});
