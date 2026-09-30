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

// https://docs.cypress.io/guides/tooling/typescript-support#Clashing-Types-with-Jest
declare global {
    namespace Cypress {
        interface Chainable {
            dragTo(position: {x: number; y: number}): Chainable<any>;
        }
    }
}

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

Cypress.Commands.add("dragTo", {prevSubject: true}, dragTo);
