import {
    mergeCards,
    ordererLogic,
    toCard,
    type PerseusOrdererWidgetOptions,
} from "@khanacademy/perseus-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import TextListEditor from "../../components/text-list-editor";
import {TypedSingleSelect} from "../../components/typed-single-select";

const NORMAL = "normal";
const AUTO = "auto";
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

interface Props extends PerseusOrdererWidgetOptions {
    onChange: (options: PerseusOrdererWidgetOptions) => void;
}

class OrdererEditor extends React.Component<Props> {
    static defaultProps: PerseusOrdererWidgetOptions =
        ordererLogic.defaultWidgetOptions;

    handleChange(changes: Partial<PerseusOrdererWidgetOptions>) {
        this.props.onChange({
            options: this.props.options,
            correctOptions: this.props.correctOptions,
            otherOptions: this.props.otherOptions,
            height: this.props.height,
            layout: this.props.layout,
            ...changes,
        });
    }

    onOptionsChange = (
        whichOptions: "correctOptions" | "otherOptions",
        options: string[],
    ) => {
        const changedCards = options.map(toCard);
        const correctOptions =
            whichOptions === "correctOptions"
                ? changedCards
                : this.props.correctOptions;
        const otherOptions =
            whichOptions === "otherOptions"
                ? changedCards
                : this.props.otherOptions;

        this.handleChange({
            [whichOptions]: changedCards,
            options: mergeCards(correctOptions, otherOptions),
        });
    };

    onLayoutChange = (layout: "horizontal" | "vertical") => {
        switch (layout) {
            case HORIZONTAL:
            case VERTICAL:
                this.handleChange({layout});
                break;
            default:
                throw new UnreachableCaseError(
                    layout,
                    `${layout} is not an available layout option`,
                );
        }
    };

    onHeightChange = (height: "normal" | "auto") => {
        switch (height) {
            case NORMAL:
            case AUTO:
                this.handleChange({height});
                break;
            default:
                throw new UnreachableCaseError(
                    height,
                    `${height} is not an available height option`,
                );
        }
    };

    serialize = (): PerseusOrdererWidgetOptions => {
        return {
            options: mergeCards(
                this.props.correctOptions,
                this.props.otherOptions,
            ),
            correctOptions: this.props.correctOptions,
            otherOptions: this.props.otherOptions,
            height: this.props.height,
            layout: this.props.layout,
        };
    };

    render(): React.ReactNode {
        return (
            <div>
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
                    onChange={(options) => {
                        this.onOptionsChange("correctOptions", options);
                    }}
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
                    onChange={(options) => {
                        this.onOptionsChange("otherOptions", options);
                    }}
                    layout={this.props.layout}
                />

                <div>
                    <label>
                        {" "}
                        Layout:{" "}
                        <TypedSingleSelect
                            style={{display: "inline-block"}}
                            selectedValue={this.props.layout}
                            onChange={this.onLayoutChange}
                            options={{
                                [HORIZONTAL]: "Horizontal",
                                [VERTICAL]: "Vertical",
                            }}
                        />
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
                        <TypedSingleSelect
                            style={{display: "inline-block"}}
                            selectedValue={this.props.height}
                            onChange={this.onHeightChange}
                            options={{
                                [NORMAL]: "Normal",
                                [AUTO]: "Automatic",
                            }}
                        />
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
