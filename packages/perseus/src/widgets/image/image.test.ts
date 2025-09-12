import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {getFeatureFlags} from "../../../../../testing/feature-flags-util";
import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question} from "./image.testdata";
import {earthMoonImage} from "./utils";

import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

describe.each([[true], [false]])("image widget - isMobile(%j)", (isMobile) => {
    let userEvent: UserEvent;

    const apiOptions: APIOptions = {
        isMobile,
        flags: getFeatureFlags({"image-widget-upgrade": true}),
    };
    const images: HTMLImageElement[] = [];
    let originalImage;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mock window.Image for ImageLoader
        originalImage = window.Image;
        window.Image = jest.fn(() => {
            const img = {} as HTMLImageElement;
            images.push(img);
            return img;
        });

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    afterEach(() => {
        window.Image = originalImage;
    });

    // Helper to simulate image loading completion
    const markImagesAsLoaded = () => {
        act(() => {
            images.forEach((img) => {
                if (img?.onload) {
                    img.onload(new Event("load"));
                }
            });
        });
    };

    it("should snapshot", () => {
        // Arrange

        // Act
        const {container} = renderQuestion(question, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should be unanswerable", () => {
        // Arrange

        // Act
        const {renderer} = renderQuestion(question, apiOptions);
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should not render empty image", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: {},
                    }),
                }),
            },
        });

        // Act
        renderQuestion(imageQuestion, apiOptions);

        // Assert
        expect(screen.queryByRole("figure")).not.toBeInTheDocument();
    });

    it("should render image", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                    }),
                }),
            },
        });

        // Act
        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        // Assert
        expect(screen.getByRole("figure")).toBeVisible();
    });

    it("should render image with alt text", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "widget alt",
                    }),
                }),
            },
        });

        // Act
        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        // Assert
        expect(screen.getByAltText("widget alt")).toBeVisible();
    });

    it("should render image with title", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        title: "widget title",
                    }),
                }),
            },
        });

        // Act
        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        // Assert
        expect(screen.getByText("widget title")).toBeVisible();
    });

    it("should render image with caption", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        caption: "widget caption",
                    }),
                }),
            },
        });

        // Act
        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        // Assert
        expect(screen.getByText("widget caption")).toBeVisible();
    });

    it("should render the explore image button when image has long description", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        longDescription: "widget long description",
                    }),
                }),
            },
        });

        // Act
        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        // Assert
        const button = screen.getByRole("button", {name: "Explore image"});
        expect(button).toBeVisible();
        expect(button).toHaveTextContent("Explore image");
    });

    it("should render the explore image icon when image has long description and caption", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        longDescription: "widget long description",
                        caption: "widget caption",
                    }),
                }),
            },
        });

        // Act
        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        // Assert
        const iconButton = screen.getByRole("button", {name: "Explore image"});
        expect(iconButton).toBeVisible();
        expect(iconButton).toHaveAttribute("aria-label", "Explore image");
        expect(iconButton).not.toHaveTextContent("Explore image");
    });

    it("should render a modal when the explore image button is clicked", async () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        longDescription: "widget long description",
                    }),
                }),
            },
        });

        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        //  Act
        const button = screen.getByRole("button", {name: "Explore image"});
        await userEvent.click(button);

        // Assert
        expect(screen.getByRole("dialog")).toBeVisible();
    });

    it("should render a modal when the explore image icon button is clicked", async () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        longDescription: "widget long description",
                        caption: "widget caption",
                    }),
                }),
            },
        });

        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        //  Act
        const button = screen.getByRole("button", {name: "Explore image"});
        await userEvent.click(button);

        // Assert
        expect(screen.getByRole("dialog")).toBeVisible();
    });

    it("should render a modal with the title, caption, and description", async () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        longDescription: "widget long description",
                        caption: "widget caption",
                        title: "widget title",
                    }),
                }),
            },
        });

        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        //  Act
        const button = screen.getByRole("button", {name: "Explore image"});
        await userEvent.click(button);

        // Assert
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeVisible();
        expect(dialog).toHaveTextContent("widget title");
        expect(dialog).toHaveTextContent("widget caption");
        expect(dialog).toHaveTextContent("Description");
        expect(dialog).toHaveTextContent("widget long description");
    });

    it("should render a modal the placeholder title if a title is not provided", async () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        longDescription: "widget long description",
                    }),
                }),
            },
        });

        renderQuestion(imageQuestion, apiOptions);
        markImagesAsLoaded(); // Simulate image loading completion

        //  Act
        const button = screen.getByRole("button", {name: "Explore image"});
        await userEvent.click(button);

        // Assert
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeVisible();
        expect(dialog).toHaveTextContent("Explore image and description");
    });

    describe("upgrade-image-widget feature flag", () => {
        it("should render the explore image button when the image widget upgrade feature flag is enabled", async () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            longDescription: "widget long description",
                        }),
                    }),
                },
            });

            const apiOptionsWithFeatureFlag = {
                ...apiOptions,
                flags: getFeatureFlags({"image-widget-upgrade": true}),
            };

            renderQuestion(imageQuestion, apiOptionsWithFeatureFlag);
            markImagesAsLoaded(); // Simulate image loading completion

            // Assert
            const button = screen.getByRole("button", {name: "Explore image"});
            expect(button).toBeVisible();
            expect(button).toHaveTextContent("Explore image");
        });

        it("should render the explore image icon when the image widget upgrade feature flag is enabled and the image has a caption", async () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            longDescription: "widget long description",
                            caption: "widget caption",
                        }),
                    }),
                },
            });

            const apiOptionsWithFeatureFlag = {
                ...apiOptions,
                flags: getFeatureFlags({"image-widget-upgrade": true}),
            };

            renderQuestion(imageQuestion, apiOptionsWithFeatureFlag);
            markImagesAsLoaded(); // Simulate image loading completion

            // Assert
            const iconButton = screen.getByRole("button", {
                name: "Explore image",
            });
            expect(iconButton).toBeVisible();
            expect(iconButton).toHaveAttribute("aria-label", "Explore image");
            expect(iconButton).not.toHaveTextContent("Explore image");
        });

        it("should NOT render the explore image button when the image widget upgrade feature flag is disabled", async () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            longDescription: "widget long description",
                        }),
                    }),
                },
            });

            const apiOptionsWithFeatureFlag = {
                ...apiOptions,
                flags: getFeatureFlags({"image-widget-upgrade": false}),
            };

            renderQuestion(imageQuestion, apiOptionsWithFeatureFlag);
            markImagesAsLoaded(); // Simulate image loading completion

            // Assert
            const button = screen.queryByRole("button", {
                name: "Explore image",
            });
            expect(button).not.toBeInTheDocument();
        });

        it("should NOT render the explore image icon when the image widget upgrade feature flag is disabled and the image has a caption", async () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            longDescription: "widget long description",
                            caption: "widget caption",
                        }),
                    }),
                },
            });

            const apiOptionsWithFeatureFlag = {
                ...apiOptions,
                flags: getFeatureFlags({"image-widget-upgrade": false}),
            };

            renderQuestion(imageQuestion, apiOptionsWithFeatureFlag);
            markImagesAsLoaded(); // Simulate image loading completion

            // Assert
            const iconButton = screen.queryByRole("button", {
                name: "Explore image",
            });
            expect(iconButton).not.toBeInTheDocument();
        });
    });
});
