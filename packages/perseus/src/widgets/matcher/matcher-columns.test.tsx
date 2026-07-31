import {act} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./matcher.testdata";

import type {APIOptions} from "../../types";

type CapturedSortable = {
    props: {
        constraints: {height?: number};
        margin: number;
        onMeasure: (dimensions: {
            widths: ReadonlyArray<number>;
            heights: ReadonlyArray<number>;
        }) => void;
    };
};

// The real Sortable measures its items with jQuery, which always reports a
// height of 0 under jsdom. We stub it out so we can drive `onMeasure` with
// realistic heights and inspect the constraints Matcher feeds back down.
// eslint-disable-next-line no-var
var mockSortables: Array<CapturedSortable>;

jest.mock("../../components/sortable", () => {
    const react = jest.requireActual("react");

    return {
        __esModule: true,
        default: class MockSortable extends react.Component {
            declare props: CapturedSortable["props"];

            constructor(props: CapturedSortable["props"]) {
                super(props);
                mockSortables.push(this);
            }

            render() {
                return react.createElement("div");
            }
        },
    };
});

describe("matcher widget column sync", () => {
    beforeEach(() => {
        mockSortables = [];

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({onRender: onLoad}: {onRender?: () => unknown}) => {
                React.useLayoutEffect(() => {
                    onLoad?.();
                }, [onLoad]);
                return null;
            },
        });
    });

    function renderMatcher(apiOptions?: APIOptions): {
        left: CapturedSortable;
        right: CapturedSortable;
    } {
        renderQuestion(question1, apiOptions);
        const [left, right] = mockSortables;
        return {left, right};
    }

    it("constrains both columns to zero height before they are measured", () => {
        // Arrange, Act
        const {left, right} = renderMatcher();

        // Assert
        expect(left.props.constraints.height).toBe(0);
        expect(right.props.constraints.height).toBe(0);
    });

    it("constrains both columns to the tallest measured height", () => {
        // Arrange
        const {left, right} = renderMatcher();

        // Act
        act(() => left.props.onMeasure({widths: [], heights: [10, 30]}));
        act(() => right.props.onMeasure({widths: [], heights: [12, 20]}));

        // Assert
        expect(left.props.constraints.height).toBe(30);
        expect(right.props.constraints.height).toBe(30);
    });

    it("gives cells a 5px margin on desktop", () => {
        // Arrange, Act
        const {left, right} = renderMatcher({isMobile: false});

        // Assert
        expect(left.props.margin).toBe(5);
        expect(right.props.margin).toBe(5);
    });

    it("gives cells an 8px margin on mobile", () => {
        // Arrange, Act
        const {left, right} = renderMatcher({isMobile: true});

        // Assert
        expect(left.props.margin).toBe(8);
        expect(right.props.margin).toBe(8);
    });
});
