import {
    ordererLogic,
    type PerseusOrdererWidgetOptions,
    type PerseusRenderer,
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

const toCard = (content: string): PerseusRenderer => ({
    content,
    widgets: {},
    images: {},
});

// Cards are displayed grouped by content: numbers first, then everything
// else, then bare variables and $tex$.
const getCategoryScore = (content: string): number => {
    if (/\d/.test(content)) {
        return 0;
    }
    if (/^\$?[a-zA-Z]+\$?$/.test(content)) {
        return 2;
    }
    return 1;
};

/**
 * The cards the student picks from: the correct answer and the distractors,
 * with duplicates and empty cards removed.
 */
export const mergeCards = (
    correctOptions: PerseusRenderer[],
    otherOptions: PerseusRenderer[],
): PerseusRenderer[] => {
    const allCards = [...correctOptions, ...otherOptions];

    return [...new Set(allCards.map((card) => card.content))]
        .filter((content) => content !== "")
        .sort()
        .sort((a, b) => getCategoryScore(a) - getCategoryScore(b))
        .map(toCard);
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
        const changedCards = options.map(toCard);
        const correctOptions =
            whichOptions === "correctOptions"
                ? changedCards
                : this.props.correctOptions;
        const otherOptions =
            whichOptions === "otherOptions"
                ? changedCards
                : this.props.otherOptions;

        this.props.onChange(
            {
                [whichOptions]: changedCards,
                options: mergeCards(correctOptions, otherOptions),
            },
            cb,
        );
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
