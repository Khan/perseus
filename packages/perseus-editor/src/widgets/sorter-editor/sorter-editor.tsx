import {
    sorterLogic,
    type PerseusSorterWidgetOptions,
} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import TextListEditor from "../../components/text-list-editor";

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

type Props = PerseusSorterWidgetOptions & {
    onChange: (
        newOptions: Partial<PerseusSorterWidgetOptions>,
        callback?: () => void,
    ) => void;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a sorter widget that allows users to arrange items in a specific order.
 */
class SorterEditor extends React.Component<Props> {
    static widgetName = "sorter" as const;

    static defaultProps: PerseusSorterWidgetOptions =
        sorterLogic.defaultWidgetOptions;

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

    serialize: () => PerseusSorterWidgetOptions = () => {
        return {
            correct: this.props.correct,
            layout: this.props.layout,
            padding: this.props.padding,
        };
    };

    render(): React.ReactNode {
        const editor = this;

        return (
            <div>
                <div>
                    {" "}
                    Correct answer:{" "}
                    <InfoTip>
                        <p>
                            Enter the correct answer (in the correct order)
                            here. The preview on the right will have the cards
                            in a randomized order, which is how the student will
                            see them.
                        </p>
                    </InfoTip>
                </div>
                <TextListEditor
                    options={this.props.correct}
                    onChange={function (options, cb) {
                        editor.props.onChange({correct: options}, cb);
                    }}
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
                            and larger images.
                        </p>
                    </InfoTip>
                </div>
                <div>
                    <Checkbox
                        label="Padding:"
                        checked={this.props.padding}
                        onChange={(value) => {
                            this.props.onChange({padding: value});
                        }}
                    />
                    <InfoTip>
                        <p>
                            Padding is good for text, but not needed for images.
                        </p>
                    </InfoTip>
                </div>
            </div>
        );
    }
}

export default SorterEditor;
