/**
 * This file is the entry point for Cypress' configuration. It _must_ remain at
 * the root (even though we can pass `--config-file <path>` to Cypress),
 * because the directory of file we pass to `--config-file` sets the current
 * working directory (cwd) of the Cypress run.
 */

// eslint-disable-next-line import/no-relative-packages
export {default as default} from "./config/cypress/cypress.config";
