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
import {csProgramLogic, Errors} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

import type {
    CSProgramDefaultWidgetOptions,
    PerseusCSProgramWidgetOptions,
} from "@khanacademy/perseus-core";

const {InfoTip} = components;

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;

type Pair = {name: string; value: string};

type PairEditorProps = {
    onChange: (pair: Pair) => void;
    name: string;
    value: string;
};

/**
 * This is used for editing a name/value pair.
 */
class PairEditor extends React.Component<PairEditorProps> {
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
                        onChange={(v) =>
                            this.props.onChange({
                                name: v,
                                value: this.props.value,
                            })
                        }
                    />
                </label>
                <label>
                    {" "}
                    Value:{" "}
                    <BlurInput
                        value={this.props.value}
                        onChange={(v) =>
                            this.props.onChange({
                                name: this.props.name,
                                value: v,
                            })
                        }
                    />
                </label>
            </fieldset>
        );
    }
}

type PairsEditorProps = {
    onChange: (partial: {pairs: ReadonlyArray<Pair>}) => void;
    pairs: ReadonlyArray<Pair>;
};

/**
 * This is used for editing a set of name/value pairs.
 */
class PairsEditor extends React.Component<PairsEditorProps> {
    handlePairChange = (pairIndex: number, pair: Pair) => {
        // If they're both non empty, add a new one
        const pairs = this.props.pairs.slice();
        pairs[pairIndex] = pair;

        const lastPair = pairs[pairs.length - 1];
        if (lastPair.name && lastPair.value) {
            pairs.push({name: "", value: ""});
        }
        this.props.onChange({pairs});
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

type Props = {
    onChange: (partial: Partial<PerseusCSProgramWidgetOptions>) => void;
    programID?: string;
    showEditor?: boolean;
    showButtons?: boolean;
    settings?: ReadonlyArray<Pair>;
    width?: number;
    height?: number;
    programType?: string | null;
};

/**
 * This is the main editor for this widget, to specify all the options.
 */
class CSProgramEditor extends React.Component<Props> {
    static widgetName = "cs-program" as const;

    static defaultProps: CSProgramDefaultWidgetOptions =
        csProgramLogic.defaultWidgetOptions;

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    _handleSettingsChange = (partial: {pairs: ReadonlyArray<Pair>}) => {
        this.change({settings: partial.pairs});
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
                        value={this.props.programID ?? ""}
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
                        pairs={this.props.settings ?? []}
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
