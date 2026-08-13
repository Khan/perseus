/***********************************************************************
 *                                                                     *
 * WARNING!!!! THERE ARE ACTIVE CHANGES HAPPENING IN THE RENDERER!     *
 *                                                                     *
 ***********************************************************************/
// TODO(LEMS-4304): feature flag cleanup - rename this file to widget-container.tsx.
// This file is the new widget container that will replace the old container.

import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";

import {DependenciesContext} from "./dependencies";
import ErrorBoundary from "./error-boundary";
import {containerSizeClass, getClassFromWidth} from "./util/sizing-utils";
import {getWidgetSubType} from "./widget-type-utils";
import * as Widgets from "./widgets";

import type {WidgetProps} from "./types";

type Props = {
    type: string; // widget type/name,
    id: string; // widget id
    // TODO(benchristel): Pass real type arguments here.
    widgetProps: WidgetProps<any, any>;
};

type State = {
    sizeClass: "small" | "medium" | "large" | "xlarge";
};

class WidgetContainer extends React.Component<Props, State> {
    widgetRef = React.createRef<React.ComponentType<any>>();

    state: State = {
        sizeClass: containerSizeClass.MEDIUM,
    };

    componentDidMount() {
        // Only relay size class changes for mobile right now.  We may want to
        // this for desktop as well at some point in the future.
        if (this.props.widgetProps.apiOptions.isMobile) {
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetWidth' does not exist on type 'Element | Text'.
            const containerWidth = ReactDOM.findDOMNode(this).offsetWidth;

            // NOTE(benkomalo): in the common case, this won't change anything.
            // Unfortunately, it will cause a flash and re-layout on mobile,
            // but until we have better SSR or a more drastic way change to our
            // APIs that hints at the available size, we do have to measure DOM
            // unfortunately.
            this.setState({
                sizeClass: getClassFromWidth(containerWidth),
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.props.type !== nextProps.type) {
            throw new Error(
                "WidgetContainer can't change widget type; set a different " +
                    "key instead to recreate the container.",
            );
        }
    }

    getWidget: () => any = () => {
        return this.widgetRef.current;
    };

    render(): React.ReactNode {
        let className = classNames({
            "perseus-widget-container": true,
            // HACK(matthewc): perseus-widget-container is setting a font-size
            // but we want the definition prompt to match the surrounding font
            // I'm sorry, but there's a time crunch
            "perseus-widget__definition": this.props.type === "definition",
        });

        const type = this.props.type;
        const userAgent = navigator.userAgent;

        const WidgetType = Widgets.getWidget(type);
        if (WidgetType == null) {
            // This is for the good of all people!!
            // eslint-disable-next-line no-console
            console.warn(`Widget type '${type}' not found!`);
            // Just give up on invalid widget types
            return <div className={className} />;
        }

        const subType =
            getWidgetSubType(type, this.props.widgetProps.options) ?? "null";

        let alignment = this.props.widgetProps.alignment;
        if (alignment == null || alignment === "default") {
            alignment = CoreWidgetRegistry.getDefaultAlignment(type);
        }

        // This will set the WidgetContainer's alignment
        className += CoreWidgetRegistry.getAlignmentClassName(type, alignment);

        // Inline widgets should not be in a <div> because that could break
        // ancestor elements (like <p>) that can't contain block elements
        // (regardless of CSS styling "display").
        //
        // NOTE: `Container` must be a plain element-type string (not a
        // component defined here in render()). A component declared inside
        // render() gets a new identity on every render, which makes React
        // unmount and remount the entire widget subtree on each update —
        // losing input focus and dropped keystrokes for text-based widgets.
        const Container = alignment.startsWith("inline") ? "span" : "div";

        const apiOptions = this.props.widgetProps.apiOptions;

        // Hack to prevent interaction with static widgets: we overlay a big
        // div on top of the widget and overflow: hidden the container.
        // Ideally widgets themselves should know how to prevent interaction.
        // UPDATE HTML5: `inert` on the underlying div would be better
        const isStatic = this.props.widgetProps.static || apiOptions.readOnly;
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
            zIndex: 3,
        } as const;

        // Some widgets may include strings of markdown that we may
        // want to run the linter on. So if the widget is lintable,
        // and we've been asked to highlight lint, pass that property
        // on to the widget, and if the content is not lintable, make sure
        // to default to false.
        // The linter context might be a constant object (and it isn't owned
        // by us anyway), so we copy it if we have to modify it.
        // TODO(benchristel): Since linting logic varies by widget, it should
        //  live in the individual widget components, not here. Refactor to
        //  remove this `isLintable` check.
        const linterContext = Widgets.isLintable(type)
            ? this.props.widgetProps.linterContext
            : {...this.props.widgetProps.linterContext, highlightLint: false};

        // Note: if you add more props here, please consider whether or not
        // it should be auto-serialized.
        // See widget-jsonify-deprecated.jsx and widget-prop-denylist.jsx

        // We default to an empty object for style instead of null
        // because of a strange bug where the static styles aren't applied
        // after toggling static mode.
        return (
            <Container
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
                            onError={(error: Error) => {
                                analytics.onAnalyticsEvent({
                                    type: "perseus:widget-rendering-error:ti",
                                    payload: {
                                        widgetSubType: subType,
                                        widgetType: type,
                                        widgetId: this.props.id,
                                        message: error.message,
                                        stack:
                                            error.stack ??
                                            "No stack trace available",
                                        userAgent: userAgent,
                                    },
                                });
                            }}
                        >
                            <WidgetType
                                {...this.props.widgetProps}
                                linterContext={linterContext}
                                containerSizeClass={this.state.sizeClass}
                                ref={this.widgetRef}
                            />
                            {isStatic && <div style={staticOverlayStyles} />}
                        </ErrorBoundary>
                    )}
                </DependenciesContext.Consumer>
            </Container>
        );
    }
}

export default WidgetContainer;
