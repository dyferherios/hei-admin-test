// import { defineConfig } from "cypress";
// import dotenv from "dotenv";

// dotenv.config();

// export default defineConfig({
//   viewportHeight: 1080,
//   viewportWidth: 1920,
//   defaultCommandTimeout: 25_000,
//   e2e: {
// 	  pageLoadTimeout:100000, 
//   },
//    retries: {
//     runMode: 4,
//     openMode: 0,
//   },
//   env:{
//         CYPRESS_STUDENT1_PASSWORD: process.env.CYPRESS_STUDENT1_PASSWORD,
//         CYPRESS_TEACHER1_PASSWORD: process.env.CYPRESS_TEACHER1_PASSWORD,
//         CYPRESS_MANAGER1_PASSWORD: process.env.CYPRESS_MANAGER1_PASSWORD,
//         CYPRESS_ADMIN1_PASSWORD: process.env.CYPRESS_ADMIN1_PASSWORD,
//         CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL,
//    },
// });


import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 25_000,
  pageLoadTimeout: 100_000,
  retries: {
    runMode: 4,
    openMode: 0,
  },
  env: {
    CYPRESS_STUDENT1_PASSWORD: process.env.CYPRESS_STUDENT1_PASSWORD,
    CYPRESS_TEACHER1_PASSWORD: process.env.CYPRESS_TEACHER1_PASSWORD,
    CYPRESS_MANAGER1_PASSWORD: process.env.CYPRESS_MANAGER1_PASSWORD,
    CYPRESS_ADMIN1_PASSWORD: process.env.CYPRESS_ADMIN1_PASSWORD,
    CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL,
    TERM: 'xterm', // résout le warning tput dans CI
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}', // pour détecter tous les tests
    supportFile: false,
    setupNodeEvents(on, config) {
      // tu peux ajouter ici d'autres plugins si besoin
      return config;
    },
    // pour Electron headless (résout WebGL fallback warning)
    browser: 'electron',
    chromeWebSecurity: false,
    video: false,
  },
});
