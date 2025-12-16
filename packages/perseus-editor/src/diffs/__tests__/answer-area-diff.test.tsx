import {getDefaultAnswerArea} from "@khanacademy/perseus-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import {AnswerAreaDiff} from "../answer-area-diff";

import type {PerseusAnswerArea} from "@khanacademy/perseus-core";

describe("AnswerAreaDiff", () => {
    const beforeItem: PerseusAnswerArea = getDefaultAnswerArea();

    const afterItem: PerseusAnswerArea = {
        calculator: true,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: true,
        financialCalculatorTimeToPayOff: false,
        periodicTable: true,
        periodicTableWithKey: true,
    };

    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    it("renders an answer area in the diff view", () => {
        // Act
        const {container} = render(
            <AnswerAreaDiff
                before={beforeItem}
                after={afterItem}
                title="Answer Area"
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with missing 'before' props", () => {
        // Act
        const {container} = render(
            <AnswerAreaDiff
                before={undefined}
                after={afterItem}
                title="Answer Area"
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with missing 'after' props", () => {
        // Act
        const {container} = render(
            <AnswerAreaDiff
                before={beforeItem}
                after={undefined}
                title="Answer Area"
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with both 'before' and 'after' undefined", () => {
        // Act
        const {container} = render(
            <AnswerAreaDiff
                before={undefined}
                after={undefined}
                title="Answer Area"
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });
});
