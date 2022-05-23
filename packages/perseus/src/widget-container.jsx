/* eslint-disable react/no-unsafe, react/sort-comp */
// @flow
import {linterContextDefault} from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";

import {zIndexInteractiveComponent} from "./styles/constants.js";
import {containerSizeClass, getClassFromWidth} from "./util/sizing-utils.js";
import * as Widgets from "./widgets.js";

import type {PerseusWidgetOptions} from "./perseus-types.js";
import type {LinterContextProps, WidgetProps} from "./types.js";

type Props = {|
    shouldHighlight: boolean,
    type: string, // widget type/name
    initialProps: WidgetProps<$FlowFixMe, PerseusWidgetOptions>,
    linterContext: LinterContextProps,
|};

type DefaultProps = {|
    linterContext: LinterContextProps,
|};

type State = {|
    sizeClass: "small" | "medium" | "large" | "xlarge",
    widgetProps: WidgetProps<$FlowFixMe, PerseusWidgetOptions>,
|};

class WidgetContainer extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        linterContext: linterContextDefault,
    };

    state: $FlowFixMe = {
        // TODO(benkomalo): before we're mounted, we don't know how big
        // we're going to be, so just default to MEDIUM for now. :/ In the
        // future we can sniff with user-agents or something to get a
        // better approximation, to avoid flickers
        sizeClass: containerSizeClass.MEDIUM,
        widgetProps: this.props.initialProps,
    };

    componentDidMount() {
        // Only relay size class changes for mobile right now.  We may want to
        // this for desktop as well at some point in the future.
        if (this.state.widgetProps.apiOptions.isMobile) {
            // $FlowFixMe[prop-missing]
            // $FlowFixMe[incompatible-use]
            const containerWidth = ReactDOM.findDOMNode(this).offsetWidth;

            // NOTE(benkomalo): in the common case, this won't change anything.
            // Unfortunately, it will cause a flash and re-layout on mobile,
            // but until we have better SSR or a more drastic way change to our
            // APIs that hints at the available size, we do have to measure DOM
            // unfortunately.
            /* eslint-disable react/no-did-mount-set-state */
            this.setState({
                sizeClass: getClassFromWidth(containerWidth),
            });
            /* eslint-enable react/no-did-mount-set-state */
        }
    }

    render(): React.Node {
        let className = classNames({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
        });

        const type = this.props.type;
        const WidgetType = Widgets.getWidget(type);
        if (WidgetType == null) {
            // This is for the good of all people!!
            // eslint-disable-next-line no-console
            console.warn(`Widget type '${type}' not found!`);
            // Just give up on invalid widget types
            return <div className={className} />;
        }

        let alignment = this.state.widgetProps.alignment;
        if (alignment === "default") {
            alignment = Widgets.getDefaultAlignment(type);
        }

        className += " widget-" + alignment;

        const apiOptions = this.state.widgetProps.apiOptions;

        // Hack to prevent interaction with static widgets: we overlay a big
        // div on top of the widget and overflow: hidden the container.
        // Ideally widgets themselves should know how to prevent interaction.
        const isStatic = this.state.widgetProps.static || apiOptions.readOnly;
        const staticContainerStyles = {
            position: "relative",
            overflow: "visible",
        };
        const staticOverlayStyles = {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: zIndexInteractiveComponent,
        };

        // Some widgets may include strings of markdown that we may
        // want to run the linter on. So if the widget is lintable,
        // and we've been asked to highlight lint, pass that property
        // on to the widget, and if the content is not lintable, make sure
        // to default to false.
        // The linter context might be a constant object (and it isn't owned
        // by us anyway), so we copy it if we have to modify it.
        const linterContext = Widgets.isLintable(type)
            ? this.props.linterContext
            : {...this.props.linterContext, highlightLint: false};

        // Note: if you add more props here, please consider whether or not
        // it should be auto-serialized (e.g. used in scoreInput()). See
        // widget-jsonify-deprecated.jsx and widget-prop-blacklist.jsx

        // We default to an empty object for style instead of null
        // because of a strange bug where the static styles aren't applied
        // after toggling static mode.
        return (
            <div
                className={className}
                style={isStatic ? staticContainerStyles : {}}
            >
                <WidgetType
                    {...this.state.widgetProps}
                    linterContext={linterContext}
                    containerSizeClass={this.state.sizeClass}
                    // eslint-disable-next-line react/no-string-refs
                    ref="widget"
                />
                {isStatic && <div style={staticOverlayStyles} />}
            </div>
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.props.type !== nextProps.type) {
            throw new Error(
                "WidgetContainer can't change widget type; set a different " +
                    "key instead to recreate the container.",
            );
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return (
            this.props.shouldHighlight !== nextProps.shouldHighlight ||
            this.props.type !== nextProps.type ||
            this.state.widgetProps !== nextState.widgetProps ||
            this.state.sizeClass !== nextState.sizeClass
        );
    }

    getWidget: () => $FlowFixMe = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.widget;
    };

    replaceWidgetProps: (
        WidgetProps<$FlowFixMe, PerseusWidgetOptions>,
    ) => void = (newWidgetProps) => {
        this.setState({widgetProps: newWidgetProps});
    };
}

export default WidgetContainer;
