import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

type Story = {
    title: string;
    args: StoryArgs;
};

type StoryArgs = Record<any, any>;

export default {
    title: "Perseus/Widgets/Show Your Work",
    args: {},
} as Story;

export const BasicEquation = (args: StoryArgs): React.ReactElement => {
    return (
        <RendererWithDebugUI
            question={{
                content: "[[\u2603 show-your-work 1]]",
                images: {},
                widgets: {
                    "show-your-work 1": {
                        graded: true,
                        version: {
                            major: 0,
                            minor: 0,
                        },
                        static: false,
                        type: "show-your-work",
                        options: {
                            problem: {
                                problemType: "SolveEquation",
                                equation: "2x+5=10",
                                variable: "x",
                            },
                        },
                        alignment: "default",
                    },
                },
            }}
        />
    );
};

export const CustomEquation = (args: StoryArgs): React.ReactElement => {
    const [equation, setEquation] = React.useState("2x+5=10");
    const [variable, setVariable] = React.useState("x");

    return (
        <View>
            <LabelMedium style={{paddingLeft: 24, paddingBottom: 8}}>
                NOTE: Equation must be entered using LaTeX syntax
            </LabelMedium>
            <View
                style={{
                    paddingLeft: 24,
                    alignItems: "center",
                    display: "grid",
                    gridTemplateColumns: "100px auto",
                    gridTemplateRows: "repeat(2, auto)",
                    gridGap: 8,
                    paddingBottom: 24,
                }}
            >
                <LabelMedium>Equation:</LabelMedium>
                <TextField
                    value={equation}
                    onChange={setEquation}
                    style={{width: 300}}
                />
                <LabelMedium>Variable:</LabelMedium>
                <TextField
                    value={variable}
                    onChange={setVariable}
                    style={{width: 100}}
                />
            </View>
            <RendererWithDebugUI
                key={`${variable}-${equation}`}
                question={{
                    content: "[[\u2603 show-your-work 1]]",
                    images: {},
                    widgets: {
                        "show-your-work 1": {
                            graded: true,
                            version: {
                                major: 0,
                                minor: 0,
                            },
                            static: false,
                            type: "show-your-work",
                            options: {
                                problem: {
                                    problemType: "SolveEquation",
                                    equation,
                                    variable,
                                },
                            },
                            alignment: "default",
                        },
                    },
                }}
            />
        </View>
    );
};

export const ShowYourWork1 = (args: StoryArgs): React.ReactElement => {
    return (
        <RendererWithDebugUI
            question={{
                content: "[[\u2603 show-your-work 1]]",
                images: {},
                widgets: {
                    "show-your-work 1": {
                        graded: true,
                        version: {
                            major: 0,
                            minor: 0,
                        },
                        // instead, Perseus renders an overlay <div /> over top of the
                        // widget that intercepts interactions to it.
                        static: false,
                        type: "show-your-work",
                        options: {
                            problem: {
                                problemType: "SolveEquation",
                                equation: "7b-15=5b-3",
                                variable: "b",
                            },
                        },
                        alignment: "default",
                    },
                },
            }}
        />
    );
};

export const ShowYourWork2 = (args: StoryArgs): React.ReactElement => {
    return (
        <RendererWithDebugUI
            question={{
                content: "[[\u2603 show-your-work 1]]",
                images: {},
                widgets: {
                    "show-your-work 1": {
                        graded: true,
                        version: {
                            major: 0,
                            minor: 0,
                        },
                        static: false,
                        type: "show-your-work",
                        options: {
                            problem: {
                                problemType: "SolveEquation",
                                equation: "16-2r=-3r+6r+1",
                                variable: "r",
                            },
                        },
                        alignment: "default",
                    },
                },
            }}
        />
    );
};
