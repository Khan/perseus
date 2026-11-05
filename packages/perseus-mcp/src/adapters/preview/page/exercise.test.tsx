import {registerAllWidgetsForTesting} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {
    DEFAULT_PREVIEW_OPTIONS,
    describeHints,
    INITIAL_HINTS_REVEAL,
} from "@khanacademy/perseus-preview";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import {Exercise} from "./exercise";
import {dependenciesV2} from "./perseus-environment";

import type {PerseusItem} from "@khanacademy/perseus-core";

function renderExercise(
    item: PerseusItem,
    onRenderState: React.ComponentProps<typeof Exercise>["onRenderState"],
) {
    return render(
        <Exercise
            data={{item, apiOptions: {}, showRationales: false}}
            previewOptions={DEFAULT_PREVIEW_OPTIONS}
            hintsState={describeHints([], INITIAL_HINTS_REVEAL)}
            onRenderState={onRenderState}
        />,
    );
}

describe("Exercise", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    it("reports done once Perseus has rendered the item", () => {
        // Arrange
        const onRenderState = jest.fn();
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({content: "Plain text"}),
        });

        // Act
        renderExercise(item, onRenderState);

        // Assert
        expect(onRenderState).toHaveBeenCalledWith({status: "done"});
    });

    it("reports done again for a new revision of the item", () => {
        // Arrange
        const onRenderState = jest.fn();
        const first = generateTestPerseusItem({
            question: generateTestPerseusRenderer({content: "First"}),
        });
        const second = generateTestPerseusItem({
            question: generateTestPerseusRenderer({content: "Second"}),
        });
        const {rerender} = renderExercise(first, onRenderState);
        onRenderState.mockClear();

        // Act
        rerender(
            <Exercise
                data={{item: second, apiOptions: {}, showRationales: false}}
                previewOptions={DEFAULT_PREVIEW_OPTIONS}
                hintsState={describeHints([], INITIAL_HINTS_REVEAL)}
                onRenderState={onRenderState}
            />,
        );

        // Assert
        expect(onRenderState).toHaveBeenCalledWith({status: "done"});
    });

    it("reports an error and shows it when the item can't render", () => {
        // Arrange
        jest.spyOn(console, "error").mockImplementation(() => {});
        const onRenderState = jest.fn();
        const broken = {
            ...generateTestPerseusItem(),
            // An item without its hints array, which rendering needs.
            hints: undefined,
        };

        // Act
        // eslint-disable-next-line no-restricted-syntax -- deliberately invalid
        renderExercise(broken as unknown as PerseusItem, onRenderState);

        // Assert
        expect({
            report: onRenderState.mock.calls.at(-1)?.[0].status,
            shown: screen.getByRole("alert").textContent,
        }).toEqual({
            report: "error",
            shown: expect.stringContaining("Perseus couldn't render this item"),
        });
    });

    it("loads images through the dependencies it's given", () => {
        // Arrange
        const generateUrl = jest.fn(({url}: {url: string}) => url);
        // jsdom has no fetch. Perseus asks for a Graphie image's labels
        // first, so that request is enough to show what it uses.
        globalThis.fetch = jest.fn(() => new Promise<Response>(() => {}));
        const url = "web+graphie://perseus-mcp.localhost/graffiti/g1";
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            alt: "A triangle",
                            backgroundImage: {url, width: 40, height: 30},
                        }),
                    }),
                },
            }),
        });

        // Act
        render(
            <Exercise
                data={{item, apiOptions: {}, showRationales: false}}
                previewOptions={DEFAULT_PREVIEW_OPTIONS}
                hintsState={describeHints([], INITIAL_HINTS_REVEAL)}
                dependencies={{...dependenciesV2, generateUrl}}
            />,
        );

        // Assert
        expect(generateUrl).toHaveBeenCalledWith({
            url: "https://perseus-mcp.localhost/graffiti/g1-data.json",
            context: "graphie:data_url",
        });
    });
});
