// eslint-disable-next-line import/no-unassigned-import
import "cypress-wait-until";
// eslint-disable-next-line import/no-unassigned-import
import "cypress-real-events";

// Defines the --wb-* custom properties that Wonder Blocks design tokens
// compile down to.
import "@khanacademy/wonder-blocks-tokens/styles.css";

if (Cypress.env("CYPRESS_COVERAGE")) {
    // @ts-expect-error - TS1378 - (trust me!) Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022', 'esnext', 'system', 'node16', or 'nodenext', and the 'target' option is set to 'es2017' or higher.
    await import("@cypress/code-coverage/support");
}
