import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import * as React from "react";
import ReactDOM from "react-dom";

import {processStyleType} from "./util";

import type {AnimationStyles} from "./types";
import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";

type ChildProps = {
    transitionStyles: AnimationStyles | (() => AnimationStyles);
    appearTimeout?: number; // default appearTimeout to be the same as enterTimeout
    enterTimeout?: number;
    leaveTimeout?: number;
    children: React.ReactNode;
    in?: boolean; // provided by TransitionGroup
} & WithActionSchedulerProps;

type ChildState = {
    // Keeps track of whether we should render our children or not.
    status: "mounted" | "unmounted";
};

class TransitionChild extends React.Component<ChildProps, ChildState> {
    // Each 2-tuple in the queue represents two classnames: one to remove and
    // one to add (in that order).
    classNameQueue: Array<[string, string]>;
    // We keep track of all of the current applied classes so that we can remove
    // them before a new transition starts in the case of the current transition
    // being interrupted.
    appliedClassNames: Set<string>;
    _isMounted = false;

    // The use of getDerivedStateFromProps here is to avoid an extra call to
    // setState if the component re-enters.  This can happen if TransitionGroup
    // sets `in` from `false` to `true`.
    // eslint-disable-next-line no-restricted-syntax
    static getDerivedStateFromProps(
        {in: nextIn}: ChildProps,
        prevState: ChildState,
    ): Partial<ChildState> | null {
        if (nextIn && prevState.status === "unmounted") {
            return {status: "mounted"};
        }
        return null;
    }

    constructor(props: ChildProps) {
        super(props);

        this._isMounted = false;
        this.classNameQueue = [];
        this.appliedClassNames = new Set();

        this.state = {
            status: "mounted",
        };
    }

    componentDidMount() {
        this._isMounted = true;

        if (typeof this.props.appearTimeout === "number") {
            this.transition("appear", this.props.appearTimeout);
        } else {
            this.transition("enter", this.props.enterTimeout);
        }
    }

    componentDidUpdate(oldProps: ChildProps, oldState: ChildState) {
        if (oldProps.in && !this.props.in) {
            this.transition("leave", this.props.leaveTimeout);
        } else if (!oldProps.in && this.props.in) {
            this.transition("enter", this.props.enterTimeout);
        }

        if (oldState.status !== "mounted" && this.state.status === "mounted") {
            // Remove the node from the DOM
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({status: "unmounted"});
        }
    }

    // NOTE: This will only get called when the parent TransitionGroup becomes
    // unmounted.  This is because that component clones all of its children and
    // keeps them around so that they can be animated when leaving and also so
    // that the can be animated when re-rentering if that occurs.
    componentWillUnmount() {
        this._isMounted = false;
        this.props.schedule.clearAll();
    }

    removeAllClasses(node: Element) {
        for (const className of this.appliedClassNames) {
            this.removeClass(node, className);
        }
    }

    addClass = (elem: Element, className: string): void => {
        if (className) {
            elem.classList.add(className);
            this.appliedClassNames.add(className);
        }
    };

    removeClass = (elem: Element, className: string): void => {
        if (className) {
            elem.classList.remove(className);
            this.appliedClassNames.delete(className);
        }
    };

    transition(
        animationType: "appear" | "enter" | "leave",
        duration?: number | null,
    ) {
        const node = ReactDOM.findDOMNode(this);

        if (!(node instanceof Element)) {
            return;
        }

        // Remove any classes from previous transitions.
        this.removeAllClasses(node);

        // A previous transition may still be in progress so clear its timers.
        this.props.schedule.clearAll();

        const transitionStyles =
            typeof this.props.transitionStyles === "function"
                ? this.props.transitionStyles()
                : this.props.transitionStyles;

        const {className} = processStyleType(transitionStyles[animationType]);
        const {className: activeClassName} = processStyleType([
            transitionStyles[animationType],
            transitionStyles[animationType + "Active"],
        ]);

        // Put the node in the starting position.
        this.addClass(node, className);

        // Queue the component to show the "active" style.
        this.queueClass(className, activeClassName);

        // Unmount the children after the 'leave' transition has completed.
        if (animationType === "leave") {
            this.props.schedule.timeout(() => {
                if (this._isMounted) {
                    this.setState({status: "unmounted"});
                }
            }, duration || 0);
        }
    }

    queueClass(removeClassName: string, addClassName: string) {
        this.classNameQueue.push([removeClassName, addClassName]);
        // Queue operation for after the next paint.
        this.props.schedule.timeout(this.flushClassNameQueue, 0);
    }

    flushClassNameQueue = () => {
        if (this._isMounted) {
            const node = ReactDOM.findDOMNode(this);
            if (node instanceof Element) {
                this.classNameQueue.forEach(
                    ([removeClassName, addClassName]: [any, any]) => {
                        // Remove the old class before adding a new class just
                        // in case the new class is the same as the old one.
                        this.removeClass(node, removeClassName);
                        this.addClass(node, addClassName);
                    },
                );
            }
        }

        // Remove all items in the Array.
        this.classNameQueue.length = 0;
    };

    render(): React.ReactNode {
        const {status} = this.state;

        if (status === "unmounted") {
            return null;
        }

        return this.props.children;
    }
}

export default withActionScheduler(TransitionChild);
