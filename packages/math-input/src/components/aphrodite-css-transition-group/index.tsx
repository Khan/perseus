/**
 * Aphrodite doesn't play well with CSSTransition from react-transition-group,
 * which assumes that you have CSS classes and it can combine them arbitrarily.
 *
 * There are also some issue with react-transition-group that make it difficult
 * to work.  Even if the CSS classes are defined ahead of time it makes no
 * guarantee that the start style will be applied by the browser before the
 * active style is applied.  This can cause the first time a transition runs to
 * fail.
 *
 * AphroditeCSSTransitionGroup provides a wrapper around TransitionGroup to
 * address these issues.
 *
 * There are three types of transitions:
 * - appear: the time the child is added to the render tree
 * - enter: whenever the child is added to the render tree after "appear".  If
 *   no "appear" transition is specified then the "enter" transition will also
 *   be used for the first time the child is added to the render tree.
 * - leave: whenever the child is removed from the render tree
 *
 * Each transition type has two states:
 * - base: e.g. css(enter)
 * - active: e.g. css(enter, enterActive)
 *
 * If "done" styles are not provided, the "active" style will remain on the
 * component after the animation has completed.
 *
 * Usage: TBD
 *
 * Limitations:
 * - This component only supports a single child whereas TransitionGroup supports
 *   multiple children.
 * - We ignore inline styles that are provided as part of AnimationStyles.
 *
 * TODOs:
 * - (FEI-3211): Change the API for AphroditeCSSTransitionGroup so that it makes
 *   bad states impossible.
 */
import * as React from "react";
import {TransitionGroup} from "react-transition-group";

import TransitionChild from "./transition-child";

import type {AnimationStyles} from "./types";

type Props = {
    // If a function is provided, that function will be called to retrieve the
    // current set of animation styles to be used when animating the children.
    transitionStyle: AnimationStyles | (() => AnimationStyles);
    transitionAppearTimeout?: number;
    transitionEnterTimeout?: number;
    transitionLeaveTimeout?: number;
    children?: React.ReactNode;
};

class AphroditeCSSTransitionGroup extends React.Component<Props> {
    render(): React.ReactNode {
        const {children} = this.props;
        return (
            // `component={null}` prevents wrapping each child with a <div>
            // which can muck with certain layouts.
            <TransitionGroup component={null}>
                {React.Children.map(children, (child) => (
                    <TransitionChild
                        transitionStyles={this.props.transitionStyle}
                        appearTimeout={this.props.transitionAppearTimeout}
                        enterTimeout={this.props.transitionEnterTimeout}
                        leaveTimeout={this.props.transitionLeaveTimeout}
                    >
                        {child}
                    </TransitionChild>
                ))}
            </TransitionGroup>
        );
    }
}

export default AphroditeCSSTransitionGroup;
