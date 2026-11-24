import {Widgets} from "@khanacademy/perseus";
import {
    applyDefaultsToWidget,
    CoreWidgetRegistry,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import * as WidgetEditorRegistry from "../widget-editor-registry";

import SectionControlButton from "./section-control-button";
import ToggleableCaret from "./toggleable-caret";
import UnsupportedWidgetEditor from "./unsupported-widget-editor";
import WidgetEditorSettings from "./widget-editor-settings";

import type {APIOptions} from "@khanacademy/perseus";
import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";

interface Props {
    id: string;
    onChange: (widgetInfo: PerseusWidget) => void;
    onRemove: () => unknown;
    apiOptions: APIOptions;
    widgetIsOpen?: boolean;
    widgetInfo: PerseusWidget;
}

type State = {
    showWidget: boolean;
};

class WidgetEditorContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showWidget: props.widgetIsOpen ?? true,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        // user can update internal state while the widget is handled globally
        if (
            nextProps.widgetIsOpen != null &&
            nextProps.widgetIsOpen !== this.props.widgetIsOpen
        ) {
            this.setState({showWidget: nextProps.widgetIsOpen});
        }
    }

    getWidgetInfo() {
        return applyDefaultsToWidget(this.props.widgetInfo);
    }

    _toggleWidget = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    };

    _handleWidgetChange = (newOptions: PerseusWidget["options"]) => {
        // eslint-disable-next-line no-restricted-syntax
        const newWidgetInfo = {
            ...this.getWidgetInfo(),
            options: newOptions,
        } as PerseusWidget;
        this.props.onChange(newWidgetInfo);
    };

    _setStatic = (value: boolean) => {
        const newWidgetInfo = {
            ...this.getWidgetInfo(),
            static: value,
            // if it's "interactive but ungraded" (ungraded)
            // we don't also want it to be "non-interactive" (static)
            // because "interactive" and "non-interactive" are mutually exclusive concepts
            graded: true,
        } satisfies PerseusWidget;
        this.props.onChange(newWidgetInfo);
    };

    _setGraded = (value: boolean) => {
        const newWidgetInfo = {
            ...this.getWidgetInfo(),
            graded: value,
            // if it's "interactive but ungraded" (ungraded)
            // we don't also want it to be "non-interactive" (static)
            // because "interactive" and "non-interactive" are mutually exclusive concepts
            static: false,
        } satisfies PerseusWidget;
        this.props.onChange(newWidgetInfo);
    };

    _handleAlignmentChange = (newAlignment: Alignment) => {
        this.props.onChange({
            ...this.getWidgetInfo(),
            alignment: newAlignment,
        });
    };

    render(): React.ReactNode {
        const widgetInfo = this.getWidgetInfo();
        const isEditingDisabled =
            this.props.apiOptions.editingDisabled ?? false;

        const WidgetEditor =
            WidgetEditorRegistry.getEditor(widgetInfo.type) ??
            UnsupportedWidgetEditor;
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
                        bestPractices={WidgetEditor?.bestPractices}
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
                    <WidgetEditor
                        onChange={this._handleWidgetChange}
                        static={widgetInfo.static}
                        graded={widgetInfo.graded}
                        apiOptions={this.props.apiOptions}
                        {...widgetInfo.options}
                    />
                </div>
            </div>
        );
    }
}

export default WidgetEditorContainer;
