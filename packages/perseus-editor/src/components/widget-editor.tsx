import {Widgets} from "@khanacademy/perseus";
import {
    CoreWidgetRegistry,
    applyDefaultsToWidget,
    excludeDenylistKeys,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import SectionControlButton from "./section-control-button";
import ToggleableCaret from "./toggleable-caret";
import WidgetEditorSettings from "./widget-editor-settings";

import type {APIOptions} from "@khanacademy/perseus";
import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";

type Props = {
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
    widgetInfo: PerseusWidget;
};

type State = {
    showWidget: boolean;
    widgetInfo: PerseusWidget;
};

// exported for tests
export function _upgradeWidgetInfo(widgetInfo: PerseusWidget): PerseusWidget {
    // We can't call serialize here because this.refs.widget
    // doesn't exist before this component is mounted.
    // eslint-disable-next-line no-restricted-syntax
    const filteredWidget: PerseusWidget = excludeDenylistKeys(
        widgetInfo,
    ) as any;

    // This is circumventing an issue with excludeDenylistKeys;
    // it removes `graded` from WidgetOptions.options (good)
    // but it's also recursive so it removes `graded`
    // from the higher-up WidgetOptions (bad)
    // See: LEMS-4108 and https://khanacademy.slack.com/archives/C01AZ9H8TTQ/p1778089642003609
    filteredWidget.graded = widgetInfo.graded;

    return applyDefaultsToWidget(filteredWidget);
}

// This component handles upgading widget editor props via prop
// upgrade transforms. Widget editors will always be rendered
// with all available transforms applied, but the results of those
// transforms will not be propogated upwards until serialization.
class WidgetEditor extends React.Component<Props, State> {
    widget: React.RefObject<{
        serialize(): unknown;
        getSaveWarnings?: () => unknown;
    }>;

    constructor(props: Props) {
        super(props);
        this.state = {
            showWidget: props.widgetIsOpen ?? true,
            widgetInfo: _upgradeWidgetInfo(props.widgetInfo),
        };
        this.widget = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({widgetInfo: _upgradeWidgetInfo(nextProps.widgetInfo)});
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
        newOptions: PerseusWidget["options"],
        cb: () => unknown,
        silent: boolean,
    ) => {
        // eslint-disable-next-line no-restricted-syntax
        const newWidgetInfo = {
            ...this.state.widgetInfo,
            options: {
                ...this.state.widgetInfo.options,
                ...(this.widget.current?.serialize() ?? {}),
                ...newOptions,
            },
        } as PerseusWidget;
        this.props.onChange(newWidgetInfo, cb, silent);
    };

    _setStatic = (value: boolean) => {
        const newWidgetInfo = {
            ...this.state.widgetInfo,
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
            ...this.state.widgetInfo,
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
            ...this.state.widgetInfo,
            alignment: newAlignment,
        });
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
            // The inner widget editor (`this.widget.current`) can be absent
            // even while this WidgetEditor is mounted — e.g. when the widget's
            // type has no registered editor, so `Ed` never renders (see the
            // `{Ed && ...}` guard in render()). In that case fall back to the
            // last-known options rather than dereferencing a null ref, which
            // previously crashed the editor when toggling JSON mode.
            options: this.widget.current?.serialize() ?? widgetInfo.options,
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
