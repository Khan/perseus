/**
 * Add hover behavior to another component.
 *
 * This component provides hover and focus status updates in a consistent way
 * across desktop and mobile.
 *
 * For advice on when to use this component instead of Button, see README.md.
 *
 * Many mobile browsers treat :hover as sticky which results in buttons looking
 * pressed even when the user has lifted their finger.  This component ensures
 * that when user lifts their finger the hover state is removed.
 *
 * We also chnage how the focus state works.  Browsers immediately set the
 * focus state as soon as you click on a button.  This component only sets the
 * focus state when a user starts navigating between elements via keybaord.
 *
 * HoverBehavior accepts a function as 'children' which is passed state and
 * an object containing event handlers.  The 'children' function should return
 * an React Element of some sort.
 *
 * Example:
 *
 * class MyButtonLikeComponent extends React.Component {
 *     render(): React.Node {
 *         return <HoverBehavior
 *             disabled={this.props.disabled}
 *             onClick={this.handleClick}
 *         >
 *             {({hovered}, handlers) =>
 *                 <RoundRect
 *                      textcolor='white'
 *                      backgroundColor={hovered ? 'red' : 'blue'}/>}
 *                      {...handlers}
 *                 >
 *                      {this.props.children}
 *                 </RoundRect>
 *             }
 *         </HoverBehavior>
 *     }
 * }
 *
 * This follows a pattern call 'Function as Child Components':
 * https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9#.sw0jiio8b
 */
import * as React from "react";

type Handlers = {
    onBlur: () => unknown;
    onClick: (e: React.MouseEvent) => unknown;
    onFocus: () => unknown;
    onMouseDown: () => unknown;
    onMouseEnter: () => unknown;
    onMouseLeave: () => unknown;
    onTouchStart: () => unknown;
    onTouchEnd: () => unknown;
};

type State = {
    focused: boolean;
    hovered: boolean;
};

type Props = {
    children?: (state: State, handlers: Handlers) => React.ReactElement;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => unknown;
    startHovered: boolean;
    shouldUpdate: () => boolean;
};

export default class HoverBehavior extends React.Component<Props, State> {
    // @ts-expect-error - TS2564 - Property 'focusFlag' has no initializer and is not definitely assigned in the constructor.
    focusFlag: boolean;
    // @ts-expect-error - TS2564 - Property 'waitingForClick' has no initializer and is not definitely assigned in the constructor.
    waitingForClick: boolean;

    static defaultProps: {
        shouldUpdate: () => boolean;
        startHovered: boolean;
    } = {
        startHovered: false,
        shouldUpdate: () => true,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            focused: false,
            hovered: props.startHovered,
        };
    }

    handleClick: (e: React.MouseEvent) => void = (e: React.MouseEvent) => {
        if (!this.props.disabled) {
            if (this.props.shouldUpdate()) {
                this.waitingForClick = false;
            }
            if (this.props.onClick && !this.props.disabled) {
                this.props.onClick(e);
            }
        }
    };

    handleMouseEnter: () => void = () => {
        if (
            !this.props.disabled &&
            this.props.shouldUpdate() &&
            !this.waitingForClick
        ) {
            this.setState({hovered: true});
        }
    };

    handleMouseLeave: () => void = () => {
        if (
            !this.props.disabled &&
            this.props.shouldUpdate() &&
            !this.waitingForClick
        ) {
            this.setState({hovered: false});
        }
    };

    handleTouchStart: () => void = () => {
        if (!this.props.disabled && this.props.shouldUpdate()) {
            this.setState({hovered: true});
        }
    };

    handleTouchEnd: () => void = () => {
        if (!this.props.disabled && this.props.shouldUpdate()) {
            this.setState({hovered: false});
            this.waitingForClick = true;
        }
    };

    handleMouseDown: () => void = () => {
        if (!this.props.disabled && this.props.shouldUpdate()) {
            this.setState({focused: false});
            this.focusFlag = true;
        }
    };

    handleBlur: () => void = () => {
        if (!this.props.disabled && this.props.shouldUpdate()) {
            this.setState({focused: false});
        }
    };

    handleFocus: () => void = () => {
        if (!this.props.disabled && this.props.shouldUpdate()) {
            if (this.focusFlag) {
                this.focusFlag = false;
            } else {
                this.setState({focused: true});
            }
        }
    };

    render(): React.ReactNode {
        const handlers = {
            onBlur: this.handleBlur,
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onMouseDown: this.handleMouseDown,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onTouchStart: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
        } as const;

        const {children} = this.props;
        return children?.(this.state, handlers) || null;
    }
}
