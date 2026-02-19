/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import {type IFrameDefaultWidgetOptions} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

type ChangeFn = typeof Changeable.change;

type PairEditorProps = any;

/**
 * This is used for editing a name/value pair.
 */
class PairEditor extends React.Component<PairEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        name: PropTypes.string,
        value: PropTypes.string,
    };

    static defaultProps: PairEditorProps = {
        name: "",
        value: "",
    };

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <fieldset>
                <label>
                    Name:
                    <BlurInput
                        value={this.props.name}
                        onChange={this.change("name")}
                    />
                </label>
                <label>
                    Value:
                    <BlurInput
                        value={this.props.value}
                        onChange={this.change("value")}
                    />
                </label>
            </fieldset>
        );
    }
}

type PairsEditorProps = any;

/**
 * This is used for editing a set of name/value pairs.
 */
class PairsEditor extends React.Component<PairsEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        pairs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                value: PropTypes.string,
            }),
        ).isRequired,
    };

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handlePairChange = (pairIndex: any, pair: any) => {
        // If they're both non empty, add a new one
        const pairs = this.props.pairs.slice();
        pairs[pairIndex] = pair;

        const lastPair = pairs[pairs.length - 1];
        if (lastPair.name && lastPair.value) {
            pairs.push({name: "", value: ""});
        }
        this.change("pairs", pairs);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const editors = _.map(this.props.pairs, (pair, i) => {
            return (
                <PairEditor
                    key={i}
                    name={pair.name}
                    value={pair.value}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={this.handlePairChange.bind(this, i)}
                />
            );
        });
        return <div>{editors}</div>;
    }
}

type IframeEditorProps = any;

/**
 * This is the main editor for this widget, to specify all the options.
 */
class IframeEditor extends React.Component<IframeEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName = "iframe" as const;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleSettingsChange: (arg1: any) => void = (settings) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({settings: settings.pairs});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <div style={{fontWeight: "bold", textAlign: "center"}}>
                    This widget is deprecated! <br />
                    Try using the Video or CS Program widgets instead.
                </div>
                <label>
                    Url or Program ID:
                    <BlurInput
                        value={this.props.url}
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                        onChange={this.change("url")}
                    />
                </label>
                <br />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                <label>
                    Settings:
                    <PairsEditor
                        name="settings"
                        pairs={this.props.settings}
                        onChange={this.handleSettingsChange}
                    />
                </label>
                <br />
                <label>
                    Width:
                    <BlurInput
                        value={this.props.width}
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                        onChange={this.change("width")}
                    />
                </label>
                <label>
                    Height:
                    <BlurInput
                        value={this.props.height}
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                        onChange={this.change("height")}
                    />
                </label>
                <Checkbox
                    label="Allow full screen"
                    checked={this.props.allowFullScreen}
                    onChange={(value) => {
                        this.props.onChange({allowFullScreen: value});
                    }}
                />
                <br />
                <Checkbox
                    label="Allow iframe content to redirect the page"
                    checked={this.props.allowTopNavigation}
                    onChange={(value) => {
                        this.props.onChange({allowTopNavigation: value});
                    }}
                />
            </div>
        );
    }
}

export default IframeEditor;
