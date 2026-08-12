import {
    ordererLogic,
    type PerseusOrdererWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import TextListEditor from "../../components/text-list-editor";

const NORMAL = "normal";
const AUTO = "auto";
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

type Props = PerseusOrdererWidgetOptions & {
    onChange: (
        newOptions: Partial<PerseusOrdererWidgetOptions>,
        callback?: () => void,
    ) => void;
};

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
    static widgetName = "orderer" as const;

    static defaultProps: PerseusOrdererWidgetOptions =
        ordererLogic.defaultWidgetOptions;

    onOptionsChange: (
        arg1: "correctOptions" | "otherOptions",
        arg2: string[],
        arg3?: () => void,
    ) => void = (whichOptions, options, cb) => {
        const updatedOptions = getUpdatedOptions(
            this.props.correctOptions,
            this.props.otherOptions,
            whichOptions,
            options,
        );

        this.props.onChange(updatedOptions, cb);
    };

    onLayoutChange: (arg1: React.ChangeEvent<HTMLSelectElement>) => void = (
        e,
    ) => {
        const layout = e.target.value;
        switch (layout) {
            case HORIZONTAL:
            case VERTICAL:
                this.props.onChange({layout});
                break;
            default:
                throw new Error(`${layout} is not an available layout option`);
        }
    };

    onHeightChange: (arg1: React.ChangeEvent<HTMLSelectElement>) => void = (
        e,
    ) => {
        const height = e.target.value;
        switch (height) {
            case NORMAL:
            case AUTO:
                this.props.onChange({height});
                break;
            default:
                throw new Error(`${height} is not an available height option`);
        }
    };

    serialize: () => PerseusOrdererWidgetOptions = () => {
        // We combine the correct answer and the other cards by merging them,
        // removing duplicates and empty cards, and sorting them into
        // categories based on their content
        const {options} = getUpdatedOptions(
            this.props.correctOptions,
            this.props.otherOptions,
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
                    options={this.props.correctOptions.map(
                        (option) => option.content,
                    )}
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
                    options={this.props.otherOptions.map(
                        (option) => option.content,
                    )}
                    onChange={this.onOptionsChange.bind(this, "otherOptions")}
                    layout={this.props.layout}
                />

                <div>
                    <label>
                        {" "}
                        Layout:{" "}
                        <select
                            value={this.props.layout}
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
