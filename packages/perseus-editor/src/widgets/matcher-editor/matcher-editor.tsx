import {
    matcherLogic,
    type PerseusMatcherWidgetOptions,
} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import TextListEditor from "../../components/text-list-editor";

type Props = PerseusMatcherWidgetOptions & {
    onChange: (
        newOptions: Partial<PerseusMatcherWidgetOptions>,
        callback?: () => void,
    ) => void;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a matcher widget that allows users to match items from two different sets.
 */
class MatcherEditor extends React.Component<Props> {
    static defaultProps: PerseusMatcherWidgetOptions =
        matcherLogic.defaultWidgetOptions;

    onLabelChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const labels = [...this.props.labels];
        labels[index] = e.target.value;
        this.props.onChange({labels});
    };

    // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend uses
    // the new linter rules for save warnings.
    getSaveWarnings = (): string[] => {
        if (this.props.left.length !== this.props.right.length) {
            return [
                "The two halves of the matcher have different numbers" +
                    " of cards.",
            ];
        }
        return [];
    };

    serialize = (): PerseusMatcherWidgetOptions => {
        return {
            left: this.props.left,
            right: this.props.right,
            labels: this.props.labels,
            orderMatters: this.props.orderMatters,
            padding: this.props.padding,
        };
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
                        onChange={(options) => {
                            this.props.onChange({left: options});
                        }}
                        layout="vertical"
                    />
                    <TextListEditor
                        options={this.props.right}
                        onChange={(options) => {
                            this.props.onChange({right: options});
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
                        onChange={(e) => {
                            this.onLabelChange(0, e);
                        }}
                    />
                    <input
                        type="text"
                        defaultValue={this.props.labels[1]}
                        onChange={(e) => {
                            this.onLabelChange(1, e);
                        }}
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
