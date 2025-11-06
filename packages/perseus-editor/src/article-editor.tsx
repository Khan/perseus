/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * An article editor. Articles are long-form pieces of content, composed of
 * multiple (Renderer) sections concatenated together.
 */

import {components, ApiOptions, Dependencies} from "@khanacademy/perseus";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import arrowCircleDownIcon from "@phosphor-icons/core/bold/arrow-circle-down-bold.svg";
import arrowCircleUpIcon from "@phosphor-icons/core/bold/arrow-circle-up-bold.svg";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";
import _ from "underscore";

import DeviceFramer from "./components/device-framer";
import JsonEditor from "./components/json-editor";
import SectionControlButton from "./components/section-control-button";
import Editor from "./editor";
import IframeContentRenderer from "./iframe-content-renderer";

import type {
    APIOptions,
    Changeable,
    ImageUploader,
    PerseusDependenciesV2,
} from "@khanacademy/perseus";

const {HUD} = components;

type RendererProps = {
    content?: string;
    widgets?: any;
    images?: any;
};

type JsonType = RendererProps | ReadonlyArray<RendererProps>;

type DefaultProps = {
    contentPaths?: ReadonlyArray<string>;
    json: JsonType;
    mode: "diff" | "edit" | "json" | "preview";
    screen: "phone" | "tablet" | "desktop";
    sectionImageUploadGenerator: (
        i: number,
    ) => React.ReactElement<React.ComponentProps<"span">>;
    useNewStyles: boolean;
};
type Props = DefaultProps & {
    apiOptions?: APIOptions;
    dependencies: PerseusDependenciesV2;
    imageUploader?: ImageUploader;
    // URL of the route to show on initial load of the preview frames.
    previewURL: string;
} & Changeable.ChangeableProps;

type State = {
    highlightLint: boolean;
};
export default class ArticleEditor extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        contentPaths: [],
        json: [{}],
        mode: "edit",
        screen: "desktop",
        sectionImageUploadGenerator: () => <span />,
        useNewStyles: false,
    };

    state: State = {
        highlightLint: true,
    };

    componentDidMount() {
        this._updatePreviewFrames();
    }

    componentDidUpdate() {
        this._updatePreviewFrames();
    }

    _updatePreviewFrames() {
        if (this.props.mode === "preview") {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'sendNewData' does not exist on type 'ReactInstance'.
            this.refs["frame-all"].sendNewData({
                type: "article-all",
                data: this._sections().map((section, i) => {
                    return this._apiOptionsForSection(section, i);
                }),
            });
        } else if (this.props.mode === "edit") {
            this._sections().forEach((section, i) => {
                // eslint-disable-next-line react/no-string-refs
                // @ts-expect-error - TS2339 - Property 'sendNewData' does not exist on type 'ReactInstance'.
                this.refs["frame-" + i].sendNewData({
                    type: "article",
                    data: this._apiOptionsForSection(section, i),
                });
            });
        }
    }

    _apiOptionsForSection(section: RendererProps, sectionIndex: number): any {
        // eslint-disable-next-line react/no-string-refs
        const editor = this.refs[`editor${sectionIndex}`];
        return {
            apiOptions: {
                ...ApiOptions.defaults,
                ...this.props.apiOptions,

                // Alignment options are always available in article
                // editors
                showAlignmentOptions: true,
                isArticle: true,
            },
            json: section,
            useNewStyles: this.props.useNewStyles,
            linterContext: {
                contentType: "article",
                highlightLint: this.state.highlightLint,
                paths: this.props.contentPaths,
            },
            // @ts-expect-error - TS2339 - Property 'getSaveWarnings' does not exist on type 'ReactInstance'.
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            legacyPerseusLint: editor ? editor.getSaveWarnings() : [],
        };
    }

    _sections(): ReadonlyArray<RendererProps> {
        const json = this.props.json;
        return json instanceof Array ? json : [json];
    }

    _renderEditor(): React.ReactElement<React.ComponentProps<"div">> {
        const {imageUploader, sectionImageUploadGenerator} = this.props;

        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,

            // Alignment options are always available in article editors
            showAlignmentOptions: true,
            isArticle: true,
        } as const;

        const sections = this._sections();
        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;

        return (
            <div className="perseus-editor-table">
                {sections.map((section, i) => {
                    return [
                        <div className="perseus-editor-row" key={i}>
                            <fieldset disabled={editingDisabled}>
                                <div className="perseus-editor-left-cell">
                                    <div className="pod-title">
                                        Section {i + 1}
                                        <div
                                            style={{
                                                display: "inline-block",
                                                float: "right",
                                            }}
                                        >
                                            {sectionImageUploadGenerator(i)}
                                            <SectionControlButton
                                                icon={plusIcon}
                                                disabled={editingDisabled}
                                                onClick={() => {
                                                    this._handleAddSectionAfter(
                                                        i,
                                                    );
                                                }}
                                                title="Add a new section after this one"
                                            />
                                            {i + 1 < sections.length && (
                                                <SectionControlButton
                                                    icon={arrowCircleDownIcon}
                                                    disabled={editingDisabled}
                                                    onClick={() => {
                                                        this._handleMoveSectionLater(
                                                            i,
                                                        );
                                                    }}
                                                    title="Move this section down"
                                                />
                                            )}
                                            {i > 0 && (
                                                <SectionControlButton
                                                    icon={arrowCircleUpIcon}
                                                    disabled={editingDisabled}
                                                    onClick={() => {
                                                        this._handleMoveSectionEarlier(
                                                            i,
                                                        );
                                                    }}
                                                    title="Move this section up"
                                                />
                                            )}
                                            <SectionControlButton
                                                icon={trashIcon}
                                                disabled={editingDisabled}
                                                onClick={() => {
                                                    const msg =
                                                        "Are you sure you " +
                                                        "want to delete section " +
                                                        (i + 1) +
                                                        "?";
                                                    /* eslint-disable no-alert */
                                                    if (confirm(msg)) {
                                                        this._handleRemoveSection(
                                                            i,
                                                        );
                                                    }
                                                    /* eslint-enable no-alert */
                                                }}
                                                title="Delete this section"
                                            />
                                        </div>
                                    </div>
                                    <Editor
                                        {...section}
                                        apiOptions={apiOptions}
                                        imageUploader={imageUploader}
                                        onChange={(newProps) =>
                                            this._handleEditorChange(
                                                i,
                                                newProps,
                                            )
                                        }
                                        placeholder="Type your section text here..."
                                        ref={"editor" + i}
                                    />
                                </div>

                                <div className="editor-preview">
                                    {this._renderIframePreview(i, true)}
                                </div>
                            </fieldset>
                        </div>,
                    ];
                })}

                {this._renderAddSection(editingDisabled)}
                {this._renderLinterHUD()}
            </div>
        );
        /* eslint-enable max-len */
    }

    _renderAddSection(
        editingDisabled: boolean,
    ): React.ReactElement<React.ComponentProps<"div">> {
        return (
            <div className="perseus-editor-row">
                <div className="perseus-editor-left-cell">
                    <Button
                        startIcon={plusIcon}
                        disabled={editingDisabled}
                        kind="tertiary"
                        aria-label="Add a section"
                        onClick={() => {
                            this._handleAddSectionAfter(
                                this._sections().length - 1,
                            );
                        }}
                    >
                        Add a section
                    </Button>
                </div>
            </div>
        );
    }

    _renderLinterHUD(): React.ReactElement<any> {
        return (
            <HUD
                message="Style warnings"
                enabled={this.state.highlightLint}
                onClick={() => {
                    this.setState({
                        highlightLint: !this.state.highlightLint,
                    });
                }}
            />
        );
    }

    _renderIframePreview(
        i: number | string,
        nochrome: boolean,
    ): React.ReactElement<any> {
        const isMobile =
            this.props.screen === "phone" || this.props.screen === "tablet";

        return (
            <DeviceFramer deviceType={this.props.screen} nochrome={nochrome}>
                <IframeContentRenderer
                    ref={"frame-" + i}
                    key={this.props.screen}
                    datasetKey="mobile"
                    datasetValue={isMobile}
                    seamless={nochrome}
                    url={this.props.previewURL}
                />
            </DeviceFramer>
        );
    }

    _renderPreviewMode(): React.ReactElement<React.ComponentProps<"div">> {
        return (
            <div className="standalone-preview">
                {this._renderIframePreview("all", false)}
            </div>
        );
    }

    _handleJsonChange: (newJson: JsonType) => void = (newJson) => {
        this.props.onChange({json: newJson});
    };

    _handleEditorChange: (i: number, newProps: RendererProps) => void = (
        i,
        newProps,
    ) => {
        const sections = [...this._sections()];
        sections[i] = {...sections[i], ...newProps};
        this.props.onChange({json: sections});
    };

    _handleMoveSectionEarlier(i: number) {
        if (i === 0) {
            return;
        }
        const sections = [...this._sections()];
        const section = sections[i];
        sections.splice(i, 1);
        sections.splice(i - 1, 0, section);
        this.props.onChange({
            json: sections,
        });
    }

    _handleMoveSectionLater(i: number) {
        const sections = [...this._sections()];
        if (i + 1 === sections.length) {
            return;
        }
        const section = sections[i];
        sections.splice(i, 1);
        sections.splice(i + 1, 0, section);
        this.props.onChange({
            json: sections,
        });
    }

    _handleAddSectionAfter(i: number) {
        // We do a full serialization here because we
        // might be copying widgets:
        const sections = _.clone(this.serialize());
        // Here we do magic to allow you to copy-paste
        // things from the previous section into the new
        // section while preserving widgets.
        // To enable this, we preserve the widgets
        // object for the new section, but wipe out
        // the content.
        const newSection =
            i >= 0
                ? {
                      widgets: sections[i].widgets,
                  }
                : {};
        // @ts-expect-error - TS2339 - Property 'splice' does not exist on type 'JsonType'.
        sections.splice(i + 1, 0, newSection);
        this.props.onChange({
            json: sections,
        });
    }

    _handleRemoveSection(i: number) {
        const sections = [...this._sections()];
        sections.splice(i, 1);
        this.props.onChange({
            json: sections,
        });
    }

    serialize(): JsonType {
        if (this.props.mode === "edit") {
            return this._sections().map((section, i) => {
                // eslint-disable-next-line react/no-string-refs
                // @ts-expect-error - TS2339 - Property 'serialize' does not exist on type 'ReactInstance'.
                return this.refs["editor" + i].serialize();
            });
        }
        if (this.props.mode === "preview" || this.props.mode === "json") {
            return this.props.json;
        }
        throw new PerseusError(
            "Could not serialize; mode " + this.props.mode + " not found",
            Errors.Internal,
        );
    }

    /**
     * Returns an array, with one element be section.
     * Each element is an array of lint warnings present in that section.
     *
     * This function can currently only be called in edit mode.
     */
    getSaveWarnings(): ReadonlyArray<RendererProps> {
        if (this.props.mode !== "edit") {
            // TODO(joshuan): We should be able to get save warnings in
            // preview mode.
            throw new PerseusError(
                "Can only get save warnings in edit mode.",
                Errors.NotAllowed,
            );
        }

        return this._sections().map((section, i) => {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'getSaveWarnings' does not exist on type 'ReactInstance'.
            return this.refs["editor" + i].getSaveWarnings();
        });
    }

    render(): React.ReactNode {
        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;
        return (
            <Dependencies.DependenciesContext.Provider
                value={this.props.dependencies}
            >
                <div className="framework-perseus perseus-article-editor">
                    {this.props.mode === "edit" && this._renderEditor()}

                    {this.props.mode === "preview" && this._renderPreviewMode()}

                    {this.props.mode === "json" && (
                        <div className="json-editor">
                            <div className="json-editor-warning">
                                <span>
                                    Warning: Editing in this mode can lead to
                                    broken articles!
                                </span>
                            </div>
                            <JsonEditor
                                multiLine={true}
                                onChange={this._handleJsonChange}
                                value={this.props.json}
                                editingDisabled={editingDisabled}
                            />
                        </div>
                    )}
                </div>
            </Dependencies.DependenciesContext.Provider>
        );
    }
}
