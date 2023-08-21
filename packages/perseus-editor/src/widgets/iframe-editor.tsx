/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

const {PropCheckBox} = components;

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

    change = (...args) => {
        return Changeable.change.apply(this, args);
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

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
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

    change = (...args) => {
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

    static defaultProps: IframeEditorProps = {
        url: "",
        settings: [{name: "", value: ""}],
        width: "400",
        height: "400",
        allowFullScreen: false,
        allowTopNavigation: false,
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
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
                <PropCheckBox
                    label="Allow full screen"
                    allowFullScreen={this.props.allowFullScreen}
                    onChange={this.props.onChange}
                />
                <br />
                <PropCheckBox
                    label="Allow iframe content to redirect the page"
                    allowTopNavigation={this.props.allowTopNavigation}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }

    handleSettingsChange: (arg1: any) => void = (settings) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({settings: settings.pairs});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default IframeEditor;
