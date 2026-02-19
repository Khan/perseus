/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/forbid-prop-types */
import {components} from "@khanacademy/perseus";
import {type OrdererDefaultWidgetOptions} from "@khanacademy/perseus-core";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, TextListEditor} = components;

const NORMAL = "normal";
const AUTO = "auto";
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

type Props = any;

export const getUpdatedOptions = (
    correctOptions: Array<{content: string}>,
    otherOptions: Array<{content: string}>,
    whichOptions?: string,
    options?: string[],
): Record<string, any> => {
    // Update the changed options by mapping the options to an array of objects with a content property
    const props: Record<string, any> = {};
    if (whichOptions && options !== undefined) {
        props[whichOptions] = options.map((option) => ({
            content: option,
        }));
    }

    // Get content from correctOptions (either updated or existing)
    const correctOptionsToUse =
        whichOptions === "correctOptions"
            ? props.correctOptions
            : correctOptions;

    // Get content from otherOptions (either updated or existing)
    const otherOptionsToUse =
        whichOptions === "otherOptions" ? props.otherOptions : otherOptions;

    // Combine all content items
    const allOptions = [...correctOptionsToUse, ...otherOptionsToUse];

    // Get unique content items
    const updatedOptions = [...new Set(allOptions.map((item) => item.content))]
        // filter out empty strings
        .filter((content) => content !== "")
        // Alphabetical sort
        .sort()
        // Category sort
        .sort((a, b) => {
            const getCategoryScore = (content) => {
                // 1. Any content that contains numbers
                if (/\d/.test(content)) {
                    return 0;
                }
                // 2. $tex$ or variables without any numbers
                if (/^\$?[a-zA-Z]+\$?$/.test(content)) {
                    return 2;
                }
                // 3. Everything else
                return 1;
            };
            return getCategoryScore(a) - getCategoryScore(b);
        })
        .map((content) => ({content}));

    return {
        ...props,
        options: updatedOptions,
    };
};

class OrdererEditor extends React.Component<Props> {
    static propTypes = {
        correctOptions: PropTypes.array,
        otherOptions: PropTypes.array,
        height: PropTypes.oneOf([NORMAL, AUTO]),
        layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        onChange: PropTypes.func.isRequired,
    };

    static widgetName = "orderer" as const;

    onOptionsChange: (
        arg1: "correctOptions" | "otherOptions",
        arg2: any,
        arg3: any,
    ) => any = (whichOptions, options, cb) => {
        const updatedOptions = getUpdatedOptions(
            this.props.correctOptions || [],
            this.props.otherOptions || [],
            whichOptions,
            options,
        );

        this.props.onChange(updatedOptions, cb);
    };

    onLayoutChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        this.props.onChange({layout: e.target.value});
    };

    onHeightChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        this.props.onChange({height: e.target.value});
    };

    serialize: () => any = () => {
        // We combine the correct answer and the other cards by merging them,
        // removing duplicates and empty cards, and sorting them into
        // categories based on their content
        const {options} = getUpdatedOptions(
            this.props.correctOptions || [],
            this.props.otherOptions || [],
        );

        return {
            options: options,
            correctOptions: this.props.correctOptions,
            otherOptions: this.props.otherOptions,
            height: this.props.height,
            layout: this.props.layout,
        };
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-widget-orderer">
                <div>
                    {" "}
                    Correct answer:{" "}
                    <InfoTip>
                        <p>
                            Place the cards in the correct order. The same card
                            can be used more than once in the answer but will
                            only be displayed once at the top of a stack of
                            identical cards.
                        </p>
                    </InfoTip>
                </div>
                <TextListEditor
                    options={_.pluck(this.props.correctOptions, "content")}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={this.onOptionsChange.bind(this, "correctOptions")}
                    layout={this.props.layout}
                />

                <div>
                    {" "}
                    Other cards:{" "}
                    <InfoTip>
                        <p>Create cards that are not part of the answer.</p>
                    </InfoTip>
                </div>
                <TextListEditor
                    options={_.pluck(this.props.otherOptions, "content")}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={this.onOptionsChange.bind(this, "otherOptions")}
                    layout={this.props.layout}
                />

                <div>
                    <label>
                        {" "}
                        Layout:{" "}
                        <select
                            value={this.props.layout}
                            // @ts-expect-error - TS2322 - Type '(arg1: ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'.
                            onChange={this.onLayoutChange}
                        >
                            <option value={HORIZONTAL}>Horizontal</option>
                            <option value={VERTICAL}>Vertical</option>
                        </select>
                    </label>
                    <InfoTip>
                        <p>
                            Use the horizontal layout for short text and small
                            images. The vertical layout is best for longer text
                            (e.g. proofs).
                        </p>
                    </InfoTip>
                </div>
                <div>
                    <label>
                        {" "}
                        Height:{" "}
                        <select
                            value={this.props.height}
                            // @ts-expect-error - TS2322 - Type '(arg1: ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'.
                            onChange={this.onHeightChange}
                        >
                            <option value={NORMAL}>Normal</option>
                            <option value={AUTO}>Automatic</option>
                        </select>
                    </label>
                    <InfoTip>
                        <p>
                            Use &quot;Normal&quot; for text,
                            &quot;Automatic&quot; for images.
                        </p>
                    </InfoTip>
                </div>
            </div>
        );
    }
}

export default OrdererEditor;
