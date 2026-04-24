/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {Widgets, excludeDenylistKeys} from "@khanacademy/perseus";
import {
    CoreWidgetRegistry,
    applyDefaultsToWidget,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import SectionControlButton from "./section-control-button";
import ToggleableCaret from "./toggleable-caret";
import WidgetEditorSettings from "./widget-editor-settings";

import type Editor from "../editor";
import type {APIOptions} from "@khanacademy/perseus";
import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";

type WidgetEditorProps = {
    // Unserialized props
    id: string;
    onChange: (
        widgetInfo: PerseusWidget,
        cb?: () => unknown,
        silent?: boolean,
    ) => unknown;
    onRemove: () => unknown;
    apiOptions: APIOptions;
    widgetIsOpen?: boolean;
} & Omit<PerseusWidget, "key">;

type WidgetEditorState = {
    showWidget: boolean;
    widgetInfo: PerseusWidget;
};

const _upgradeWidgetInfo = (props: WidgetEditorProps): PerseusWidget => {
    // We can't call serialize here because this.refs.widget
    // doesn't exist before this component is mounted.
    const filteredProps = excludeDenylistKeys(props);
    return applyDefaultsToWidget(filteredProps as PerseusWidget);
};

// This component handles upgading widget editor props via prop
// upgrade transforms. Widget editors will always be rendered
// with all available transforms applied, but the results of those
// transforms will not be propogated upwards until serialization.
// eslint-disable-next-line react/no-unsafe
class WidgetEditor extends React.Component<
    WidgetEditorProps,
    WidgetEditorState
> {
    widget: React.RefObject<Editor>;

    constructor(props: WidgetEditorProps) {
        super(props);
        this.state = {
            showWidget: props.widgetIsOpen ?? true,
            widgetInfo: _upgradeWidgetInfo(props),
        };
        this.widget = React.createRef();
    }

    // eslint-disable-next-line react/no-unsafe
    UNSAFE_componentWillReceiveProps(nextProps: WidgetEditorProps) {
        this.setState({widgetInfo: _upgradeWidgetInfo(nextProps)});
        // user can update internal state while the widget is handled globally
        if (
            nextProps.widgetIsOpen != null &&
            nextProps.widgetIsOpen !== this.props.widgetIsOpen
        ) {
            this.setState({showWidget: nextProps.widgetIsOpen});
        }
    }

    _toggleWidget = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    };

    _handleWidgetChange = (
        newProps: WidgetEditorProps,
        cb: () => unknown,
        silent: boolean,
    ) => {
        const newWidgetInfo = {
            ...this.state.widgetInfo,
            options: {
                ...this.state.widgetInfo.options,
                ...(this.widget.current?.serialize() ?? {}),
                ...newProps,
            },
        } as PerseusWidget;
        this.props.onChange(newWidgetInfo, cb, silent);
    };

    _setStatic = (value: boolean) => {
        const newWidgetInfo = {
            ...this.state.widgetInfo,
            static: value,
        } satisfies PerseusWidget;
        this.props.onChange(newWidgetInfo);
    };

    _setGraded = (value: boolean) => {
        const newWidgetInfo = {
            ...this.state.widgetInfo,
            graded: value,
        } satisfies PerseusWidget;
        this.props.onChange(newWidgetInfo);
    };

    _handleAlignmentChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const newAlignment = e.currentTarget.value as Alignment;
        const newWidgetInfo = Object.assign(
            {},
            this.state.widgetInfo,
        ) as PerseusWidget;
        newWidgetInfo.alignment = newAlignment;
        this.props.onChange(newWidgetInfo);
    };

    getSaveWarnings = () => {
        const issuesFunc = this.widget.current?.getSaveWarnings;
        return issuesFunc ? issuesFunc() : [];
    };

    serialize = () => {
        const widgetInfo = this.state.widgetInfo;
        return {
            type: widgetInfo.type,
            alignment: widgetInfo.alignment,
            static: widgetInfo.static,
            graded: widgetInfo.graded,
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'serialize' does not exist on type 'ReactInstance'.
            options: this.widget.current.serialize(),
            version: widgetInfo.version,
        };
    };

    render(): React.ReactNode {
        const widgetInfo = this.state.widgetInfo;
        const isEditingDisabled =
            this.props.apiOptions.editingDisabled ?? false;

        const Ed = Widgets.getEditor(widgetInfo.type);
        let supportedAlignments: ReadonlyArray<Alignment>;

        if (this.props.apiOptions.showAlignmentOptions) {
            supportedAlignments = CoreWidgetRegistry.getSupportedAlignments(
                widgetInfo.type,
            );
        } else {
            // NOTE(kevinb): "default" is not one in `validAlignments` in widgets.js.
            supportedAlignments = ["default"];
        }

        const supportsStaticMode = Widgets.supportsStaticMode(widgetInfo.type);
        const supportsGradedToggle = Widgets.supportsUngraded(widgetInfo.type);

        return (
            <div className="perseus-widget-editor">
                <div
                    className={
                        "perseus-widget-editor-title " +
                        (this.state.showWidget ? "open" : "closed")
                    }
                >
                    <div className="perseus-widget-editor-title-id">
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.25em",
                            }}
                            onClick={this._toggleWidget}
                        >
                            <ToggleableCaret
                                isExpanded={this.state.showWidget}
                            />
                            <span>{this.props.id}</span>
                        </View>
                    </div>

                    <SectionControlButton
                        icon={trashIcon}
                        disabled={isEditingDisabled}
                        onClick={() => {
                            this.props.onRemove();
                        }}
                        title="Remove image widget"
                    />
                </div>
                {this.state.showWidget && (
                    <WidgetEditorSettings
                        bestPractices={Ed?.bestPractices}
                        supportsStaticMode={!!supportsStaticMode}
                        isStatic={!!widgetInfo.static}
                        onStaticChange={this._setStatic}
                        supportsGradedToggle={supportsGradedToggle}
                        isGraded={widgetInfo.graded !== false}
                        onGradedChange={this._setGraded}
                        supportedAlignments={supportedAlignments}
                        widgetInfo={widgetInfo}
                        onAlignmentChange={this._handleAlignmentChange}
                        isEditingDisabled={isEditingDisabled}
                    />
                )}
                <div
                    className={
                        "perseus-widget-editor-content " +
                        (this.state.showWidget ? "enter" : "leave")
                    }
                >
                    {Ed && (
                        <Ed
                            ref={this.widget}
                            onChange={this._handleWidgetChange}
                            static={widgetInfo.static}
                            graded={widgetInfo.graded}
                            apiOptions={this.props.apiOptions}
                            {...widgetInfo.options}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default WidgetEditor;
