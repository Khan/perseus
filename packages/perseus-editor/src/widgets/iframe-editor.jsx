/* eslint-disable react/sort-comp */
// @flow
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input.jsx";

const {PropCheckBox} = components;

type PairEditorProps = $FlowFixMe;

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

    render(): React.Node {
        return (
            <fieldset>
                <label>
                    Name:
                    <BlurInput
                        value={this.props.name}
                        // $FlowFixMe[incompatible-type] single-param call returns a callback
                        onChange={this.change("name")}
                    />
                </label>
                <label>
                    Value:
                    <BlurInput
                        value={this.props.value}
                        // $FlowFixMe[incompatible-type] single-param call returns a callback
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

type PairsEditorProps = $FlowFixMe;

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

    render(): React.Node {
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

    handlePairChange = (pairIndex, pair) => {
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

type IframeEditorProps = $FlowFixMe;

/**
 * This is the main editor for this widget, to specify all the options.
 */
class IframeEditor extends React.Component<IframeEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName: "iframe" = "iframe";

    static defaultProps: IframeEditorProps = {
        url: "",
        settings: [{name: "", value: ""}],
        width: "400",
        height: "400",
        allowFullScreen: false,
        allowTopNavigation: false,
    };

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    render(): React.Node {
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
                        onChange={this.change("width")}
                    />
                </label>
                <label>
                    Height:
                    <BlurInput
                        value={this.props.height}
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

    handleSettingsChange: ($FlowFixMe) => void = (settings) => {
        this.change({settings: settings.pairs});
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default IframeEditor;
