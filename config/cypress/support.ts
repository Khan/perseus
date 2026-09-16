// eslint-disable-next-line import/no-unassigned-import
import "cypress-jest-adapter";
// eslint-disable-next-line import/no-unassigned-import
import "cypress-wait-until";
// eslint-disable-next-line import/no-unassigned-import
import "cypress-real-events";
// eslint-disable-next-line import/no-unassigned-import
import "@cypress/code-coverage/support";

// Defines the --wb-* custom properties that Wonder Blocks design tokens
// compile down to.
import "@khanacademy/wonder-blocks-tokens/styles.css";

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
    const clientX = pos.x - window.scrollX;
    const clientY = pos.y - window.scrollY;

    cy.wrap(node).realMouseDown({position: "center"});
    return cy.get("body").then(($body) => {
        const bodyRect = $body[0].getBoundingClientRect();
        cy.wrap($body).realMouseMove(
            clientX - bodyRect.left,
            clientY - bodyRect.top,
            {
                position: "topLeft",
                scrollBehavior: false,
            },
        );
        cy.wrap($body).realMouseUp();
    });
};

// @ts-expect-error - TS2769 - Argument of type '"dragTo"' is not assignable to parameter of type 'keyof Chainable<any>'.
Cypress.Commands.add("dragTo", {prevSubject: true}, dragTo);
