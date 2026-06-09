import {
    generateTestPerseusRenderer,
    generateVideoWidget,
    type PerseusVideoWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusVideoWidgetOptions> = {
    title: "Widgets/Video/Widget Demo",
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Block and full-width video widgets in the same article.
 */
export const AllAlignmentsInSameArticle: Story = {
    render: function Render() {
        return (
            <div className="framework-perseus perseus-article">
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({
                        content: `Block video\n\n[[☃ video 1]]\n\nFull-width video\n\n[[☃ video 2]]`,
                        widgets: {
                            "video 1": generateVideoWidget({
                                alignment: "block",
                                options: {
                                    location:
                                        "https://youtube.com/embed/7mH6Mal6Oh8?rel=0&controls=0",
                                },
                            }),
                            "video 2": generateVideoWidget({
                                alignment: "full-width",
                                options: {
                                    location:
                                        "https://youtube.com/embed/7mH6Mal6Oh8?rel=0&controls=0",
                                },
                            }),
                        },
                    })}
                />
            </div>
        );
    },
};

/**
 * Block and full-width video widgets in the same article on mobile.
 */
export const AllAlignmentsInSameArticleMobile: Story = {
    render: function Render() {
        return (
            <div className="framework-perseus perseus-mobile perseus-article">
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({
                        content: `Block video\n\n[[☃ video 1]]\n\nFull-width video\n\n[[☃ video 2]]`,
                        widgets: {
                            "video 1": generateVideoWidget({
                                alignment: "block",
                                options: {
                                    location:
                                        "https://youtube.com/embed/7mH6Mal6Oh8?rel=0&controls=0",
                                },
                            }),
                            "video 2": generateVideoWidget({
                                alignment: "full-width",
                                options: {
                                    location:
                                        "https://youtube.com/embed/7mH6Mal6Oh8?rel=0&controls=0",
                                },
                            }),
                        },
                    })}
                />
            </div>
        );
    },
};
