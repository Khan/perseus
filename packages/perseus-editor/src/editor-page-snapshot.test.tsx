/**
 * The snapshot test(s) are in a separate file to avoid IDs shifting
 * from new tests being added above them.
 *
 * This is because a number of components use `React.useId()` to generate IDs,
 * and `useId` counter is global, so changing any tests above the snapshot
 * tests unnecessarily causes ID shifts and therefore snapshot updates.
 *
 * Note that adding new tests here that are not at the end of this file will
 * also expectedly cause ID shifts.
 *
 * Non-snapshot tests for the editor page can be found in
 * packages/perseus-editor/src/editor-page.test.tsx.
 */
import {Dependencies} from "@khanacademy/perseus";
import {render} from "@testing-library/react";
import * as React from "react";

import {comprehensiveQuestion} from "./__testdata__/all-widgets.testdata";
import EditorPage from "./editor-page";
import {
    testDependencies,
    testDependenciesV2,
} from "./testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "./util/register-all-widgets-and-editors-for-testing";

describe("EditorPage", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        Dependencies.setDependencies(testDependencies);
    });

    it("should match snapshot for editing disabled for all widgets", () => {
        // Arrange, Act
        const {container} = render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={comprehensiveQuestion} // question with all widgets
                apiOptions={{editingDisabled: true}} // editing disabled
                onChange={() => {}}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        // Assert
        // Note: the interactive-graph movable point renders fill/stroke="none"
        // here because its color now comes from tokenValue(), which reads a CSS
        // custom property. jsdom doesn't define those variables, so it resolves
        // to "" and Raphael renders it as "none". The real color resolves in a
        // browser (covered by Chromatic). See movable-point.tsx / .test.ts.
        expect(container).toMatchSnapshot();
    });
});
