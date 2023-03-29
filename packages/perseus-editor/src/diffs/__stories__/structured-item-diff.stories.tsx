import * as React from "react";

import StructuredItemDiff from "../structured-item-diff";

// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module './perseus-diff-wrapper' or its corresponding type declarations.
import Wrapper from "./perseus-diff-wrapper";

// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../../styles/perseus-editor.less' or its corresponding type declarations.
import("../../styles/perseus-editor.less");

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
    decorators: ReadonlyArray<
        (StoryComponent: typeof React.Component) => React.ReactElement
    >;
};

export default {
    title: "Perseus/Editor/Diffs/Structured Item Diff",
    decorators: [
        (StoryComponent) => (
            <Wrapper>
                <StoryComponent />
            </Wrapper>
        ),
    ],
} as Story;

const tags = {
    a: "a tag",
    b: "b tag",
    c: "c tag",
} as const;

export const ContentAdded: React.FC<StoryArgs> = (args): React.ReactElement => {
    const props = {
        before: {
            _multi: {
                directions: {
                    __type: "content",
                    content: "",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "",
                    images: {},
                    widgets: {},
                },
                hints: [],
                questions: [],
            },
        },
        after: {
            _multi: {
                directions: {
                    type: "content",
                    content: "directions",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "passage",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "overview",
                    images: {},
                    widgets: {},
                },
                hints: [
                    {
                        type: "hint",
                        content: "hint 1",
                        images: {},
                        widgets: {},
                    },
                ],
                questions: [
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "b"],
                    },
                ],
            },
        },
        shape: {
            type: "object",
            shape: {
                directions: {
                    type: "content",
                },
                overview: {
                    type: "content",
                },
                passage: {
                    type: "content",
                },
                hints: {
                    type: "array",
                    elementShape: {
                        type: "hint",
                    },
                },
                questions: {
                    type: "array",
                    elementShape: {
                        type: "object",
                        shape: {
                            tags: {type: "tags"},
                            question: {
                                type: "content",
                            },
                            overview: {
                                type: "content",
                            },
                            keepInMind: {
                                type: "content",
                            },
                            hints: {
                                type: "array",
                                elementShape: {
                                    type: "hint",
                                },
                            },
                        },
                    },
                },
            },
        },
        tags: {
            idToName: (id) => tags[id],
            nameToId: (name) => name[0],
            names: ["a tag", "b tag", "c tag"],
        },
    } as const;

    return <StructuredItemDiff {...props} />;
};

// second instance
export const ContentAddedRemovedAndChanged: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    const props = {
        before: {
            _multi: {
                directions: {
                    __type: "content",
                    content: "directions",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "passage",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "overview",
                    images: {},
                    widgets: {},
                },
                hints: [
                    {
                        type: "hint",
                        content: "hint 1",
                        images: {},
                        widgets: {},
                    },
                    {
                        type: "hint",
                        content: "hint 2",
                        images: {},
                        widgets: {},
                    },
                ],
                questions: [
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "b"],
                    },
                ],
            },
        },
        after: {
            _multi: {
                directions: {
                    type: "content",
                    content: "directions",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "passage",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "overview",
                    images: {},
                    widgets: {},
                },
                hints: [
                    {
                        type: "hint",
                        content: "hint 1",
                        images: {},
                        widgets: {},
                    },
                ],
                questions: [
                    {
                        hints: [],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question edited",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "c"],
                    },
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "b"],
                    },
                ],
            },
        },
        shape: {
            type: "object",
            shape: {
                directions: {
                    type: "content",
                },
                overview: {
                    type: "content",
                },
                passage: {
                    type: "content",
                },
                hints: {
                    type: "array",
                    elementShape: {
                        type: "hint",
                    },
                },
                questions: {
                    type: "array",
                    elementShape: {
                        type: "object",
                        shape: {
                            tags: {type: "tags"},
                            question: {
                                type: "content",
                            },
                            overview: {
                                type: "content",
                            },
                            keepInMind: {
                                type: "content",
                            },
                            hints: {
                                type: "array",
                                elementShape: {
                                    type: "hint",
                                },
                            },
                        },
                    },
                },
            },
        },
        tags: {
            idToName: (id) => tags[id],
            nameToId: (name) => name[0],
            names: ["a tag", "b tag", "c tag"],
        },
    } as const;
    return <StructuredItemDiff {...props} />;
};

// third instance
export const MiscContentChanges: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    const props = {
        before: {
            _multi: {
                directions: {
                    __type: "content",
                    content: "directions",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "passage",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "overview",
                    images: {},
                    widgets: {},
                },
                hints: [
                    {
                        type: "hint",
                        content: "hint 1",
                        images: {},
                        widgets: {},
                    },
                    {
                        type: "hint",
                        content: "hint 2",
                        images: {},
                        widgets: {},
                    },
                    {
                        type: "hint",
                        content: "hint 3",
                        images: {},
                        widgets: {},
                    },
                ],
                questions: [
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                            {
                                type: "hint",
                                content: "question hint 2",
                                images: {},
                                widgets: {},
                            },
                            {
                                type: "hint",
                                content: "question hint 3",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question edited",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "c"],
                    },
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "b"],
                    },
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "b"],
                    },
                ],
            },
        },
        after: {
            _multi: {
                directions: {
                    __type: "content",
                    content: "directions",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "passage",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "overview",
                    images: {},
                    widgets: {},
                },
                hints: [
                    {
                        type: "hint",
                        content: "hint 1",
                        images: {},
                        widgets: {},
                    },
                    {
                        type: "hint",
                        content: "hint 2",
                        images: {},
                        widgets: {},
                    },
                ],
                questions: [
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1 edited",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question edited",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "c"],
                    },
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "b"],
                    },
                ],
            },
        },
        shape: {
            type: "object",
            shape: {
                directions: {
                    type: "content",
                },
                overview: {
                    type: "content",
                },
                passage: {
                    type: "content",
                },
                hints: {
                    type: "array",
                    elementShape: {
                        type: "hint",
                    },
                },
                questions: {
                    type: "array",
                    elementShape: {
                        type: "object",
                        shape: {
                            tags: {type: "tags"},
                            question: {
                                type: "content",
                            },
                            overview: {
                                type: "content",
                            },
                            keepInMind: {
                                type: "content",
                            },
                            hints: {
                                type: "array",
                                elementShape: {
                                    type: "hint",
                                },
                            },
                        },
                    },
                },
            },
        },
        tags: {
            idToName: (id) => tags[id],
            nameToId: (name) => name[0],
            names: ["a tag", "b tag", "c tag"],
        },
    } as const;

    return <StructuredItemDiff {...props} />;
};

// fourth
export const ContentRemoved: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    const props = {
        before: {
            _multi: {
                directions: {
                    __type: "content",
                    content: "directions",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "passage",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "overview",
                    images: {},
                    widgets: {},
                },
                hints: [
                    {
                        type: "hint",
                        content: "hint 1",
                        images: {},
                        widgets: {},
                    },
                    {
                        type: "hint",
                        content: "hint 2",
                        images: {},
                        widgets: {},
                    },
                ],
                questions: [
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1 edited",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question edited",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "c"],
                    },
                    {
                        hints: [
                            {
                                type: "hint",
                                content: "question hint 1",
                                images: {},
                                widgets: {},
                            },
                        ],
                        keepInMind: {
                            type: "content",
                            content: "keep in mind",
                            images: {},
                            widgets: {},
                        },
                        overview: {
                            type: "content",
                            content: "overview",
                            images: {},
                            widgets: {},
                        },
                        question: {
                            type: "content",
                            content: "question",
                            images: {},
                            widgets: {},
                        },
                        tags: ["a", "b"],
                    },
                ],
            },
        },
        after: {
            _multi: {
                directions: {
                    __type: "content",
                    content: "",
                    images: {},
                    widgets: {},
                },
                passage: {
                    type: "content",
                    content: "",
                    images: {},
                    widgets: {},
                },
                overview: {
                    type: "content",
                    content: "",
                    images: {},
                    widgets: {},
                },
                hints: [],
                questions: [],
            },
        },
        shape: {
            type: "object",
            shape: {
                directions: {
                    type: "content",
                },
                overview: {
                    type: "content",
                },
                passage: {
                    type: "content",
                },
                hints: {
                    type: "array",
                    elementShape: {
                        type: "hint",
                    },
                },
                questions: {
                    type: "array",
                    elementShape: {
                        type: "object",
                        shape: {
                            tags: {type: "tags"},
                            question: {
                                type: "content",
                            },
                            overview: {
                                type: "content",
                            },
                            keepInMind: {
                                type: "content",
                            },
                            hints: {
                                type: "array",
                                elementShape: {
                                    type: "hint",
                                },
                            },
                        },
                    },
                },
            },
        },
        tags: {
            idToName: (id) => tags[id],
            nameToId: (name) => name[0],
            names: ["a tag", "b tag", "c tag"],
        },
    } as const;

    return <StructuredItemDiff {...props} />;
};
