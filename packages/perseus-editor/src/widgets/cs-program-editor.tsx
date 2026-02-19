/**
 * This editor is for embedding Khan Academy CS programs.
 */

import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
    Log,
} from "@khanacademy/perseus";
import {Errors} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

import type {CSProgramDefaultWidgetOptions} from "@khanacademy/perseus-core";

type ChangeFn = typeof Changeable.change;

const {InfoTip} = components;

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;

/**
 * This is used for editing a name/value pair.
 */
class PairEditor extends React.Component<any> {
    static propTypes = {
        ...Changeable.propTypes,
        name: PropTypes.string,
        value: PropTypes.string,
    };

    static defaultProps = {
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
            <fieldset className="pair-editor">
                <label>
                    Name:{" "}
                    <BlurInput
                        value={this.props.name}
                        onChange={this.change("name")}
                    />
                </label>
                <label>
                    {" "}
                    Value:{" "}
                    <BlurInput
                        value={this.props.value}
                        onChange={this.change("value")}
                    />
                </label>
            </fieldset>
        );
    }
}

/**
 * This is used for editing a set of name/value pairs.
 */
class PairsEditor extends React.Component<any> {
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

    handlePairChange = (pairIndex, pair: any) => {
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

const KA_PROGRAM_URL = /khanacademy\.org\/computer-programming\/[^/]+\/(\d+)/;

/**
 * Given a program URL from the site, extract its program ID.
 * If the input does not match the known URL patterns, it is assumed to be
 * a program ID.
 */
function isolateProgramID(programUrl: string) {
    const match = KA_PROGRAM_URL.exec(programUrl);
    if (match) {
        programUrl = match[1];
    }

    return programUrl;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
class CSProgramEditor extends React.Component<any> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName = "cs-program" as const;

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    _handleSettingsChange: (arg1: any) => void = (settings) => {
        this.change({settings: settings.pairs});
    };

    _handleProgramIDChange: (arg1: string) => void = (programID) => {
        programID = isolateProgramID(programID);
        const {isDevServer, InitialRequestUrl} = Dependencies.getDependencies();

        const host = isDevServer
            ? InitialRequestUrl.origin
            : "https://www.khanacademy.org";
        const baseUrl = `${host}/api/internal/scratchpads/${programID}`;

        $.getJSON(baseUrl)
            .done((programInfo) => {
                const programType = programInfo.userAuthoredContentType;
                this.change({
                    width: programInfo.width,
                    height: programInfo.height,
                    programID: programID,
                    programType: programType,
                });
            })
            .fail((jqxhr, textStatus, error) => {
                Log.error(
                    "Error retrieving scratchpad info for program ID ",
                    Errors.TransientService,
                    {
                        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'Error | null | undefined'.
                        cause: error,
                        loggedMetadata: {
                            textStatus,
                            programID,
                        },
                    },
                );
                this.change({
                    width: DEFAULT_WIDTH,
                    height: DEFAULT_HEIGHT,
                    programID: programID,
                    programType: null,
                });
            });
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <label>
                    Url or Program ID:{" "}
                    <BlurInput
                        value={this.props.programID}
                        onChange={this._handleProgramIDChange}
                    />
                </label>
                <br />
                <Checkbox
                    label="Show Editor"
                    checked={this.props.showEditor}
                    onChange={(value) => {
                        this.props.onChange({showEditor: value});
                    }}
                />
                <InfoTip>
                    If you show the editor, you should use the
                    &quot;full-width&quot; alignment to make room for the width
                    of the editor.
                </InfoTip>
                <br />
                <Checkbox
                    label="Show Buttons"
                    checked={this.props.showButtons}
                    onChange={(value) => {
                        this.props.onChange({showButtons: value});
                    }}
                />
                <br />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                <label>
                    Settings:
                    <PairsEditor
                        name="settings"
                        pairs={this.props.settings}
                        onChange={this._handleSettingsChange}
                    />
                    <InfoTip>
                        Settings that you add here are available to the program
                        as an object returned by <code>Program.settings()</code>
                    </InfoTip>
                </label>
            </div>
        );
    }
}

export default CSProgramEditor;
