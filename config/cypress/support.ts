// eslint-disable-next-line import/no-unassigned-import
import "cypress-jest-adapter";
// eslint-disable-next-line import/no-unassigned-import
import "cypress-wait-until";
// eslint-disable-next-line import/no-unassigned-import
import "cypress-real-events";

if (Cypress.env("CYPRESS_COVERAGE")) {
    // @ts-expect-error - TS1378 - (trust me!) Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022', 'esnext', 'system', 'node16', or 'nodenext', and the 'target' option is set to 'es2017' or higher.
    await import("@cypress/code-coverage/support");
}

// Here we register our custom commands
// NOTE: If we end up with a lot of custom commands, we should break
// each command into its own file.

// TODO(LC-1495): Leaving this here for the future where we migrate this to TS.
// It works, but switching our Cypress config to .ts files causes Cypress types
// to conflict with Jest types. The following URL looks like it would fix it,
// but I couldn't get it working in a short timebox. Leaving this breadcrumb
// trail for future!
// https://docs.cypress.io/guides/tooling/typescript-support#Clashing-Types-with-Jest
// declare global {
//     namespace Cypress {
//         interface Chainable {
//             dragTo(position: {x: number; y: number}): Chainable<any>;
//         }
//     }
// }

/**
 * Click a node and drag it to the specified {x, y} position
 */
const dragTo = (node, pos) => {
    return cy
        .wrap(node)
        .trigger("mousedown", {force: true, which: 1, button: 0})
        .trigger("mousemove", {force: true, pageX: pos.x, pageY: pos.y})
        .trigger("mouseup", {force: true})
        .trigger("mouseout", {force: true});
};

// @ts-expect-error - TS2769 - Argument of type '"dragTo"' is not assignable to parameter of type 'keyof Chainable<any>'.
Cypress.Commands.add("dragTo", {prevSubject: true}, dragTo);
