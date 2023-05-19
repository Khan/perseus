/* eslint-disable no-useless-escape */
/**
 * This editor is for embedding Khan Academy CS programs.
 */

import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
    Errors,
    Log,
} from "@khanacademy/perseus";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

const {InfoTip, PropCheckBox} = components;

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;

type PairEditorProps = typeof PairEditor.defaultProps &
    Changeable.ChangeableProps & {
        name: string;
        value: string;
    };

/**
 * This is used for editing a name/value pair.
 */
class PairEditor extends React.Component<PairEditorProps> {
    static defaultProps = {
        name: "",
        value: "",
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
                        onChange={(value) =>
                            Changeable.changeSingleProp(this, "name", value)
                        }
                    />
                </label>
                <label>
                    {" "}
                    Value:{" "}
                    <BlurInput
                        value={this.props.value}
                        onChange={(value) =>
                            Changeable.changeSingleProp(this, "name", value)
                        }
                    />
                </label>
            </fieldset>
        );
    }
}

type Props = Changeable.ChangeableProps & {
    name: string;
    pairs: Array<{name: string; value: string}>;
};

/**
 * This is used for editing a set of name/value pairs.
 */
class PairsEditor extends React.Component<Props> {
    change = (...args) => {
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
        Changeable.changeSingleProp(this, "pairs", pairs);
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

const KA_PROGRAM_URL = /khanacademy\.org\/computer-programming\/[^\/]+\/(\d+)/;

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

type CSProgramEditorProps = typeof CSProgramEditor.defaultProps &
    Changeable.ChangeableProps & {
        programID: string;
        programType: any; // TODO
        settings: Array<{name: string; value: string}>;
        showEditor: boolean;
        showButtons: boolean;
        width: number;
        height: number;
    };

/**
 * This is the main editor for this widget, to specify all the options.
 */
class CSProgramEditor extends React.Component<CSProgramEditorProps> {
    static widgetName = "cs-program" as const;

    static defaultProps = {
        programID: "",
        programType: null,
        settings: [{name: "", value: ""}],
        showEditor: false,
        showButtons: false,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    };

    _handleSettingsChange: (arg1: any) => void = (settings) => {
        Changeable.changeMultipleProps(this, {settings: settings.pairs});
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
                Changeable.changeMultipleProps(this, {
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
                        // @ts-expect-error [FEI-5003] - TS2322 - Type 'string' is not assignable to type 'Error | null | undefined'.
                        cause: error,
                        loggedMetadata: {
                            textStatus,
                            programID,
                        },
                    },
                );
                Changeable.changeMultipleProps(this, {
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
                <PropCheckBox
                    label="Show Editor"
                    showEditor={this.props.showEditor}
                    onChange={this.props.onChange}
                />
                <InfoTip>
                    If you show the editor, you should use the "full-width"
                    alignment to make room for the width of the editor.
                </InfoTip>
                <br />
                <PropCheckBox
                    label="Show Buttons"
                    showButtons={this.props.showButtons}
                    onChange={this.props.onChange}
                />
                <br />
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
