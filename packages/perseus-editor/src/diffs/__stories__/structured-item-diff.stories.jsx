// @flow

import * as React from "react";

import StructuredItemDiff from "../structured-item-diff.jsx";

import Wrapper from "./perseus-diff-wrapper.jsx";

import("../../styles/perseus-editor.less");

type StoryArgs = {||};

type Story = {|
    title: string,
    decorators: $ReadOnlyArray<
        (StoryComponent: typeof React.Component) => React.Node,
    >,
|};

export default ({
    title: "Perseus/Editor/Diffs/Structured Item Diff",
    decorators: [
        (StoryComponent) => (
            <Wrapper>
                <StoryComponent />
            </Wrapper>
        ),
    ],
}: Story);

const tags = {
    a: "a tag",
    b: "b tag",
    c: "c tag",
};

export const ContentAdded = (args: StoryArgs): React.Node => {
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
    };

    return <StructuredItemDiff {...props} />;
};

// second instance
export const ContentAddedRemovedAndChanged = (args: StoryArgs): React.Node => {
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
    };
    return <StructuredItemDiff {...props} />;
};

// third instance
export const MiscContentChanges = (args: StoryArgs): React.Node => {
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
    };

    return <StructuredItemDiff {...props} />;
};

// fourth
export const ContentRemoved = (args: StoryArgs): React.Node => {
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
    };

    return <StructuredItemDiff {...props} />;
};
