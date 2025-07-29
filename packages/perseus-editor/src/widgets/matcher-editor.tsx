/* eslint-disable react/forbid-prop-types */
import {components} from "@khanacademy/perseus";
import {
    matcherLogic,
    type MatcherDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, TextListEditor} = components;

type Props = any;

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a matcher widget that allows users to match items from two different sets.
 */
class MatcherEditor extends React.Component<Props> {
    static propTypes = {
        left: PropTypes.array,
        right: PropTypes.array,
        labels: PropTypes.array,
        orderMatters: PropTypes.bool,
        padding: PropTypes.bool,
    };

    static widgetName = "matcher" as const;

    static defaultProps: MatcherDefaultWidgetOptions =
        matcherLogic.defaultWidgetOptions;

    onLabelChange: (
        arg1: number,
        arg2: React.ChangeEvent<HTMLInputElement>,
    ) => void = (index, e) => {
        const labels = _.clone(this.props.labels);
        labels[index] = e.target.value;
        this.props.onChange({labels: labels});
    };

    getSaveWarnings: () => ReadonlyArray<string> = () => {
        if (this.props.left.length !== this.props.right.length) {
            return [
                "The two halves of the matcher have different numbers" +
                    " of cards.",
            ];
        }
        return [];
    };

    serialize: any = () => {
        return _.pick(
            this.props,
            "left",
            "right",
            "labels",
            "orderMatters",
            "padding",
        );
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-matcher-editor">
                <div>
                    {" "}
                    Correct answer:{" "}
                    <InfoTip>
                        <p>
                            Enter the correct answers here. The preview on the
                            right will show the cards in a randomized order,
                            which is how the student will see them.
                        </p>
                    </InfoTip>
                </div>
                <div className="perseus-clearfix">
                    <TextListEditor
                        options={this.props.left}
                        onChange={(options, cb) => {
                            this.props.onChange({left: options}, cb);
                        }}
                        layout="vertical"
                    />
                    <TextListEditor
                        options={this.props.right}
                        onChange={(options, cb) => {
                            this.props.onChange({right: options}, cb);
                        }}
                        layout="vertical"
                    />
                </div>
                <span>
                    {" "}
                    Labels:{" "}
                    <InfoTip>
                        <p>These are entirely optional.</p>
                    </InfoTip>
                </span>
                <div>
                    <input
                        type="text"
                        defaultValue={this.props.labels[0]}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.onLabelChange.bind(this, 0)}
                    />
                    <input
                        type="text"
                        defaultValue={this.props.labels[1]}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.onLabelChange.bind(this, 1)}
                    />
                </div>
                <div>
                    <Checkbox
                        label="Order of the matched pairs matters:"
                        checked={this.props.orderMatters}
                        onChange={(value) => {
                            this.props.onChange({orderMatters: value});
                        }}
                    />
                    <InfoTip>
                        <p>
                            With this option enabled, only the order provided
                            above will be treated as correct. This is useful
                            when ordering is significant, such as in the context
                            of a proof.
                        </p>
                        <p>
                            If disabled, pairwise matching is sufficient. To
                            make this clear, the left column becomes fixed in
                            the provided order and only the cards in the right
                            column can be moved.
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

export default MatcherEditor;
