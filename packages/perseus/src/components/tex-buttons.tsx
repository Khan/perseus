/* eslint-disable @khanacademy/ts-no-error-suppressions */
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import {getDependencies} from "../dependencies";

import type {LegacyButtonSets} from "../perseus-types";
import type {Keys} from "@khanacademy/math-input";

const prettyBig = {fontSize: "150%"} as const;
const slightlyBig = {fontSize: "120%"} as const;
const symbStyle = {fontSize: "130%"} as const;

type ButtonSet = (props: any) => [
    // inside of button
    React.ReactNode,
    // the key message it sends on click
    Keys,
    // label
    string,
];

type ButtonSets = {
    readonly [key in LegacyButtonSets[number]]: ReadonlyArray<ButtonSet>;
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
        "PLUS",
        i18n._("Plus"),
    ],
    () => [
        <span key="minus" style={prettyBig}>
            -
        </span>,
        "MINUS",
        i18n._("Minus"),
    ],

    // TODO(joel) - display as \cdot when appropriate
    (props: any) => {
        const {TeX} = getDependencies();
        if (props.convertDotToTimes) {
            return [
                <TeX key="times" style={prettyBig}>
                    {i18n.doNotTranslate("\\times")}
                </TeX>,
                "TIMES",
                i18n._("Multiply"),
            ];
        }
        return [
            <TeX key="times" style={prettyBig}>
                {i18n.doNotTranslate("\\cdot")}
            </TeX>,
            "CDOT",
            i18n._("Multiply"),
        ];
    },
    () => {
        const {TeX} = getDependencies();
        return [
            <TeX key="frac" style={prettyBig}>
                {i18n.doNotTranslate("\\frac{x}{y}")}
            </TeX>,
            "FRAC",
            i18n._("Fraction, excluding the current expression"),
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
                "DIVIDE",
                i18n._("Divide"),
            ];
        },
    ]),

    trig: [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="sin">{i18n.doNotTranslate("\\sin")}</TeX>,
                "SIN",
                i18n._("Sine"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="cos">{i18n.doNotTranslate("\\cos")}</TeX>,
                "COS",
                i18n._("Cosine"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="tan">{i18n.doNotTranslate("\\tan")}</TeX>,
                "TAN",
                i18n._("Tangent"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="theta" style={symbStyle}>
                    {i18n.doNotTranslate("\\theta")}
                </TeX>,
                "THETA",
                i18n._("Theta"),
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
                "PHI",
                i18n._("Phi"),
            ];
        },
    ],

    prealgebra: [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="sqrt">{i18n.doNotTranslate("\\sqrt{x}")}</TeX>,
                "SQRT",
                i18n._("Square root"),
            ];
        },
        // TODO(joel) - how does desmos do this?
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="nthroot">{i18n.doNotTranslate("\\sqrt[3]{x}")}</TeX>,
                "NTHROOT3",
                i18n._("Cube root"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="pow" style={slightlyBig}>
                    {i18n.doNotTranslate("a^b")}
                </TeX>,
                "POW",
                i18n._("Exponent"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="pi" style={slightlyBig}>
                    {i18n.doNotTranslate("\\pi")}
                </TeX>,
                "PI",
                i18n._("Pi"),
            ];
        },
    ],

    logarithms: [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="log">{i18n.doNotTranslate("\\log")}</TeX>,
                "LOG",
                i18n._("Logarithm with base 10"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="ln">{i18n.doNotTranslate("\\ln")}</TeX>,
                "LN",
                i18n._("Natural logarithm"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="log_b">{i18n.doNotTranslate("\\log_b")}</TeX>,
                "LOG_B",
                i18n._("Logarithm with custom base"),
            ];
        },
    ],

    "basic relations": [
        () => {
            const {TeX} = getDependencies();
            return [<TeX key="eq">{"="}</TeX>, "EQUAL", i18n._("Equals sign")];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="lt">{i18n.doNotTranslate("\\lt")}</TeX>,
                "LT",
                i18n._("Less than sign"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="gt">{i18n.doNotTranslate("\\gt")}</TeX>,
                "GT",
                i18n._("Greater than sign"),
            ];
        },
    ],

    "advanced relations": [
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="neq">{i18n.doNotTranslate("\\neq")}</TeX>,
                "NEQ",
                i18n._("Not-equals sign"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="leq">{i18n.doNotTranslate("\\leq")}</TeX>,
                "LEQ",
                i18n._("Less than or equal to sign"),
            ];
        },
        () => {
            const {TeX} = getDependencies();
            return [
                <TeX key="geq">{i18n.doNotTranslate("\\geq")}</TeX>,
                "GEQ",
                i18n._("Greater than or equal to sign"),
            ];
        },
    ],
};

export type ButtonSetsType = ReadonlyArray<keyof typeof buttonSets>;

type Props = {
    sets: ButtonSetsType;
    onInsert: (key: Keys) => void;
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
                        // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'. | TS2339 - Property 'key' does not exist on type 'boolean | ReactChild | ReactFragment | ReactPortal'.
                        key={symbol[0].key}
                        type="button"
                        aria-label={symbol[2]}
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
