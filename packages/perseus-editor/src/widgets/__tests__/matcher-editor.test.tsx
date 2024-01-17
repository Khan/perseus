import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import MatcherEditor from "../matcher-editor";

describe("matcher-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", async () => {
        render(<MatcherEditor onChange={() => {}} />);

        expect(screen.getByText("Correct answer:")).toBeInTheDocument();
    });

    it("is possible to change option: order of matched pairs matters", async () => {
        const onChangeMock = jest.fn();

        render(<MatcherEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "Order of the matched pairs matters:",
            }),
        );

        expect(onChangeMock).toBeCalledWith({orderMatters: true});
    });

    it("should be possible to change padding", async () => {
        const onChangeMock = jest.fn();

        render(<MatcherEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("checkbox", {name: "Padding:"}));

        expect(onChangeMock).toBeCalledWith({padding: false});
    });
});
