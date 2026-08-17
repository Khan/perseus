import {screen} from "@testing-library/react";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../testing/wait";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    exponentialQuestion,
    linearQuestion,
    multipleAvailableTypesQuestion,
} from "./grapher.testdata";

import type {PerseusDependenciesV2} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

describe("grapher widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mocked for loading graphie in svg-image
        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    it("should snapshot linear graph question", async () => {
        // Arrange and Act
        const {container} = renderQuestion(linearQuestion);
        // A grapher with a single available type renders using the
        // Interactive Graph components, which wrap the graph in an ARIA
        // `figure`.
        expect(await screen.findByRole("figure")).toBeInTheDocument();

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot question with multiple graph types", async () => {
        // Arrange and Act
        const {container} = renderQuestion(multipleAvailableTypesQuestion);
        await waitForInitialGraphieRender();

        // Assert
        // Note: the curve's stroke resolves to "" in jsdom because
        // tokenValue() reads CSS custom properties, which jsdom doesn't
        // define. Raphael then renders "" as stroke="none" in the DOM
        // (visible in the snapshot). The correct hex resolves in a real
        // browser (Chromatic).
        expect(container).toMatchSnapshot("initial render");
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(linearQuestion, undefined, undefined, undefined, depsV2);
        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "grapher",
                widgetId: "grapher 1",
            },
        });
    });

    it("renders the asymptote as a dashed line", async () => {
        // Arrange
        // Note: a multi-type question renders via the legacy graphie
        // grapher (single non-quadratic types use Interactive Graph instead)
        const dashedAsymptoteQuestion: PerseusRenderer = {
            ...exponentialQuestion,
            widgets: {
                "grapher 1": {
                    ...exponentialQuestion.widgets["grapher 1"],
                    static: true,
                    options: {
                        ...exponentialQuestion.widgets["grapher 1"].options,
                        availableTypes: ["exponential", "logarithm"],
                    },
                },
            },
        };

        // Act
        const {container} = renderQuestion(dashedAsymptoteQuestion);
        await waitForInitialGraphieRender();

        // Assert
        // Note: Raphael expands the "- " dash style into a pixel dash array
        // on the rendered asymptote line. The line is a bare Raphael SVG path
        // with no accessible role, so we query the DOM directly.
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const dashedLine = container.querySelector("[stroke-dasharray]");
        expect(dashedLine).toBeInTheDocument();
    });
});
