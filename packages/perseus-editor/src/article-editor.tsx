/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * An article editor. Articles are long-form pieces of content, composed of
 * multiple (Renderer) sections concatenated together.
 */

import {components, icons, ApiOptions} from "@khanacademy/perseus";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import DeviceFramer from "./components/device-framer";
import JsonEditor from "./components/json-editor";
import SectionControlButton from "./components/section-control-button";
import Editor from "./editor";
import ContentRenderer from "./preview/content-renderer";

import type {
    APIOptions,
    Changeable,
    ImageUploader,
    PerseusRenderer,
} from "@khanacademy/perseus";

const {HUD, InlineIcon} = components;
const {iconCircleArrowDown, iconCircleArrowUp, iconPlus, iconTrash} = icons;

type JsonType =
    | ReadonlyArray<Record<string, never>>
    | PerseusRenderer
    | ReadonlyArray<PerseusRenderer>;

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

    editorRefs: Array<Editor | null> = [];

    _sections(): ReadonlyArray<PerseusRenderer> {
        return Array.isArray(this.props.json)
            ? this.props.json
            : [this.props.json];
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

        return (
            <div className="perseus-editor-table">
                {sections.map((section, i) => {
                    return [
                        <div className="perseus-editor-row" key={i}>
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
                                            icon={iconPlus}
                                            onClick={() => {
                                                this._handleAddSectionAfter(i);
                                            }}
                                            title="Add a new section after this one"
                                        />
                                        {i + 1 < sections.length && (
                                            <SectionControlButton
                                                icon={iconCircleArrowDown}
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
                                                icon={iconCircleArrowUp}
                                                onClick={() => {
                                                    this._handleMoveSectionEarlier(
                                                        i,
                                                    );
                                                }}
                                                title="Move this section up"
                                            />
                                        )}
                                        <SectionControlButton
                                            icon={iconTrash}
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
                                    content={section.content}
                                    images={section.images}
                                    widgets={section.widgets}
                                    apiOptions={apiOptions}
                                    imageUploader={imageUploader}
                                    onChange={_.partial(
                                        this._handleEditorChange.bind(this),
                                        i,
                                    )}
                                    placeholder="Type your section text here..."
                                    ref={(editor) => {
                                        this.editorRefs[i] = editor;
                                    }}
                                />
                            </div>

                            <div className="editor-preview">
                                {this._renderIframePreview(i, true)}
                            </div>
                        </div>,
                    ];
                })}
                {this._renderAddSection()}
                {this._renderLinterHUD()}
            </div>
        );
        /* eslint-enable max-len */
    }

    _renderAddSection(): React.ReactElement<React.ComponentProps<"div">> {
        return (
            <div className="perseus-editor-row">
                <div className="perseus-editor-left-cell">
                    <a
                        href="#"
                        className="simple-button orange"
                        onClick={() => {
                            this._handleAddSectionAfter(
                                this._sections().length - 1,
                            );
                        }}
                    >
                        <InlineIcon {...iconPlus} /> Add a section
                    </a>
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
        sectionIndex: number | "all",
        nochrome: boolean,
    ): React.ReactElement<any> {
        const isMobile =
            this.props.screen === "phone" || this.props.screen === "tablet";

        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            isMobile,
            // Alignment options are always available in article
            // editors
            showAlignmentOptions: true,
            isArticle: true,
        };

        const sections = this._sections();
        return (
            <DeviceFramer deviceType={this.props.screen} nochrome={nochrome}>
                {sectionIndex === "all" ? (
                    sections.map((section, i) => (
                        <ContentRenderer
                            key={`section-${i}`}
                            apiOptions={apiOptions}
                            question={section}
                            seamless={!nochrome}
                            screen={this.props.screen}
                            linterContext={{
                                contentType: "article",
                                highlightLint: this.state.highlightLint,
                                paths: this.props.contentPaths ?? [],
                                stack: [],
                            }}
                            legacyPerseusLint={
                                this.editorRefs[i]?.getSaveWarnings() ?? []
                            }
                        />
                    ))
                ) : (
                    <ContentRenderer
                        key={`section-${sectionIndex}`}
                        apiOptions={apiOptions}
                        question={sections[sectionIndex]}
                        seamless={!nochrome}
                        screen={this.props.screen}
                        linterContext={{
                            contentType: "article",
                            highlightLint: this.state.highlightLint,
                            paths: this.props.contentPaths ?? [],
                            stack: [],
                        }}
                        legacyPerseusLint={
                            this.editorRefs[sectionIndex]?.getSaveWarnings() ??
                            []
                        }
                    />
                )}
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

    _handleEditorChange(
        sectionIndex: number,
        newProps: Partial<PerseusRenderer>,
    ) {
        const sections = [...this._sections()];
        sections[sectionIndex] = {...sections[sectionIndex], ...newProps};
        this.props.onChange({json: sections});
    }

    _handleMoveSectionEarlier(i: number) {
        if (i === 0) {
            return;
        }
        const sections = _.clone(this._sections());
        const section = sections[i];
        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly Renderer[]'. Did you mean 'slice'?
        sections.splice(i, 1);
        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly Renderer[]'. Did you mean 'slice'?
        sections.splice(i - 1, 0, section);
        this.props.onChange({
            json: sections,
        });
    }

    _handleMoveSectionLater(i: number) {
        const sections = _.clone(this._sections());
        if (i + 1 === sections.length) {
            return;
        }
        const section = sections[i];
        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly Renderer[]'. Did you mean 'slice'?
        sections.splice(i, 1);
        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly Renderer[]'. Did you mean 'slice'?
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
        const sections = _.clone(this._sections());
        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly Renderer[]'. Did you mean 'slice'?
        sections.splice(i, 1);
        this.props.onChange({
            json: sections,
        });
    }

    serialize(): JsonType {
        if (this.props.mode === "edit") {
            return this._sections().map((_, i) => {
                return this.editorRefs[i]!.serialize();
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
     * Returns an array, with one element per section.
     * Each element is an array of lint warnings present in that section.
     *
     * This function can currently only be called in edit mode.
     */
    getSaveWarnings(): ReadonlyArray<ReadonlyArray<string>> {
        if (this.props.mode !== "edit") {
            // TODO(joshuan): We should be able to get save warnings in
            // preview mode.
            throw new PerseusError(
                "Can only get save warnings in edit mode.",
                Errors.NotAllowed,
            );
        }

        return this._sections().map((section, i) => {
            return this.editorRefs[i]?.getSaveWarnings() ?? [];
        });
    }

    render(): React.ReactNode {
        return (
            <div className="framework-perseus perseus-article-editor">
                {this.props.mode === "edit" && this._renderEditor()}

                {this.props.mode === "preview" && this._renderPreviewMode()}

                {this.props.mode === "json" && (
                    <div className="json-editor">
                        <div className="json-editor-warning">
                            <span>
                                Warning: Editing in this mode can lead to broken
                                articles!
                            </span>
                        </div>
                        <JsonEditor
                            multiLine={true}
                            onChange={this._handleJsonChange}
                            value={this.props.json}
                        />
                    </div>
                )}
            </div>
        );
    }
}