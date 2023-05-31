import renderSingleKeypad from "../../../../../../testing/render-keypad-with-cypress";

const tabs = [
    {name: "Operators", specialButton: "EXP_2"},
    {name: "Extras", specialButton: "PI"},

    {name: "Geometry", specialButton: "COS"},
    {name: "Numbers", specialButton: "NUM_7"},
];

describe("Keypad v2", () => {
    tabs.forEach((tab) => {
        it(`switches to the correct tab: ${tab.name}`, () => {
            renderSingleKeypad((key) => {});

            // currently clicking on the bottom left due to button re-rendering
            // after mousedown but before mouseup (only in Cypress)
            cy.get('[aria-label="' + tab.name + '"]').click("bottomLeft");
            cy.get('[aria-label="' + tab.specialButton + '"]').should("exist");
        });

        it(`calls ${tab.specialButton} key callback in  ${tab.name} tab`, () => {
            const onClickKeySpy = cy.spy().as("onClickKeySpy");
            renderSingleKeypad(onClickKeySpy);
            cy.get('[aria-label="' + tab.name + '"]').click();
            cy.get('[aria-label="' + tab.specialButton + '"]').click();
            cy.get("@onClickKeySpy").should(
                "have.been.calledOnceWithExactly",
                tab.specialButton,
            );
        });
    });
});
