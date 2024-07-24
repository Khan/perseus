/* eslint-disable react/no-unsafe, react/sort-comp */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";

import {DependenciesContext} from "./dependencies";
import ErrorBoundary from "./error-boundary";
import {zIndexInteractiveComponent} from "./styles/constants";
import {containerSizeClass, getClassFromWidth} from "./util/sizing-utils";
import * as Widgets from "./widgets";

import type {PerseusWidgetOptions} from "./perseus-types";
import type {WidgetProps} from "./types";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = {
    shouldHighlight: boolean;
    type: string; // widget type/name,
    id: string; // widget id
    initialProps: WidgetProps<any, PerseusWidgetOptions>;
    linterContext: LinterContextProps;
};

type DefaultProps = {
    linterContext: LinterContextProps;
};

type State = {
    sizeClass: "small" | "medium" | "large" | "xlarge";
    widgetProps: WidgetProps<any, PerseusWidgetOptions>;
};

class WidgetContainer extends React.Component<Props, State> {
    widgetRef = React.createRef<React.ComponentType<any>>();

    static defaultProps: DefaultProps = {
        linterContext: linterContextDefault,
    };

    state: State = {
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
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetWidth' does not exist on type 'Element | Text'.
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

    render(): React.ReactNode {
        let className = classNames({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
            // HACK(matthewc): perseus-widget-container is setting a font-size
            // but we want the definition prompt to match the surrounding font
            // I'm sorry, but there's a time crunch
            "perseus-widget__definition": this.props.type === "definition",
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
        } as const;
        const staticOverlayStyles = {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: zIndexInteractiveComponent,
        } as const;

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
        // widget-jsonify-deprecated.jsx and widget-prop-denylist.jsx

        // We default to an empty object for style instead of null
        // because of a strange bug where the static styles aren't applied
        // after toggling static mode.
        return (
            <div
                className={className}
                style={isStatic ? staticContainerStyles : {}}
            >
                <DependenciesContext.Consumer>
                    {({analytics}) => (
                        <ErrorBoundary
                            metadata={{
                                widget_type: type,
                                widget_id: this.props.id,
                            }}
                            onError={() => {
                                analytics.onAnalyticsEvent({
                                    type: "perseus:widget-rendering-error",
                                    payload: {
                                        widgetType: type,
                                        widgetId: this.props.id,
                                    },
                                });
                            }}
                        >
                            <WidgetType
                                {...this.state.widgetProps}
                                linterContext={linterContext}
                                containerSizeClass={this.state.sizeClass}
                                ref={this.widgetRef}
                            />
                            {isStatic && <div style={staticOverlayStyles} />}
                        </ErrorBoundary>
                    )}
                </DependenciesContext.Consumer>
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

    getWidget: () => any = () => {
        return this.widgetRef.current;
    };

    replaceWidgetProps: (arg1: WidgetProps<any, PerseusWidgetOptions>) => void =
        (newWidgetProps) => {
            this.setState({widgetProps: newWidgetProps});
        };
}

export default WidgetContainer;
