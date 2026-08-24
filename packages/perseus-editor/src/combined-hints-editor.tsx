/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * Collection of classes for rendering the hint editor area,
 * hint editor boxes, and hint previews
 */
import {ApiOptions} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import arrowCircleDownIcon from "@phosphor-icons/core/bold/arrow-circle-down-bold.svg";
import arrowCircleUpIcon from "@phosphor-icons/core/bold/arrow-circle-up-bold.svg";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import DeviceFramer from "./components/device-framer";
import Editor from "./editor";
import PreviewWithIframe from "./preview-with-iframe";

import type {
    APIOptions,
    ImageDict,
    ChangeHandler,
    DeviceType,
    ImageUploader,
} from "@khanacademy/perseus";
import type {
    Hint,
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

type HintEditorProps = {
    itemId?: string;
    apiOptions?: APIOptions;
    className: string;
    imageUploader?: ImageUploader;
    showMoveButtons?: boolean;
    showRemoveButton?: boolean;
    showTitle?: boolean;
    content?: string | null | undefined;
    replace?: boolean | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    images?: ImageDict | null | undefined;
    isLast: boolean;
    isFirst: boolean;
    onMove: (direction: number) => unknown;
    onRemove: () => unknown;
    onChange: ChangeHandler;
    __type?: "hint";
    widgetIsOpen?: boolean;
};

/* Renders a hint editor box
 *
 * This includes:
 *  ~ A "Hint" title
 *  ~ the textarea for the hint
 *  ~ the "remove this hint" box
 *  ~ the move hint up/down arrows
 */
class HintEditor extends React.Component<HintEditorProps> {
    static defaultProps: {
        className: string;
        content: string;
        replace: boolean;
        showMoveButtons: boolean;
        showRemoveButton: boolean;
        showTitle: boolean;
    } = {
        className: "",
        content: "",
        replace: false,
        showMoveButtons: true,
        showTitle: true,
        showRemoveButton: true,
    };

    editor = React.createRef<Editor>();

    handleReplaceChanged: (e: React.ChangeEvent<HTMLInputElement>) => void = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        this.props.onChange({replace: e.target.checked});
    };

    focus: () => void = () => {
        this.editor.current?.focus();
    };

    getSaveWarnings: () => any = () => {
        return this.editor.current?.getSaveWarnings();
    };

    serialize(): Hint {
        invariant(
            this.editor.current,
            "cannot serialize HintEditor with no Editor",
        );
        return {
            ...this.editor.current.serialize(),
            replace: this.props.replace ?? undefined,
        };
    }

    render(): React.ReactNode {
        return (
            <div className={"perseus-hint-editor " + this.props.className}>
                {this.props.showTitle && <div className="pod-title">Hint</div>}
                <Editor
                    ref={this.editor}
                    // Using the AssessmentItem content ID as the key
                    // ensures that when the user navigates to another
                    // item in the Sidebar, the question editor is
                    // re-rendered by React.
                    key={this.props.itemId}
                    apiOptions={this.props.apiOptions}
                    widgets={this.props.widgets || undefined}
                    content={this.props.content || undefined}
                    images={this.props.images}
                    placeholder="Type your hint here..."
                    imageUploader={this.props.imageUploader}
                    onChange={this.props.onChange}
                    widgetIsOpen={this.props.widgetIsOpen}
                />

                {this.props.isLast && (
                    <BodyText size="xsmall">
                        The last hint is automatically bolded.
                    </BodyText>
                )}

                {/* Row that includes movement buttons and the "Replace previous hint" checkbox */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {this.props.showMoveButtons && (
                        <div className="reorder-hints">
                            <IconButton
                                icon={arrowCircleDownIcon}
                                size="small"
                                kind="tertiary"
                                onClick={_.partial(this.props.onMove, 1)}
                                disabled={this.props.isLast}
                            />
                            <IconButton
                                icon={arrowCircleUpIcon}
                                size="small"
                                kind="tertiary"
                                onClick={_.partial(this.props.onMove, -1)}
                                disabled={this.props.isFirst}
                            />
                        </div>
                    )}
                    <Checkbox
                        checked={this.props.replace}
                        onChange={(newCheckedState) => {
                            this.props.onChange({replace: newCheckedState});
                        }}
                        label="Replace previous hint"
                        style={{display: "inline-block"}}
                    />
                </div>

                {this.props.showRemoveButton && (
                    <Button
                        startIcon={trashIcon}
                        size="small"
                        kind="tertiary"
                        disabled={this.props.apiOptions?.editingDisabled}
                        onClick={this.props.onRemove}
                        // Have the "Remove" button align to the right.
                        style={{marginInlineStart: "auto", display: "flex"}}
                    >
                        Remove this hint
                    </Button>
                )}
            </div>
        );
    }
}

type CombinedHintEditorProps = {
    itemId?: string;
    apiOptions?: APIOptions;
    deviceType: DeviceType;
    imageUploader?: ImageUploader;
    highlightLint: boolean;
    isLast: boolean;
    isFirst: boolean;
    hint: Hint;
    pos: number; // position,
    // URL of the route to show on initial load of the preview frames.
    previewURL: string;
    onMove: (direction: number) => unknown;
    onRemove: () => unknown;
    onChange: ChangeHandler;
    widgetIsOpen?: boolean;
};

/* A single hint-row containing a hint editor and preview */
class CombinedHintEditor extends React.Component<CombinedHintEditorProps> {
    editor = React.createRef<HintEditor>();

    getSaveWarnings = () => {
        return this.editor.current?.getSaveWarnings();
    };

    serialize(): Hint {
        invariant(
            this.editor.current,
            "cannot serialize CombinedHintEditor with no HintEditor",
        );
        return this.editor.current.serialize();
    }

    focus = () => {
        this.editor.current?.focus();
    };

    render(): React.ReactNode {
        const isMobile =
            this.props.deviceType === "phone" ||
            this.props.deviceType === "tablet";
        return (
            <div
                className={
                    "perseus-combined-hint-editor " + "perseus-editor-row"
                }
            >
                <div className="perseus-editor-left-cell">
                    <HintEditor
                        ref={this.editor}
                        itemId={this.props.itemId}
                        isFirst={this.props.isFirst}
                        isLast={this.props.isLast}
                        widgets={this.props.hint.widgets}
                        content={this.props.hint.content}
                        images={this.props.hint.images}
                        replace={this.props.hint.replace}
                        imageUploader={this.props.imageUploader}
                        onChange={this.props.onChange}
                        onRemove={this.props.onRemove}
                        onMove={this.props.onMove}
                        apiOptions={this.props.apiOptions}
                        widgetIsOpen={this.props.widgetIsOpen}
                    />
                </div>
                <div className="perseus-editor-right-cell">
                    <DeviceFramer
                        deviceType={this.props.deviceType}
                        nochrome={true}
                    >
                        <PreviewWithIframe
                            isMobile={isMobile}
                            seamless={true}
                            url={this.props.previewURL}
                            content={{
                                type: "hint",
                                data: {
                                    hint: this.props.hint,
                                    pos: this.props.pos,
                                    apiOptions:
                                        this.props.apiOptions ||
                                        ApiOptions.defaults,
                                    linterContext: {
                                        contentType: "hint",
                                        highlightLint: this.props.highlightLint,
                                    },
                                },
                            }}
                        />
                    </DeviceFramer>
                </div>
            </div>
        );
    }
}

type CombinedHintsEditorProps = {
    apiOptions?: APIOptions;
    deviceType: DeviceType;
    imageUploader?: ImageUploader;
    highlightLint: boolean;
    hints: Hint[];
    // URL of the route to show on initial load of the preview frames.
    previewURL: string;
    onChange: (changed: {hints: Hint[]}) => void;
    // The content ID of the AssessmentItem being edited. It may not be set
    // for non-content library exercise questions.
    itemId?: string;
    widgetIsOpen?: boolean;
};

/* The entire hints editing/preview area
 *
 * Includes:
 *  ~ All the hint edit boxes, move and remove buttons
 *  ~ All the hint previews
 *  ~ The "add a hint" button
 */
class CombinedHintsEditor extends React.Component<CombinedHintsEditorProps> {
    static HintEditor: typeof HintEditor = HintEditor;

    static defaultProps: {
        hints: ReadonlyArray<any>;
        onChange: () => void;
    } = {
        hints: [],
        onChange: () => {},
    };

    handleHintChange(i: number, newProps: CombinedHintsEditorProps): void {
        const hints = [...this.props.hints];
        hints[i] = _.extend({}, this.serializeHint(i), newProps);

        this.props.onChange({hints: hints});
    }

    handleHintRemove(i: number): void {
        // eslint-disable-next-line no-alert
        if (!confirm("Are you sure you want to delete this hint?")) {
            return;
        }

        const hints = [...this.props.hints];
        hints.splice(i, 1);
        this.props.onChange({hints: hints});
    }

    handleHintMove(i: number, dir: number): void {
        const hints = [...this.props.hints];
        const hint = hints.splice(i, 1)[0];
        hints.splice(i + dir, 0, hint);
        this.props.onChange({hints: hints});
    }

    addHint: () => void = () => {
        const hint: PerseusRenderer = {content: "", images: {}, widgets: {}};
        const hints = [...this.props.hints, hint];
        this.props.onChange({hints: hints});
    };

    getSaveWarnings: () => any = () => {
        return _.chain(this.props.hints)
            .map((hint, i) => {
                return _.map(
                    // @ts-expect-error - TS2339 - Property 'getSaveWarnings' does not exist on type 'ReactInstance'.
                    this.refs["hintEditor" + i].getSaveWarnings(),
                    (issue) => "Hint " + (i + 1) + ": " + issue,
                );
            })
            .flatten(true)
            .value();
    };

    serialize(): Hint[] {
        return this.props.hints.map((_, i) => this.serializeHint(i));
    }

    serializeHint(index: number): Hint {
        // @ts-expect-error - TS2339 - Property 'serialize' does not exist on type 'ReactInstance'.
        return this.refs["hintEditor" + index].serialize();
    }

    render(): React.ReactNode {
        const {itemId, hints} = this.props;
        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;
        const hintElems = hints.map((hint, i) => {
            return (
                <fieldset disabled={editingDisabled} key={"hintEditor" + i}>
                    <CombinedHintEditor
                        ref={"hintEditor" + i}
                        isFirst={i === 0}
                        isLast={i + 1 === hints.length}
                        itemId={itemId}
                        hint={hint}
                        pos={i}
                        imageUploader={this.props.imageUploader}
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onChange={this.handleHintChange.bind(this, i)}
                        onRemove={this.handleHintRemove.bind(this, i)}
                        onMove={this.handleHintMove.bind(this, i)}
                        deviceType={this.props.deviceType}
                        apiOptions={this.props.apiOptions}
                        highlightLint={this.props.highlightLint}
                        previewURL={this.props.previewURL}
                        widgetIsOpen={this.props.widgetIsOpen}
                    />
                </fieldset>
            );
        });

        return (
            <>
                {hintElems}
                <div className="perseus-editor-row">
                    <Button
                        startIcon={plusIcon}
                        disabled={editingDisabled}
                        size="small"
                        onClick={this.addHint}
                    >
                        Add a hint
                    </Button>
                </div>
            </>
        );
    }
}

export default CombinedHintsEditor;
