/* eslint-disable react/forbid-prop-types, react/sort-comp */
import {components} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, PropCheckBox, TextListEditor} = components;

type Props = any;

class MatcherEditor extends React.Component<Props> {
    static propTypes = {
        left: PropTypes.array,
        right: PropTypes.array,
        labels: PropTypes.array,
        orderMatters: PropTypes.bool,
        padding: PropTypes.bool,
    };

    static widgetName = "matcher" as const;

    static defaultProps: Props = {
        left: ["$x$", "$y$", "$z$"],
        right: ["$1$", "$2$", "$3$"],
        labels: ["test", "label"],
        orderMatters: false,
        padding: true,
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
                    <PropCheckBox
                        label="Order of the matched pairs matters:"
                        orderMatters={this.props.orderMatters}
                        onChange={this.props.onChange}
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
                    <PropCheckBox
                        label="Padding:"
                        padding={this.props.padding}
                        onChange={this.props.onChange}
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
}

export default MatcherEditor;
