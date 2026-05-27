import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
    type PerseusImageWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ApiOptions} from "../../../perseus-api";
import {getFeatureFlags} from "../../../testing/feature-flags-util";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {
    mobileDecorator,
    articleDecorator,
    mobileArticleDecorator,
    rtlDecorator,
    articleFloatLeftDecorator,
    articleFloatRightDecorator,
    mobileArticleFloatRightDecorator,
    mobileArticleFloatLeftDecorator,
} from "../../__testutils__/story-decorators";
import {
    earthMoonImage,
    frescoImage,
    gifImage,
    gifImageAlt,
    graphieImage,
    graphieImageAlt,
    nonAnimatedGifImage,
    nonAnimatedGifImageAlt,
    portraitImage,
    portraitImageCaption,
    portraitImageLongDescription,
    portraitImageTitle,
    scienceImage,
    scienceImageAlt,
    scienceImageCaption,
    svgImage,
} from "../utils";

import {imageRendererDecorator} from "./image-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";
const frescsoLongDescription =
    "In the apse, or semicircular recess, The Offer of the Casa Madre to Victory (L’Offerta della Casa Madre alla Vittoria) fresco recalls medieval apse decorative schemes with Christ surrounded by saints to whom the Church is dedicated. Santagata replaced Mary with a triumphant and wingless figure representing Victory, and he replaced saints with sentries. The charismatic wounded veteran Carlo Delcroix, who became the AMNIG president, is depicted presenting a model of the Casa Madre to Victory (not unlike the medieval patron Enrico Scrovegni, who offered the Arena chapel he commissioned to the Virgin Mary).\n\nThis image has some stuff in it. *Here is some italic text.* **Here is some bold text.**";

const articleContent = `But in other cases, an object may experience a centripetal force for an extended time and complete *repeated* revolutions. An example of this type of motion is an astronomical object in **orbit**.\n\n[[☃ image 1]]\n\nLet's explore some of the language and relationships involved in orbital motion.`;

const meta: Meta<PerseusImageWidgetOptions> = {
    title: "Widgets/Image/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Image widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Image: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
};

export const ImageWithCaptionAndLongDescription: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const ImageWithLongDescription: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const ImageWithTitle: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        title: "Earth and Moon",
    },
};

export const MobileImage: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        title: "Earth and Moon",
        alt: "Earth and Moon",
    },
};

export const MobileImageWithCaptionAndLongDescription: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const MobileImageWithLongDescription: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const MobileImageWithTitle: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        title: "Earth and Moon",
    },
};

export const PortraitImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: portraitImage,
        caption: portraitImageCaption,
        title: portraitImageTitle,
        longDescription: portraitImageLongDescription,
    },
};

export const WithinArticle: Story = {
    decorators: [imageRendererDecorator, articleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleWithCaptionAndTitle: Story = {
    decorators: [imageRendererDecorator, articleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        caption: earthMoonImageCaption,
        title: "Earth and Moon",
    },
};

export const WithinArticleMobile: Story = {
    decorators: [imageRendererDecorator, mobileArticleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleMobileCaptionAndTitle: Story = {
    decorators: [imageRendererDecorator, mobileArticleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        caption: earthMoonImageCaption,
        title: "Earth and Moon",
    },
};

export const RightToLeftImage: Story = {
    decorators: [imageRendererDecorator, rtlDecorator],
    args: {
        alt: "Fresco of some people",
        title: "The Offer of the Casa Madre to Victory, 1932",
        caption:
            "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, The Offer of the Casa Madre to Victory, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
        longDescription: frescsoLongDescription,
        backgroundImage: frescoImage,
    },
};

export const RightToLeftImageMobile: Story = {
    decorators: [
        imageRendererDecorator,
        mobileDecorator,
        (Story) => (
            <div style={{direction: "rtl"}}>
                <Story />
            </div>
        ),
    ],
    args: {
        alt: "Fresco of some people",
        title: "The Offer of the Casa Madre to Victory, 1932",
        caption:
            "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, The Offer of the Casa Madre to Victory, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
        longDescription: frescsoLongDescription,
        backgroundImage: frescoImage,
    },
};

export const DecorativeImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
        decorative: true,
    },
};

export const DecorativeImageMobile: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
        decorative: true,
    },
};

export const FloatLeftImageWithinArticle: Story = {
    decorators: [imageRendererDecorator, articleFloatLeftDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
    },
};

export const FloatRightImageWithinArticle: Story = {
    decorators: [imageRendererDecorator, articleFloatRightDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
    },
};

export const FloatLeftImageWithinArticleMobile: Story = {
    decorators: [imageRendererDecorator, mobileArticleFloatLeftDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
    },
};

export const FloatRightImageWithinArticleMobile: Story = {
    decorators: [imageRendererDecorator, mobileArticleFloatRightDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
    },
};

export const ImageWithoutWidthOrHeight: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: earthMoonImage.url},
        alt: "Earth and Moon",
        title: "Earth and Moon",
    },
};

export const ImageWithoutWidthOrHeightWithCaption: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: earthMoonImage.url},
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
};

export const ImageWithoutWidthOrHeightWithCaptionTitleAndLongDescription: Story =
    {
        decorators: [imageRendererDecorator],
        args: {
            backgroundImage: {url: earthMoonImage.url},
            alt: "Earth and Moon",
            title: "Hello world. Testing this with a super duper extra long, longest title",
            caption: earthMoonImageCaption,
            longDescription:
                "This is a *very* long description of the earth and moon.",
        },
    };

export const ImageWithoutWidthOrHeightLarge: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: frescoImage.url},
        alt: "Fresco painting",
    },
};

export const TallGifImage: Story = {
    decorators: [imageRendererDecorator],
    parameters: {
        apiOptions: {
            ...ApiOptions.defaults,
            flags: getFeatureFlags({
                "image-widget-upgrade-gif-controls": true,
            }),
        },
    },
    args: {
        backgroundImage: {
            url: "https://cdn.kastatic.org/ka-content-images/1e6f6fd4de01058c3d548b7a942bd9e76d565fa3.gif",
        },
        alt: gifImageAlt,
        caption: gifImageAlt,
        longDescription: gifImageAlt,
    },
};

export const GraphieImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: graphieImage,
        alt: "Graphie image",
        title: "Graphie image",
    },
};

export const TallImageWithCaption: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: portraitImage,
        alt: "Portrait image",
        caption: portraitImageCaption,
    },
};

export const LandscapeImageWithCaption: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: frescoImage,
        alt: "Fresco painting",
        caption:
            "Antonio Giuseppe Santagata, *The Offer of the Casa Madre to Victory*, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
    },
};

export const SvgImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: svgImage,
        alt: "SVG image",
        title: "SVG image",
    },
};

export const PngImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
    },
};

export const MobileGifImage: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    parameters: {
        apiOptions: {
            ...ApiOptions.defaults,
            flags: getFeatureFlags({
                "image-widget-upgrade-gif-controls": true,
            }),
        },
    },
    args: {
        backgroundImage: gifImage,
        alt: gifImageAlt,
        caption: gifImageAlt,
    },
};

export const NonAnimatedGifImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: nonAnimatedGifImage,
        alt: nonAnimatedGifImageAlt,
    },
};

export const LongDescriptionRightToLeft: Story = {
    decorators: [imageRendererDecorator, rtlDecorator],
    args: {
        backgroundImage: frescoImage,
        alt: "Fresco painting",
        longDescription:
            "This is a *very* long description of the fresco painting in RTL mode.",
    },
};

/**
 * Image widgets within a markdown table.
 */
export const MarkdownTableWithImageWidgets: Story = {
    render: function Render() {
        return (
            // Limit width so zoom becomes possible.
            <div style={{width: 600}}>
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({
                        content:
                            "| col 1 | col 2 | col 3 |\n| --- | --- | --- |\n| [[☃ image 1]] | [[☃ image 2]] | [[☃ image 3]] |",
                        widgets: {
                            "image 1": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: frescoImage,
                                    alt: "Fresco painting",
                                }),
                            }),
                            "image 2": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: earthMoonImage,
                                    alt: "Earth and Moon",
                                }),
                            }),
                            "image 3": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: graphieImage,
                                    alt: graphieImageAlt,
                                }),
                            }),
                        },
                    })}
                />
            </div>
        );
    },
};

/**
 * Markdown images within a markdown table.
 */
export const MarkdownTableWithMarkdownImages: Story = {
    render: function Render() {
        return (
            // Limit width so zoom becomes possible.
            <div style={{width: 600}}>
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({
                        content: `| col 1 | col 2 | col 3 |\n| --- | --- | --- |\n| ![Fresco painting](${frescoImage.url}) | ![Earth and Moon](${earthMoonImage.url}) | ![Graphie image](${graphieImage.url}) |`,
                        widgets: {},
                    })}
                />
            </div>
        );
    },
};

/**
 * Two image widgets in the same article, one floated left and one floated
 * right, to catch regressions in how floated images interact within a single
 * article layout.
 */
export const FloatLeftAndFloatRightImagesInSameArticle: Story = {
    render: function Render() {
        return (
            <div className="framework-perseus perseus-article">
                <div className="paragraph">
                    <div className="perseus-widget-container widget-nohighlight widget-wrap-left">
                        <QuestionRendererForStories
                            question={generateTestPerseusRenderer({
                                content: "[[☃ image 1]]",
                                widgets: {
                                    "image 1": generateImageWidget({
                                        options: generateImageOptions({
                                            backgroundImage: scienceImage,
                                            alt: scienceImageAlt,
                                            caption: scienceImageCaption,
                                        }),
                                    }),
                                },
                            })}
                        />
                    </div>
                    <div className="perseus-widget-container widget-nohighlight widget-wrap-right">
                        <QuestionRendererForStories
                            question={generateTestPerseusRenderer({
                                content: "[[☃ image 1]]",
                                widgets: {
                                    "image 1": generateImageWidget({
                                        options: generateImageOptions({
                                            backgroundImage: earthMoonImage,
                                            alt: "Earth and Moon",
                                            caption: earthMoonImageCaption,
                                        }),
                                    }),
                                },
                            })}
                        />
                    </div>
                    Prophase (sometimes divided into prophase and prometaphase)
                    is the first stage of mitosis, the process by which a
                    eukaryotic cell separates the chromosomes in its cell
                    nucleus into two identical sets in two daughter nuclei.
                </div>
                <div className="paragraph">
                    Chromosomes: In prophase, the chromosomes condense, forming
                    the characteristic “X” shape that is often shown in
                    diagrams. Each “X” is a duplicated chromosome. The two sides
                    of the “X” are called sister chromatids, and they are
                    attached at a point called the centromere. Even though the
                    chromosome has been copied at this point of the cell cycle,
                    as long as the two copies (sister chromatids) are attached,
                    they are considered a single chromosome.
                </div>
                <div className="paragraph">
                    The nucleolus (a structure inside the nucleus where
                    ribosomes are made) disappears during prophase. The mitotic
                    spindle begins to form during prophase, starting at regions
                    called centrosomes. These regions contain the material
                    needed for building the spindle, and also function to
                    regulate the spindle throughout mitosis.
                </div>
            </div>
        );
    },
};
