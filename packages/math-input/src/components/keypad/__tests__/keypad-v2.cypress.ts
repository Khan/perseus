import renderSingleKeypad from "../../../../../../testing/render-keypad-with-cypress";

type StringDictionary = {[key: string]: string};
type TabArray = StringDictionary[];
const tabs: TabArray = [
    {name: "Operators", specialButton: "EXP_2"},
    {name: "Extras", specialButton: "PI"},

    {name: "Geometry", specialButton: "COS"},
    {name: "Numbers", specialButton: "NUM_7"},
];

describe("Keypad v2", () => {
    it("renders", () => {
        renderSingleKeypad((key) => {});
    });

    tabs.forEach((tab) => {
        it(
            "switches to the " +
                tab["name"] +
                " tab when we press on the " +
                tab["name"] +
                " button",
            () => {
                renderSingleKeypad((key) => {});

                // currently clicking on the bottom left due to button re-rendering after mousedown but before mouseup (only in Cypress)
                cy.get('[aria-label="' + tab["name"] + '"]').click(
                    "bottomLeft",
                );
                cy.get('[aria-label="' + tab["specialButton"] + '"]').should(
                    "exist",
                );
            },
        );

        it(
            "while in the " +
                tab["name"] +
                " tab it can type the " +
                tab["specialButton"] +
                " character when we press on the " +
                tab["specialButton"] +
                " key",
            () => {
                const onClickKeySpy = cy.spy().as("onClickKeySpy");
                const handleClickKey = (key) => {
                    onClickKeySpy(key);
                };
                renderSingleKeypad(handleClickKey);
                cy.get('[aria-label="' + tab["name"] + '"]').click();
                cy.get('[aria-label="' + tab["specialButton"] + '"]').click();
                cy.get("@onClickKeySpy").should(
                    "have.been.calledOnceWithExactly",
                    tab["specialButton"],
                );
            },
        );
    });
});
