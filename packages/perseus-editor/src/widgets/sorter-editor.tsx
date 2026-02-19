/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/forbid-prop-types */
import {components} from "@khanacademy/perseus";
import {type SorterDefaultWidgetOptions} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, TextListEditor} = components;

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

type Props = any;

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a sorter widget that allows users to arrange items in a specific order.
 */
class SorterEditor extends React.Component<Props> {
    static propTypes = {
        correct: PropTypes.array,
        layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        padding: PropTypes.bool,
    };

    static widgetName = "sorter" as const;

    onLayoutChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        this.props.onChange({layout: e.target.value});
    };

    serialize: (arg1: any) => void = () => {
        return _.pick(this.props, "correct", "layout", "padding");
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
                    // eslint-disable-next-line react/jsx-no-bind
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
