import {render, screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {ApiOptions} from "../../../perseus-api";
import {earthMoonImage} from "../utils";

import {ExploreImageModal} from "./explore-image-modal";

import type {
    Interval,
    PerseusImageBackground,
    Size,
} from "@khanacademy/perseus-core";

const defaultProps = {
    backgroundImage: {},
    title: "",
    caption: "",
    alt: "",
    longDescription: "",
    zoomSize: [0, 0] satisfies Size,
    box: [400, 400] satisfies Size,
    labels: [],
    range: [
        [0, 10],
        [0, 10],
    ] satisfies [Interval, Interval],
    linterContext: {
        contentType: "",
        highlightLint: false,
        paths: [],
        stack: ["widget"],
    },
    apiOptions: ApiOptions.defaults,
};

describe("ExploreImageModal", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render the modal", () => {
        // Arrange

        // act
        render(<ExploreImageModal {...defaultProps} />);

        // Assert
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it.each([
        {
            case: "background image URL",
            backgroundImage: {
                url: undefined,
                width: 100,
                height: 100,
            },
        },
        {
            case: "background image height",
            backgroundImage: {
                url: "image.png",
                width: 100,
                height: undefined,
            },
        },
        {
            case: "background image width",
            backgroundImage: {
                url: "image.png",
                width: undefined,
                height: 100,
            },
        },
    ] satisfies Array<{
        case: string;
        backgroundImage: PerseusImageBackground;
    }>)(
        "should have null content if there is no $case",
        ({backgroundImage}) => {
            // Arrange
            const props = {
                ...defaultProps,
                backgroundImage,
            };

            // Act
            render(<ExploreImageModal {...props} />);
            const title = screen.getByRole("heading", {level: 1});

            // Assert
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent("Explore image and description");
            expect(screen.queryByRole("img")).not.toBeInTheDocument();
            expect(screen.queryByText("Description")).not.toBeInTheDocument();
        },
    );

    it("renders the default title when no title is provided", () => {
        // Arrange

        // Act
        render(<ExploreImageModal {...defaultProps} />);

        // Assert
        const title = screen.getByRole("heading", {level: 1});
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Explore image and description");
    });

    it("renders the title if one is provided", () => {
        // Arrange

        // Act
        render(<ExploreImageModal {...defaultProps} title="widget title" />);

        // Assert
        const title = screen.getByRole("heading", {level: 1});
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("widget title");
    });

    it("renders the caption if one is provided", () => {
        // Arrange

        // Act
        render(
            <ExploreImageModal
                {...defaultProps}
                backgroundImage={earthMoonImage}
                caption="widget caption"
            />,
        );

        // Assert
        expect(screen.getByText("widget caption")).toBeInTheDocument();
    });

    it("renders the description", () => {
        // Arrange

        // Act
        render(
            <ExploreImageModal
                {...defaultProps}
                backgroundImage={earthMoonImage}
                longDescription="widget long description"
            />,
        );

        // Assert
        const descriptionLabel = screen.getByText("Description");
        expect(descriptionLabel).toBeInTheDocument();
        expect(screen.getByText("widget long description")).toBeInTheDocument();
    });
});
