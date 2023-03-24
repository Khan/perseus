/* eslint-disable @babel/no-invalid-this */
/**
 * Collection of classes for rendering the hint editor area,
 * hint editor boxes, and hint previews
 */
import {components, icons} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import DeviceFramer from './components/device-framer';
import Editor from './editor';
import IframeContentRenderer from './iframe-content-renderer';

import type {
    APIOptions,
    WidgetDict,
    ImageDict,
    Hint,
    ChangeHandler,
    DeviceType,
} from "@khanacademy/perseus";

const {InfoTip, InlineIcon} = components;
const {iconCircleArrowDown, iconCircleArrowUp, iconPlus, iconTrash} = icons;

type ImageUploader = (file: string, callback: (url: string) => unknown) => unknown;

type HintEditorProps = {
    itemId?: string,
    apiOptions?: APIOptions,
    className: string,
    imageUploader?: ImageUploader,
    showMoveButtons?: boolean,
    showRemoveButton?: boolean,
    showTitle?: boolean,
    content?: string | null | undefined,
    replace?: boolean | null | undefined,
    widgets?: WidgetDict | null | undefined,
    images?: ImageDict | null | undefined,
    isLast: boolean,
    isFirst: boolean,
    onMove: (direction: number) => unknown,
    onRemove: () => unknown,
    onChange: ChangeHandler,
    __type?: 'hint'
};

/* Renders a hint editor box
 *
 * This includes:
 *  ~ A "Hint" title
 *  ~ the textarea for the hint
 *  ~ the "remove this hint" box
 *  ~ the move hint up/down arrows
 */
export class HintEditor extends React.Component<HintEditorProps> {
    static defaultProps: {
        className: string,
        content: string,
        replace: boolean,
        showMoveButtons: boolean,
        showRemoveButton: boolean,
        showTitle: boolean
    } = {
        className: "",
        content: "",
        replace: false,
        showMoveButtons: true,
        showTitle: true,
        showRemoveButton: true,
    };

    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        this.props.onChange({replace: e.target.checked});
    };

    focus: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.editor.focus();
    };

    getSaveWarnings: () => any = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.getSaveWarnings();
    };

    serialize: (options?: any) => any = (options: any) => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.serialize(options);
    };

    render(): React.ReactElement<React.ComponentProps<'div'>> {
        return (
            <div className={"perseus-hint-editor " + this.props.className}>
                {this.props.showTitle && <div className="pod-title">Hint</div>}
                <Editor
                    // eslint-disable-next-line react/no-string-refs
                    ref="editor"
                    // Using the AssessmentItem content ID as the key
                    // ensures that when the user navigates to another
                    // item in the Sidebar, the question editor is
                    // re-rendered by React.
                    key={this.props.itemId}
                    apiOptions={this.props.apiOptions}
                    widgets={this.props.widgets || undefined}
                    content={this.props.content || undefined}
                    images={this.props.images}
                    replace={this.props.replace}
                    placeholder="Type your hint here..."
                    imageUploader={this.props.imageUploader}
                    onChange={this.props.onChange}
                />
                <div className="hint-controls-container clearfix">
                    {this.props.showMoveButtons && (
                        <span className="reorder-hints">
                            <button
                                type="button"
                                className={this.props.isLast ? "hidden" : ""}
                                onClick={_.partial(this.props.onMove, 1)}
                            >
                                <InlineIcon {...iconCircleArrowDown} />
                            </button>{" "}
                            <button
                                type="button"
                                className={this.props.isFirst ? "hidden" : ""}
                                onClick={_.partial(this.props.onMove, -1)}
                            >
                                <InlineIcon {...iconCircleArrowUp} />
                            </button>{" "}
                            {this.props.isLast && (
                                <InfoTip>
                                    <p>
                                        The last hint is automatically bolded.
                                    </p>
                                </InfoTip>
                            )}
                        </span>
                    )}
                    <input
                        type="checkbox"
                        checked={this.props.replace}
                        onChange={this.handleChange}
                    />
                    Replace previous hint
                    {this.props.showRemoveButton && (
                        <button
                            type="button"
                            className="remove-hint simple-button orange"
                            onClick={this.props.onRemove}
                        >
                            <InlineIcon {...iconTrash} />
                            Remove this hint{" "}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

type CombinedHintEditorProps = {
    itemId?: string,
    apiOptions?: APIOptions,
    deviceType: DeviceType,
    imageUploader?: ImageUploader,
    highlightLint?: boolean,
    isLast: boolean,
    isFirst: boolean,
    hint: Hint,
    pos: number // position,
    contentPaths: ReadonlyArray<string>,
    // URL of the route to show on initial load of the preview frames.
    previewURL: string,
    onMove: (direction: number) => unknown,
    onRemove: () => unknown,
    onChange: ChangeHandler
};

/* A single hint-row containing a hint editor and preview */
class CombinedHintEditor extends React.Component<CombinedHintEditorProps> {
    static defaultProps = {
        highlightLint: false,
    };

    componentDidMount() {
        this.updatePreview();
    }

    componentDidUpdate() {
        this.updatePreview();
    }

    updatePreview = () => {
        const shouldBold =
            this.props.isLast && !/\*\*/.test(this.props.hint.content);

        // eslint-disable-next-line react/no-string-refs
        this.refs.frame.sendNewData({
            type: "hint",
            data: {
                hint: this.props.hint,
                bold: shouldBold,
                pos: this.props.pos,
                apiOptions: this.props.apiOptions,
                linterContext: {
                    contentType: "hint",
                    highlightLint: this.props.highlightLint,
                    paths: this.props.contentPaths,
                },
            },
        });
    };

    getSaveWarnings = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.getSaveWarnings();
    };

    serialize = (options: any) => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.serialize(options);
    };

    focus = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.editor.focus();
    };

    render(): React.ReactElement {
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
                        // eslint-disable-next-line react/no-string-refs
                        ref="editor"
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
                    />
                </div>
                <div className="perseus-editor-right-cell">
                    <DeviceFramer
                        deviceType={this.props.deviceType}
                        nochrome={true}
                    >
                        <IframeContentRenderer
                            // eslint-disable-next-line react/no-string-refs
                            ref="frame"
                            datasetKey="mobile"
                            datasetValue={isMobile}
                            seamless={true}
                            url={this.props.previewURL}
                        />
                    </DeviceFramer>
                </div>
            </div>
        );
    }
}

type CombinedHintsEditorProps = {
    apiOptions?: APIOptions,
    deviceType: DeviceType,
    imageUploader?: ImageUploader,
    highlightLint?: boolean,
    hints: ReadonlyArray<Hint>,
    // URL of the route to show on initial load of the preview frames.
    previewURL: string,
    onChange: ChangeHandler,
    // The content ID of the AssessmentItem being edited. It may not be set
    // for non-content library exercise questions.
    itemId?: string
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
        highlightLint: boolean,
        hints: ReadonlyArray<any>,
        onChange: () => void
    } = {
        onChange: () => {},
        hints: [],
        highlightLint: false,
    };

    handleHintChange: (
        i: number,
        newProps: CombinedHintsEditorProps,
        cb: () => unknown,
        silent: boolean,
    ) => void = (
        i: number,
        newProps: CombinedHintsEditorProps,
        cb: () => unknown,
        silent: boolean,
    ) => {
        // TODO(joel) - lens
        const hints = _(this.props.hints).clone();
        hints[i] = _.extend(
            {},
            this.serializeHint(i, {keepDeletedWidgets: true}),
            newProps,
        );

        this.props.onChange({hints: hints}, cb, silent);
    };

    handleHintRemove: (i: number) => void = (i: number) => {
        const hints = _(this.props.hints).clone();
        hints.splice(i, 1);
        this.props.onChange({hints: hints});
    };

    handleHintMove: (i: number, dir: number) => void = (
        i: number,
        dir: number,
    ) => {
        const hints = _(this.props.hints).clone();
        const hint = hints.splice(i, 1)[0];
        hints.splice(i + dir, 0, hint);
        this.props.onChange({hints: hints}, () => {
            // eslint-disable-next-line react/no-string-refs
            this.refs["hintEditor" + (i + dir)].focus();
        });
    };

    addHint: () => void = () => {
        const hints = _(this.props.hints)
            .clone()
            .concat([{content: ""}]);
        this.props.onChange({hints: hints}, () => {
            const i = hints.length - 1;
            // eslint-disable-next-line react/no-string-refs
            this.refs["hintEditor" + i].focus();
        });
    };

    getSaveWarnings: () => any = () => {
        return _.chain(this.props.hints)
            .map((hint, i) => {
                return _.map(
                    // eslint-disable-next-line react/no-string-refs
                    this.refs["hintEditor" + i].getSaveWarnings(),
                    (issue) => "Hint " + (i + 1) + ": " + issue,
                );
            })
            .flatten(true)
            .value();
    };

    serialize: (options?: any) => ReadonlyArray<string> = (
        options: any,
    ) => {
        return this.props.hints.map((hint, i) => {
            return this.serializeHint(i, options);
        });
    };

    serializeHint: (index: number, options?: any) => string = (index: number, options: any): string => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs["hintEditor" + index].serialize(options);
    };

    render(): React.ReactElement<React.ComponentProps<'div'>> {
        const {itemId, hints} = this.props;
        const hintElems = _.map(
            hints,
            function (hint, i) {
                return (
                    <CombinedHintEditor
                        ref={"hintEditor" + i}
                        key={"hintEditor" + i}
                        isFirst={i === 0}
                        isLast={i + 1 === hints.length}
                        itemId={itemId}
                        hint={hint}
                        pos={i}
                        imageUploader={this.props.imageUploader}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.handleHintChange.bind(this, i)}
                        // eslint-disable-next-line react/jsx-no-bind
                        onRemove={this.handleHintRemove.bind(this, i)}
                        // eslint-disable-next-line react/jsx-no-bind
                        onMove={this.handleHintMove.bind(this, i)}
                        deviceType={this.props.deviceType}
                        apiOptions={this.props.apiOptions}
                        highlightLint={this.props.highlightLint}
                        previewURL={this.props.previewURL}
                        // TODO(CP-4838): what should be passed here?
                        contentPaths={[]}
                    />
                );
            },
            this,
        );

        return (
            <div className="perseus-hints-editor perseus-editor-table">
                {hintElems}
                <div className="perseus-editor-row">
                    <div className="add-hint-container perseus-editor-left-cell">
                        <button
                            type="button"
                            className="add-hint simple-button orange"
                            onClick={this.addHint}
                        >
                            <InlineIcon {...iconPlus} /> Add a hint
                        </button>
                    </div>
                </div>
            </div>
        );
        /* eslint-enable max-len */
    }
}

export default CombinedHintsEditor;
