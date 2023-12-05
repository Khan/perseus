import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import ExpressionEditor from "../expression-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

describe("expression-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(<ExpressionEditor onChange={() => undefined} />);

        expect(await screen.findByText(/Add new answer/)).toBeInTheDocument();
    });

    it("should render answerForms missing a key", async () => {
        const answerForms: PropsFor<typeof ExpressionEditor>["answerForms"] = [
            {
                value: "x\\cdot3=y",
                form: true,
                simplify: true,
                considered: "correct",
            },
            {
                value: "x^2=y",
                form: true,
                simplify: true,
                considered: "wrong",
            },
            {
                value: "x=y\\cdotπ",
                form: true,
                simplify: true,
                considered: "wrong",
            },
        ];

        render(
            <ExpressionEditor
                onChange={() => undefined}
                answerForms={answerForms}
            />,
        );

        expect(await screen.findByText(/π/)).toBeInTheDocument();
    });
});
