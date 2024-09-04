/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable one-var, react/forbid-prop-types */
import {components} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, TextListEditor} = components;

const NORMAL = "normal",
    AUTO = "auto",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical";

type Props = any;

class OrdererEditor extends React.Component<Props> {
    static propTypes = {
        correctOptions: PropTypes.array,
        otherOptions: PropTypes.array,
        height: PropTypes.oneOf([NORMAL, AUTO]),
        layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        onChange: PropTypes.func.isRequired,
    };

    static widgetName = "orderer" as const;

    static defaultProps: Props = {
        correctOptions: [{content: "$x$"}],
        otherOptions: [{content: "$y$"}],
        height: NORMAL,
        layout: HORIZONTAL,
    };

    onOptionsChange: (
        arg1: "correctOptions" | "otherOptions",
        arg2: any,
        arg3: any,
    ) => any = (whichOptions, options, cb) => {
        const props: Record<string, any> = {};
        props[whichOptions] = _.map(options, function (option) {
            return {content: option};
        });
        this.props.onChange(props, cb);
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
        const options = _.chain(_.pluck(this.props.correctOptions, "content"))
            .union(_.pluck(this.props.otherOptions, "content"))
            .uniq()
            .reject(function (content) {
                return content === "";
            })
            .sort()
            .sortBy(function (content) {
                if (/\d/.test(content)) {
                    return 0;
                }
                if (/^\$?[a-zA-Z]+\$?$/.test(content)) {
                    return 2;
                }
                return 1;
            })
            .map(function (content) {
                return {content: content};
            })
            .value();

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
                        <p>Use "Normal" for text, "Automatic" for images.</p>
                    </InfoTip>
                </div>
            </div>
        );
    }
}

export default OrdererEditor;
