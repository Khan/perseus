import {act, render, screen} from "@testing-library/react";
import {mockStrings} from "../../../strings";
import Keypad from "../../../components/keypad";

import {getTestDataTabs} from "./test-data-tabs";

describe("Keypad v2", () => {
    const tabs = getTestDataTabs(mockStrings);
    tabs.forEach((tab) => {
        it(`switches to the correct tab: ${tab.name}`, () => {
            render(
                <Keypad
                    extraKeys={["a", "b", "c", "PI"]}
                    onClickKey={() => {}}
                    advancedRelations
                    basicRelations
                    divisionKey
                    logarithms
                    convertDotToTimes
                    preAlgebra
                    trigonometry
                    onAnalyticsEvent={async () => {
                        /* no-op */
                    }}
                />,
            );

            act(() => {
                screen.getByRole("tab", {name: tab.name}).click();
            });

            expect(
                screen.getByRole("tabpanel", {name: tab.name}),
            ).toBeVisible();
        });
    });
});
