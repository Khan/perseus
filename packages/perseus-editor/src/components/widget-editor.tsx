/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {Widgets, WIDGET_PROP_DENYLIST, iconTrash} from "@khanacademy/perseus";
import {
    CoreWidgetRegistry,
    applyDefaultsToWidget,
} from "@khanacademy/perseus-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";
import {useId} from "react";
import _ from "underscore";

import SectionControlButton from "./section-control-button";

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
    const filteredProps = _.omit(props, WIDGET_PROP_DENYLIST);
    return applyDefaultsToWidget(filteredProps as any);
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
        // Casting to any is necessary because typescript
        // seems confused about the type of WidgetOptions
        // TODO (LC-1794): Fix this type so that we don't
        // require the cast to any.
        const newWidgetInfo = {
            ...this.state.widgetInfo,
            options: {
                ...this.state.widgetInfo.options,
                ...(this.widget.current?.serialize() ?? {}),
                ...newProps,
            },
        } as any;
        this.props.onChange(newWidgetInfo, cb, silent);
    };

    _setStatic = (value: boolean) => {
        const newWidgetInfo = {
            ...this.state.widgetInfo,
            static: value,
        } as PerseusWidget;
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
        // TODO(alex): Make this properly handle the case where we load json
        // with a more recent widget version than this instance of Perseus
        // knows how to handle.
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

        const toggleIcon = this.state.showWidget ? caretDown : caretRight;
        const buttonStyle = {
            marginRight: 0,
            flexGrow: 0,
        };

        return (
            <div className="perseus-widget-editor">
                <div
                    className={
                        "perseus-widget-editor-title " +
                        (this.state.showWidget ? "open" : "closed")
                    }
                >
                    <div className="perseus-widget-editor-title-id">
                        <IconButton
                            icon={toggleIcon}
                            kind="tertiary"
                            size="small"
                            onClick={this._toggleWidget}
                            actionType="neutral"
                            style={buttonStyle}
                        />
                        <span>{this.props.id}</span>
                    </div>

                    {supportsStaticMode && (
                        <LabeledSwitch
                            label="Static"
                            checked={!!widgetInfo.static}
                            onChange={this._setStatic}
                        />
                    )}
                    {supportedAlignments.length > 1 && (
                        <select
                            className="alignment"
                            value={widgetInfo.alignment}
                            onChange={this._handleAlignmentChange}
                        >
                            {supportedAlignments.map((alignment) => (
                                <option key={alignment}>{alignment}</option>
                            ))}
                        </select>
                    )}
                    <SectionControlButton
                        icon={iconTrash}
                        onClick={() => {
                            this.props.onRemove();
                        }}
                        title="Remove image widget"
                    />
                </div>
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
                            apiOptions={this.props.apiOptions}
                            {...widgetInfo.options}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function LabeledSwitch(props: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => unknown;
}) {
    const {label, ...switchProps} = props;
    const id = useId();
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <Strut size={spacing.xxSmall_6} />
            <Switch id={id} {...switchProps} />
        </>
    );
}

export default WidgetEditor;
