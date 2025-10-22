import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {getFeatureFlags} from "../../../../../testing/feature-flags-util";
import {mockImageLoading} from "../../../../../testing/image-loader-utils";
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
    let unmockImageLoading: () => void;

    const apiOptions: APIOptions = {
        isMobile,
        flags: getFeatureFlags({"image-widget-upgrade": true}),
    };

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        unmockImageLoading = mockImageLoading();
    });

    afterEach(() => {
        unmockImageLoading();
    });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
        act(() => {
            jest.runAllTimers();
        });

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
            act(() => {
                jest.runAllTimers();
            });

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
            act(() => {
                jest.runAllTimers();
            });

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
            act(() => {
                jest.runAllTimers();
            });

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
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            const iconButton = screen.queryByRole("button", {
                name: "Explore image",
            });
            expect(iconButton).not.toBeInTheDocument();
        });
    });

    describe("decorative images", () => {
        it("should render decorative image without title", () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            title: "widget title",
                            decorative: true,
                        }),
                    }),
                },
            });

            // Act
            renderQuestion(imageQuestion, apiOptions);
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.queryByText("widget title")).not.toBeInTheDocument();
        });

        it("should render decorative image without caption", () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            caption: "widget caption",
                            decorative: true,
                        }),
                    }),
                },
            });

            // Act
            renderQuestion(imageQuestion, apiOptions);
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(
                screen.queryByText("widget caption"),
            ).not.toBeInTheDocument();
        });

        it("should render decorative image without long description button", () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            longDescription: "widget long description",
                            decorative: true,
                        }),
                    }),
                },
            });

            // Act
            renderQuestion(imageQuestion, apiOptions);
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(
                screen.queryByRole("button", {name: "Explore image"}),
            ).not.toBeInTheDocument();
        });

        it("should render decorative image with empty alt text", () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            alt: "widget alt text",
                            decorative: true,
                        }),
                    }),
                },
            });

            // Act
            renderQuestion(imageQuestion, apiOptions);
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            // Decorative images have role="presentation" due to empty alt text
            const image = screen.getByRole("presentation");
            expect(image).toHaveAttribute("alt", "");
            expect(
                screen.queryByAltText("widget alt text"),
            ).not.toBeInTheDocument();
        });

        it("should render decorative image with all content hidden", () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            title: "widget title",
                            caption: "widget caption",
                            alt: "widget alt text",
                            longDescription: "widget long description",
                            decorative: true,
                        }),
                    }),
                },
            });

            // Act
            renderQuestion(imageQuestion, apiOptions);
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.queryByText("widget title")).not.toBeInTheDocument();
            expect(
                screen.queryByText("widget caption"),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByRole("button", {name: "Explore image"}),
            ).not.toBeInTheDocument();

            // Decorative images have role="presentation" due to empty alt text
            const image = screen.getByRole("presentation");
            expect(image).toHaveAttribute("alt", "");
            expect(
                screen.queryByAltText("widget alt text"),
            ).not.toBeInTheDocument();
        });

        it("should render non-decorative image with all content visible", () => {
            // Arrange
            const imageQuestion = generateTestPerseusRenderer({
                content: "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: earthMoonImage,
                            title: "widget title",
                            caption: "widget caption",
                            alt: "widget alt text",
                            longDescription: "widget long description",
                            decorative: false,
                        }),
                    }),
                },
            });

            // Act
            renderQuestion(imageQuestion, apiOptions);
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.getByText("widget title")).toBeVisible();
            expect(screen.getByText("widget caption")).toBeVisible();
            expect(
                screen.getByRole("button", {name: "Explore image"}),
            ).toBeVisible();
            expect(screen.getByAltText("widget alt text")).toBeVisible();
        });
    });

    it("should render image with float-left alignment", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    alignment: "float-left",
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "widget alt",
                        title: "widget title",
                        caption: "widget caption",
                    }),
                }),
            },
        });

        // Act, Assert
        const {container} = renderQuestion(imageQuestion, apiOptions);
        act(() => {
            jest.runAllTimers();
        });

        // Assert
        const figure = screen.getByRole("figure");
        expect(figure).toBeVisible();
        expect(container).toMatchSnapshot("widget-float-left");
    });

    it("should render image with float-right alignment", () => {
        // Arrange
        const imageQuestion = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    alignment: "float-right",
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "widget alt",
                        title: "widget title",
                        caption: "widget caption",
                    }),
                }),
            },
        });

        // Act, Assert
        const {container} = renderQuestion(imageQuestion, apiOptions);
        act(() => {
            jest.runAllTimers();
        });

        // Assert
        const figure = screen.getByRole("figure");
        expect(figure).toBeVisible();
        expect(container).toMatchSnapshot("widget-float-right");
    });
});
