import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import {getDependencies} from "../dependencies";

const prettyBig = {fontSize: "150%"} as const;
const slightlyBig = {fontSize: "120%"} as const;
const symbStyle = {fontSize: "130%"} as const;

type Inserter = string | ((input: any) => void);
type ButtonSet = (props: any) => [React.ReactNode, Inserter];

type ButtonSets = {
    readonly [key: string]: ReadonlyArray<ButtonSet>;
};

// These are functions because we want to generate a new component for each use
// on the page rather than reusing an instance (which will cause an error).
// Also, it's useful for things which might look different depending on the
// props.

const basic: ReadonlyArray<ButtonSet> = [
    () => [
        <span key="plus" style={slightlyBig}>
            +
        </span>,
        "+",
    ],
    () => [
        <span key="minus" style={prettyBig}>
            -
        </span>,
        "-",
    ],

    // TODO(joel) - display as \cdot when appropriate
    (props: any) => {
        const {TeX} = getDependencies();
        if (props.convertDotToTimes) {
            return [
                <TeX key="times" style={prettyBig}>
                    {i18n.doNotTranslate("\\times")}
                </TeX>,
                "\\times",
            ];
        }
        return [
            <TeX key="times" style={prettyBig}>
                {i18n.doNotTranslate("\\cdot")}
            </TeX>,
            "\\cdot",
        ];
    },
    () => {
        const {TeX} = getDependencies();
        return [
            <TeX key="frac" style={prettyBig}>
                {i18n.doNotTranslate("\\frac{x}{y}")}
            </TeX>,

            // If there's something in the input that can become part of a
            // fraction, typing "/" puts it in the numerator. If not, typing
            // "/" does nothing. In that case, enter a \frac.
            (input: any) => {
                const contents = input.latex();
                input.typedText("/");
                if (input.latex() === contents) {
                    input.cmd("\\frac");
                }
            },
        ];
    },
];

const buttonSets: ButtonSets = {
    basic,

    "basic+div": basic.concat([
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="div">{i18n.doNotTranslate("\\div")}</TeX>,
                "\\div",
            ];
        },
    ]),

    trig: [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="sin">{i18n.doNotTranslate("\\sin")}</TeX>,
                "\\sin",
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="cos">{i18n.doNotTranslate("\\cos")}</TeX>,
                "\\cos",
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="tan">{i18n.doNotTranslate("\\tan")}</TeX>,
                "\\tan",
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="theta" style={symbStyle}>
                    {i18n.doNotTranslate("\\theta")}
                </TeX>,
                "\\theta",
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <span key="phi">
                    {/*NOTE: KaTeX does not render "phi" for screen readers*/}
                    <span className="perseus-sr-only">
                        {i18n.doNotTranslate("phi")}
                    </span>
                    <TeX key="pi" style={symbStyle}>
                        {i18n.doNotTranslate("\\phi")}
                    </TeX>
                </span>,
                "\\phi",
            ];
        },
    ],

    prealgebra: [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="sqrt">{i18n.doNotTranslate("\\sqrt{x}")}</TeX>,
                "\\sqrt",
            ];
        },
        // TODO(joel) - how does desmos do this?
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="nthroot">{i18n.doNotTranslate("\\sqrt[3]{x}")}</TeX>,
                (input: any) => {
                    input.typedText("nthroot3");
                    input.keystroke("Right");
                },
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="pow" style={slightlyBig}>
                    {i18n.doNotTranslate("a^b")}
                </TeX>,
                (input: any) => {
                    const contents = input.latex();
                    input.typedText("^");

                    // If the input hasn't changed (for example, if we're
                    // attempting to add an exponent on an empty input or an empty
                    // denominator), insert our own "a^b"
                    if (input.latex() === contents) {
                        input.typedText("a^b");
                    }
                },
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="pi" style={slightlyBig}>
                    {i18n.doNotTranslate("\\pi")}
                </TeX>,
                "\\pi",
            ];
        },
    ],

    logarithms: [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="log">{i18n.doNotTranslate("\\log")}</TeX>,
                "\\log",
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [<TeX key="ln">{i18n.doNotTranslate("\\ln")}</TeX>, "\\ln"];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="log_b">{i18n.doNotTranslate("\\log_b")}</TeX>,
                (input) => {
                    input.typedText("log_");
                    input.keystroke("Right");
                    input.typedText("(");
                    input.keystroke("Left");
                    input.keystroke("Left");
                },
            ];
        },
    ],

    "basic relations": [
        () => {
            const {TeX} = getDependencies();
            return [<TeX key="eq">{"="}</TeX>, "="];
        },
        () => {
            const {TeX} = getDependencies();
            return [<TeX key="lt">{i18n.doNotTranslate("\\lt")}</TeX>, "\\lt"];
        },
        () => {
            const {TeX} = getDependencies();
            return [<TeX key="gt">{i18n.doNotTranslate("\\gt")}</TeX>, "\\gt"];
        },
    ],

    "advanced relations": [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="neq">{i18n.doNotTranslate("\\neq")}</TeX>,
                "\\neq",
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="leq">{i18n.doNotTranslate("\\leq")}</TeX>,
                "\\leq",
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="geq">{i18n.doNotTranslate("\\geq")}</TeX>,
                "\\geq",
            ];
        },
    ],
};

export type ButtonSetsType = ReadonlyArray<keyof typeof buttonSets>;

type Props = {
    sets: ButtonSetsType;
    onInsert: (arg1: Inserter) => void;
    className?: string;
    convertDotToTimes?: boolean;
};

const buttonSetsPropType = PropTypes.arrayOf(
    PropTypes.oneOf(_(buttonSets).keys()),
);

class TexButtons extends React.Component<Props> {
    static buttonSets: typeof buttonSets = buttonSets;
    static buttonSetsType: any = buttonSetsPropType;

    render(): React.ReactNode {
        // Always show buttonSets in the same order. Note: Technically it's ok
        // for _.keys() to return the keys in an arbitrary order, but in
        // practice, they will be ordered as listed above.
        const sortedButtonSets = _.sortBy(this.props.sets, (setName) =>
            // @ts-expect-error [FEI-5003] - TS2345 - Argument of type 'string | number' is not assignable to parameter of type 'string'.
            _.keys(buttonSets).indexOf(setName),
        );

        const buttons = _(sortedButtonSets).map(
            (setName) => buttonSets[setName],
        );

        const buttonRows = _(buttons).map((row) =>
            row.map((symbGen) => {
                // create a (component, thing we should send to mathquill) pair
                const symbol = symbGen(this.props);
                return (
                    <button
                        onClick={() => this.props.onInsert(symbol[1])}
                        className="tex-button"
                        // @ts-expect-error [FEI-5003] - TS2533 - Object is possibly 'null' or 'undefined'. | TS2339 - Property 'key' does not exist on type 'boolean | ReactChild | ReactFragment | ReactPortal'.
                        key={symbol[0].key}
                        type="button"
                    >
                        {symbol[0]}
                    </button>
                );
            }),
        );

        const buttonPopup = _(buttonRows).map((row, i) => {
            return (
                <div
                    className="clearfix tex-button-row"
                    key={this.props.sets[i]}
                >
                    {row}
                </div>
            );
        });

        return (
            <div className={`${this.props.className || ""} preview-measure`}>
                {buttonPopup}
            </div>
        );
    }
}

export default TexButtons;
