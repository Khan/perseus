/**
 * This editor is for embedding Khan Academy CS programs.
 */

import {Dependencies, Log} from "@khanacademy/perseus";
import {Errors} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import BlurInput from "../../components/blur-input";
import InfoTip from "../../components/info-tip";
import {PairsEditor} from "../../components/pairs-editor";
import {deprecatedChangeableChange} from "../../mixins/changeable";
import EditorJsonify from "../../mixins/editor-jsonify";

import type {ChangeableProps} from "../../mixins/changeable";
import type {PerseusCSProgramWidgetOptions} from "@khanacademy/perseus-core";

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;

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

interface CSProgramEditorProps
    extends PerseusCSProgramWidgetOptions,
        ChangeableProps {}

/**
 * This is the main editor for this widget, to specify all the options.
 */
class CSProgramEditor extends React.Component<CSProgramEditorProps> {
    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return deprecatedChangeableChange.apply(this, args);
    };

    _handleProgramIDChange: (arg1: string) => void = (programID) => {
        programID = isolateProgramID(programID);
        const {isDevServer, InitialRequestUrl} = Dependencies.getDependencies();

        const host = isDevServer
            ? InitialRequestUrl.origin
            : "https://www.khanacademy.org";
        const baseUrl = `${host}/api/internal/scratchpads/${programID}`;

        const fetchProgramInfo = async () => {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error(
                    `Request for scratchpad info failed with status ${response.status} ${response.statusText}`,
                );
            }
            return response.json();
        };

        // We pass both callbacks to a single `then` (rather than chaining a
        // `catch`) so that an error thrown while applying the new options
        // doesn't also trigger the fallback-to-defaults path below.
        fetchProgramInfo().then(
            (programInfo) => {
                const programType = programInfo.userAuthoredContentType;
                this.change({
                    width: programInfo.width,
                    height: programInfo.height,
                    programID: programID,
                    programType: programType,
                });
            },
            (error) => {
                Log.error(
                    "Error retrieving scratchpad info for program ID ",
                    Errors.TransientService,
                    {
                        cause: error,
                        loggedMetadata: {
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
            },
        );
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
                        pairs={this.props.settings}
                        onChange={(settings) => this.change({settings})}
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
