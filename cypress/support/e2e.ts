// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err, _runnable) => {
  // FIXME: on the login when try to reset password
  if (err.message.includes("Cannot call an event handler while rendering.")) {
    return false;
  }

  if (err.message.includes(`awswaf-captcha`)) {
    return false;
  }

  return true;
});

Cypress.on("uncaught:exception", (err) => {
  return !err.message.includes(
    `Failed to execute 'define' on 'CustomElementRegistry': the name "awswaf-captcha" has already been used with this registry`
  );
});
