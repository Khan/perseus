import {ApiOptions, Dependencies, Widgets} from "@khanacademy/perseus";
import {
    generateAnswerTile,
    generateFillInTheBlankOptions,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import {getFeatureFlags} from "../../testing/feature-flags-util";
import {testDependencies} from "../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";

type FillInTheBlankEditorHandle = React.ElementRef<typeof FillInTheBlankEditor>;

describe("fill-in-the-blank-editor", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    // TODO(LEMS-4396): clean up feature flag
    it("renders the editor when the dnd-widget-fitb flag is on", () => {
        // Arrange, Act
        render(
            <FillInTheBlankEditor
                {...generateFillInTheBlankOptions()}
                apiOptions={{
                    ...ApiOptions.defaults,
                    flags: getFeatureFlags({"dnd-widget-fitb": true}),
                }}
                onChange={() => {}}
            />,
        );

        expect(
            screen.getByTestId("fill-in-the-blank-editor"),
        ).toBeInTheDocument();
    });

    it("renders nothing when the dnd-widget-fitb flag is off", () => {
        // Arrange, Act
        render(
            <FillInTheBlankEditor
                {...generateFillInTheBlankOptions()}
                apiOptions={{
                    ...ApiOptions.defaults,
                    flags: getFeatureFlags({"dnd-widget-fitb": false}),
                }}
                onChange={() => {}}
            />,
        );

        expect(
            screen.queryByTestId("fill-in-the-blank-editor"),
        ).not.toBeInTheDocument();
    });

    it("serializes the options it was given", () => {
        // Arrange
        const options = generateFillInTheBlankOptions({
            content: "A [[☃ blank 1]] is a drum.",
            tiles: [generateAnswerTile({id: "djembe", content: "djembe"})],
            maxUsesPerTile: "unlimited",
            randomize: true,
        });
        const ref = React.createRef<FillInTheBlankEditorHandle>();
        render(
            <FillInTheBlankEditor {...options} ref={ref} onChange={() => {}} />,
        );

        // Act
        const serialized = ref.current?.serialize();

        expect(serialized).toEqual(options);
    });

    it("is registered as the editor for the fill-in-the-blank widget", () => {
        // Arrange, Act
        const editor = Widgets.getEditor("fill-in-the-blank");

        expect(editor).not.toBeNull();
    });
});
