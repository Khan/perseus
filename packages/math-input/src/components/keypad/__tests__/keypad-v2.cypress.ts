import renderSingleKeypad from "../../../../../../testing/render-keypad-with-cypress";
import KeyConfigs from "../../../data/key-configs";

const tabs = [
    {
        name: "Operators",
        specialButton: "EXP_2",
        label: KeyConfigs["EXP_2"].ariaLabel,
    },
    {name: "Extras", specialButton: "PI", label: KeyConfigs["PI"].ariaLabel},

    {
        name: "Geometry",
        specialButton: "COS",
        label: KeyConfigs["COS"].ariaLabel,
    },
    {
        name: "Numbers",
        specialButton: "NUM_7",
        label: KeyConfigs["NUM_7"].ariaLabel,
    },
];

describe("Keypad v2", () => {
    tabs.forEach((tab) => {
        it(`switches to the correct tab: ${tab.name}`, () => {
            renderSingleKeypad((key) => {});

            // currently clicking on the bottom left due to button re-rendering
            // after mousedown but before mouseup (only in Cypress)
            cy.get('[aria-label="' + tab.name + '"]').click("bottomLeft");
            cy.get('[aria-label="' + tab.label + '"]').should("exist");
        });

        it(`calls ${tab.specialButton} key callback in  ${tab.name} tab`, () => {
            const onClickKeySpy = cy.spy().as("onClickKeySpy");
            renderSingleKeypad(onClickKeySpy);
            cy.get('[aria-label="' + tab.name + '"]').click();
            cy.get('[aria-label="' + tab.label + '"]').click();
            cy.get("@onClickKeySpy").should(
                "have.been.calledOnceWithExactly",
                tab.specialButton,
            );
        });
    });
});
