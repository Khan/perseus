/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable @typescript-eslint/no-invalid-this, react/no-unsafe */
import {Errors} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import {Log} from "../../logging/log";
import Renderer from "../../renderer";
import Util from "../../util";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/orderer/orderer-ai-utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {OrdererPromptJSON} from "../../widget-ai-utils/orderer/orderer-ai-utils";
import type {
    PerseusOrdererWidgetOptions,
    PerseusOrdererUserInput,
} from "@khanacademy/perseus-core";
import type {OrdererPublicWidgetOptions} from "@khanacademy/perseus-core/src/widgets/orderer/orderer-util";
import type {LinterContextProps} from "@khanacademy/perseus-linter";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type PlaceholderCardProps = {
    width: number | null | undefined;
    height: number | null | undefined;
};

class PlaceholderCard extends React.Component<PlaceholderCardProps> {
    render(): React.ReactNode {
        return (
            <div
                className={"card-wrap"}
                style={{width: this.props.width as number}}
            >
                <div
                    className="card placeholder"
                    style={{height: this.props.width as number}}
                />
            </div>
        );
    }
}

class DragHintCard extends React.Component<any> {
    render(): React.ReactNode {
        return (
            <div className={"card-wrap"}>
                <div className="card drag-hint" />
            </div>
        );
    }
}

type Position = {
    left: number;
    top: number;
};

type CardProps = {
    content: string;
    fakeRef?: string;
    mouse?: Position;

    floating: boolean;
    animating: boolean;
    width?: number | null | undefined;
    stack: boolean;

    onMouseDown?: any;
    onMouseMove?: any;
    onMouseUp?: any;

    // Used only for floating/animating cards
    startMouse?: Position;
    startOffset?: Position | null | undefined;
    animateTo?: Position | null | undefined;
    onAnimationEnd?: any;
    linterContext: LinterContextProps;
};

type CardDefaultProps = {
    stack: CardProps["stack"];
    animating: CardProps["animating"];
    linterContext: CardProps["linterContext"];
};

type CardState = {
    dragging: boolean;
};

class Card extends React.Component<CardProps, CardState> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // @ts-expect-error - TS2564 - Property 'mouseMoveUpBound' has no initializer and is not definitely assigned in the constructor.
    mouseMoveUpBound: boolean;

    static defaultProps: CardDefaultProps = {
        stack: false,
        animating: false,
        linterContext: linterContextDefault,
    };

    state = {dragging: false};

    componentDidMount() {
        this.mouseMoveUpBound = false;

        // On touch devices, we set up our own touchmove handler because React
        // all event subscriptions using `OnTouchMove` props are non-passive.
        // See: https://github.com/facebook/react/issues/6436
        // Also, we can't subscribe to `ontouchmove`  within the `ontouchstart`
        // handler because of a WebKit bug:
        // https://github.com/atlassian/react-beautiful-dnd/issues/413 and
        // https://bugs.webkit.org/show_bug.cgi?id=184250
        document.addEventListener(
            "touchmove",
            this.onMouseMove,
            // Not all browsers support passive events, and when they don't
            // this third paramter is just a boolean. If we pass the "options"
            // object, it's interpreted as `capture=true` (which we don't want!)
            Util.supportsPassiveEvents() ? {passive: false} : false,
        );
    }

    shouldComponentUpdate(nextProps: any, nextState) {
        // Cards in the bank or drag list don't usually change -- they only
        // reorder themselves -- so we want to skip the update to things a
        // little faster. We also need to re-render if the content changes,
        // which happens only in the editor. (We do want to update the floating
        // card on mouse move to update its position.)
        return (
            this.props.floating ||
            nextProps.floating ||
            this.props.content !== nextProps.content ||
            // TODO(alpert): Remove ref here after fixing facebook/react#1392.
            this.props.fakeRef !== nextProps.fakeRef
        );
    }

    componentDidUpdate(prevProps, prevState: any) {
        if (
            this.props.animating &&
            !prevProps.animating &&
            this.props.animateTo &&
            this.props.startOffset
        ) {
            // If we just were changed into animating, start the animation.
            // We pick the animation speed based on the distance that the card
            // needs to travel. (Why sqrt? Just because it looks nice -- with a
            // linear scale, far things take too long to come back.)
            const ms =
                15 *
                Math.sqrt(
                    Math.sqrt(
                        Math.pow(
                            this.props.animateTo.left -
                                this.props.startOffset.left,
                            2,
                        ) +
                            Math.pow(
                                this.props.animateTo.top -
                                    this.props.startOffset.top,
                                2,
                            ),
                    ),
                );
            // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'animate' does not exist on type 'JQueryStatic'.
            $(ReactDOM.findDOMNode(this)).animate(
                this.props.animateTo,
                Math.max(ms, 1),
                this.props.onAnimationEnd,
            );
        }
    }

    componentWillUnmount() {
        // Event handlers should be unbound before component unmounting, but
        // just in case...
        if (this.mouseMoveUpBound) {
            Log.error(
                "Removing an element with bound event handlers.",
                Errors.Internal,
            );

            this.unbindMouseMoveUp();
            Util.resetTouchHandlers();
        }

        document.removeEventListener("touchmove", this.onMouseMove);
    }

    bindMouseMoveUp: () => void = () => {
        this.mouseMoveUpBound = true;
        $(document).on("mousemove", this.onMouseMove);
        $(document).on("mouseup", this.onMouseUp);
    };

    unbindMouseMoveUp: () => void = () => {
        this.mouseMoveUpBound = false;
        $(document).off("mousemove", this.onMouseMove);
        $(document).off("mouseup", this.onMouseUp);
    };

    onMouseDown: (arg1: any) => void = (event) => {
        event.preventDefault();
        const loc = Util.extractPointerLocation(event);
        if (loc) {
            this.setState({dragging: true});
            this.bindMouseMoveUp();
            this.props.onMouseDown?.(loc, this);
        }
    };

    onMouseMove: (arg1: any) => void = (event) => {
        if (!this.state.dragging) {
            return;
        }

        event.preventDefault();
        const loc = Util.extractPointerLocation(event);
        if (loc) {
            this.props.onMouseMove?.(loc);
        }
    };

    onMouseUp: (arg1: any) => void = (event) => {
        event.preventDefault();
        const loc = Util.extractPointerLocation(event);
        if (loc) {
            this.setState({dragging: false});
            this.unbindMouseMoveUp();
            this.props.onMouseUp?.(loc);
        }
    };

    render(): React.ReactNode {
        let style: Record<string, any> = {};

        if (this.props.floating) {
            style = {
                position: "absolute",
                left: this.props.startOffset?.left,
                top: this.props.startOffset?.top,
            };
        }

        if (this.props.width) {
            style.width = this.props.width;
        }

        const className = ["card"];
        if (this.props.stack) {
            className.push("stack");
        }
        if (
            this.props.floating &&
            !this.props.animating &&
            this.props.mouse &&
            this.props.startMouse
        ) {
            className.push("dragging");
            style.left += this.props.mouse.left - this.props.startMouse.left;
            style.top += this.props.mouse.top - this.props.startMouse.top;
        }

        // Pull out the content to get rendered
        const rendererProps = {content: this.props.content};

        const onMouseDown = this.props.animating ? $.noop : this.onMouseDown;

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO(LEMS-2871): Address a11y error
            <div
                className={"card-wrap"}
                style={style}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                onTouchEnd={this.onMouseUp}
                onTouchCancel={this.onMouseUp}
            >
                <div className={className.join(" ")}>
                    <Renderer
                        {...rendererProps}
                        linterContext={this.props.linterContext}
                        strings={this.context.strings}
                    />
                </div>
            </div>
        );
    }
}

type RenderProps = OrdererPublicWidgetOptions;

type OrdererProps = WidgetProps<RenderProps, PerseusOrdererUserInput>;

type OrdererDefaultProps = Pick<
    OrdererProps,
    "options" | "height" | "layout" | "linterContext" | "userInput"
>;

type OrdererState = {
    dragging: boolean;
    placeholderIndex: number | null | undefined;
    dragKey: string | null | undefined;
    animating: boolean;
    dragWidth: number | null | undefined;
    dragHeight: number | null | undefined;
    dragContent: any;
    offsetPos: Position | null | undefined;
    grabPos: any;
    mousePos?: any;
    animateTo: Position | null | undefined;
    onAnimationEnd?: (arg1: any) => void;
};

0 as any as WidgetProps<
    PerseusOrdererWidgetOptions,
    PerseusOrdererUserInput
> satisfies PropsFor<typeof Orderer>;

0 as any as WidgetProps<
    OrdererPublicWidgetOptions,
    PerseusOrdererUserInput
> satisfies PropsFor<typeof Orderer>;

class Orderer
    extends React.Component<OrdererProps, OrdererState>
    implements Widget
{
    static defaultProps: OrdererDefaultProps = {
        options: [],
        height: "normal",
        layout: "horizontal",
        linterContext: linterContextDefault,
        userInput: {
            current: [],
        },
    };

    state: OrdererState = {
        dragging: false,
        placeholderIndex: null,
        dragKey: null,
        animating: false,
        dragContent: null,
        dragWidth: null,
        dragHeight: null,
        offsetPos: null,
        animateTo: null,
        grabPos: null,
    };

    onClick: (arg1: string, arg2: number, arg3: any, arg4: Element) => void = (
        type,
        index,
        loc,
        draggable,
    ) => {
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $draggable = $(ReactDOM.findDOMNode(draggable));
        const list = this.props.userInput.current.slice();

        let opt;
        let placeholderIndex = null;

        if (type === "current") {
            // If this is coming from the original list, remove the original
            // card from the list
            list.splice(index, 1);
            opt = this.props.userInput.current[index];
            // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'null'.
            placeholderIndex = index;
        } else if (type === "bank") {
            opt = this.props.options[index];
        }

        this.props.handleUserInput({current: list});
        this.setState({
            dragging: true,
            placeholderIndex: placeholderIndex,
            dragKey: opt.key,
            dragContent: opt.content,
            // @ts-expect-error - TS2339 - Property 'width' does not exist on type 'JQueryStatic'.
            dragWidth: $draggable.width(),
            // @ts-expect-error - TS2339 - Property 'height' does not exist on type 'JQueryStatic'.
            dragHeight: $draggable.height(),
            grabPos: loc,
            mousePos: loc,
            // @ts-expect-error - TS2339 - Property 'position' does not exist on type 'JQueryStatic'.
            offsetPos: $draggable.position(),
        });
    };

    onRelease: (arg1: any) => void = (loc) => {
        // eslint-disable-next-line react/no-string-refs
        const draggable = this.refs.dragging;
        if (draggable == null) {
            return;
        }
        const inCardBank = this.isCardInBank(draggable);
        const index = this.state.placeholderIndex || 0;

        // Here, we build a callback function for the card to call when it is
        // done animating
        const onAnimationEnd = () => {
            const list = this.props.userInput.current.slice();

            if (!inCardBank) {
                // Insert the new card into the position
                const newCard = {
                    content: this.state.dragContent,
                    key: _.uniqueId("perseus_draggable_card_"),
                    width: this.state.dragWidth,
                } as const;

                list.splice(index, 0, newCard.content);
            }

            this.props.handleUserInput({
                current: list,
            });
            this.setState({
                dragging: false,
                placeholderIndex: null,
                animating: false,
            });
            this.props.trackInteraction();
        };

        // Find the position of the card we should animate to
        // TODO(alpert): Update mouse position once more before animating?
        // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'position' does not exist on type 'JQueryStatic'.
        const offset = $(ReactDOM.findDOMNode(draggable)).position();
        let finalOffset = null;
        if (inCardBank) {
            // If we're in the card bank, go through the options to find the
            // one with the same content
            this.props.options.forEach((opt, i) => {
                if (opt.content === this.state.dragContent) {
                    const card = ReactDOM.findDOMNode(
                        // eslint-disable-next-line react/no-string-refs
                        this.refs["bank" + i],
                    );
                    // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'position' does not exist on type 'JQueryStatic'.
                    finalOffset = $(card).position();
                }
            });
            // eslint-disable-next-line react/no-string-refs
        } else if (this.refs.placeholder != null) {
            // Otherwise, go to the position that the placeholder is at
            finalOffset = $(
                // eslint-disable-next-line react/no-string-refs
                // @ts-expect-error - TS2769 - No overload matches this call.
                ReactDOM.findDOMNode(this.refs.placeholder),
                // @ts-expect-error - TS2339 - Property 'position' does not exist on type 'JQueryStatic'.
            ).position();
        }

        if (finalOffset == null) {
            // If we didn't find a card to go to, simply make the changes we
            // would have made at the end. (should only happen if we are
            // messing around with card contents, and not on the real site)
            onAnimationEnd();
        } else {
            this.setState({
                offsetPos: offset,
                animateTo: finalOffset,
                onAnimationEnd: onAnimationEnd,
                animating: true,
                dragging: false,
            });
        }
    };

    onMouseMove: (arg1: any) => void = (loc) => {
        // eslint-disable-next-line react/no-string-refs
        const draggable = this.refs.dragging;
        if (draggable == null) {
            return;
        }

        let index;
        if (this.isCardInBank(draggable)) {
            index = null;
        } else {
            index = this.findCorrectIndex(
                draggable,
                this.props.userInput.current,
            );
        }

        this.setState({
            mousePos: loc,
            placeholderIndex: index,
        });
    };

    findCorrectIndex: (arg1: any, arg2: any) => any = (draggable, list) => {
        // Find the correct index for a card given the current cards.
        const isHorizontal = this.props.layout === "horizontal";
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $dragList = $(ReactDOM.findDOMNode(this.refs.dragList));
        // @ts-expect-error - TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
        const leftEdge = $dragList.offset().left;
        // @ts-expect-error - TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
        const topEdge = $dragList.offset().top;
        const midWidth =
            // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
            $(ReactDOM.findDOMNode(draggable)).offset().left - leftEdge;
        const midHeight =
            // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
            $(ReactDOM.findDOMNode(draggable)).offset().top - topEdge;
        let index = 0;
        let sumWidth = 0;
        let sumHeight = 0;

        if (isHorizontal) {
            list.forEach((opt, i) => {
                const card = ReactDOM.findDOMNode(
                    // eslint-disable-next-line react/no-string-refs
                    this.refs["sortable" + i],
                );
                // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'outerWidth' does not exist on type 'JQueryStatic'.
                const outerWidth = $(card).outerWidth(true);
                if (midWidth > sumWidth + outerWidth / 2) {
                    index += 1;
                }
                sumWidth += outerWidth;
            });
        } else {
            list.forEach((_, i) => {
                const card = ReactDOM.findDOMNode(
                    // eslint-disable-next-line react/no-string-refs
                    this.refs["sortable" + i],
                );
                // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'outerHeight' does not exist on type 'JQueryStatic'.
                const outerHeight = $(card).outerHeight(true);
                if (midHeight > sumHeight + outerHeight / 2) {
                    index += 1;
                }
                sumHeight += outerHeight;
            });
        }

        return index;
    };

    isCardInBank: (arg1: any) => boolean = (draggable) => {
        if (draggable == null) {
            return false;
        }

        const isHorizontal = this.props.layout === "horizontal";
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $draggable = $(ReactDOM.findDOMNode(draggable));
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $bank = $(ReactDOM.findDOMNode(this.refs.bank));
        // @ts-expect-error - TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
        const draggableOffset = $draggable.offset();
        // @ts-expect-error - TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
        const bankOffset = $bank.offset();
        // @ts-expect-error - TS2339 - Property 'outerHeight' does not exist on type 'JQueryStatic'.
        const draggableHeight = $draggable.outerHeight(true);
        // @ts-expect-error - TS2339 - Property 'outerHeight' does not exist on type 'JQueryStatic'.
        const bankHeight = $bank.outerHeight(true);
        // @ts-expect-error - TS2339 - Property 'outerWidth' does not exist on type 'JQueryStatic'.
        const bankWidth = $bank.outerWidth(true);
        // @ts-expect-error - TS2339 - Property 'outerWidth' does not exist on type 'JQueryStatic'.
        const draggableWidth = $draggable.outerWidth(true);

        if (isHorizontal) {
            return (
                draggableOffset.top + draggableHeight / 2 <
                bankOffset.top + bankHeight
            );
        }
        return (
            draggableOffset.left + draggableWidth / 2 <
            bankOffset.left + bankWidth
        );
    };

    // This component makes use of a lot of DOM manipulation
    // For testing and direct manipulation of values there's a function
    // to directly set the list value
    setListValues: (values: string[]) => void = (values) => {
        this.props.handleUserInput({current: values});
    };

    getPromptJSON(): OrdererPromptJSON {
        return _getPromptJSON(this.props);
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState(): any {
        const {userInput, ...rest} = this.props;
        return {
            ...rest,
            current: userInput.current.map((e) => ({content: e})),
        };
    }

    render(): React.ReactNode {
        // This is the card we are currently dragging
        const dragging = this.state.dragging && (
            <Card
                // eslint-disable-next-line react/no-string-refs
                ref="dragging"
                floating={true}
                content={this.state.dragContent}
                startOffset={this.state.offsetPos}
                startMouse={this.state.grabPos}
                mouse={this.state.mousePos}
                width={this.state.dragWidth}
                onMouseUp={this.onRelease}
                onMouseMove={this.onMouseMove}
                key={this.state.dragKey || "draggingCard"}
                linterContext={this.props.linterContext}
            />
        );

        // This is the card that is currently animating
        const animating = this.state.animating && (
            <Card
                floating={true}
                animating={true}
                content={this.state.dragContent}
                startOffset={this.state.offsetPos}
                width={this.state.dragWidth}
                animateTo={this.state.animateTo}
                onAnimationEnd={this.state.onAnimationEnd}
                key={this.state.dragKey || "draggingCard"}
                linterContext={this.props.linterContext}
            />
        );

        // This is the list of draggable, rearrangable cards
        const sortableCards = this.props.userInput.current.map((opt, i) => {
            return (
                <Card
                    key={`sortableCard${i}`}
                    ref={"sortable" + i}
                    fakeRef={"sortable" + i}
                    floating={false}
                    content={opt}
                    linterContext={this.props.linterContext}
                    onMouseDown={
                        this.state.animating
                            ? $.noop
                            : this.onClick.bind(null, "current", i)
                    }
                />
            );
        });

        if (this.state.placeholderIndex != null) {
            const placeholder = (
                <PlaceholderCard
                    // eslint-disable-next-line react/no-string-refs
                    ref="placeholder"
                    width={this.state.dragWidth}
                    height={this.state.dragHeight}
                    key="placeholder"
                />
            );
            sortableCards.splice(this.state.placeholderIndex, 0, placeholder);
        }

        const anySortableCards = sortableCards.length > 0;
        // @ts-expect-error - TS2345 - Argument of type 'false | Element' is not assignable to parameter of type 'Element'.
        sortableCards.push(dragging, animating);

        // If there are no cards in the list, then add a "hint" card
        const sortable = (
            <div className="perseus-clearfix draggable-box">
                {!anySortableCards && <DragHintCard />}
                {/* eslint-disable-next-line react/no-string-refs */}
                <div ref="dragList">{sortableCards}</div>
            </div>
        );

        // This is the bank of stacks of cards
        const bank = (
            // eslint-disable-next-line react/no-string-refs
            <div ref="bank" className="bank perseus-clearfix">
                {this.props.options.map((opt, i) => {
                    return (
                        <Card
                            ref={"bank" + i}
                            floating={false}
                            content={opt.content}
                            stack={true}
                            key={i}
                            linterContext={this.props.linterContext}
                            // eslint-disable-next-line react/jsx-no-bind
                            onMouseDown={
                                this.state.animating
                                    ? $.noop
                                    : this.onClick.bind(null, "bank", i)
                            }
                            onMouseMove={this.onMouseMove}
                            onMouseUp={this.onRelease}
                        />
                    );
                })}
            </div>
        );

        return (
            <div
                className={
                    "draggy-boxy-thing orderer " +
                    "height-" +
                    this.props.height +
                    " " +
                    "layout-" +
                    this.props.layout +
                    " " +
                    "blank-background " +
                    "perseus-clearfix "
                }
                // eslint-disable-next-line react/no-string-refs
                ref="orderer"
            >
                {bank}
                {sortable}
            </div>
        );
    }
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusOrdererUserInput {
    return {current: serializedState.current.map((e) => e.content)};
}

function getStartUserInput(): PerseusOrdererUserInput {
    return {current: []};
}

export default {
    name: "orderer",
    displayName: "Orderer",
    hidden: true,
    widget: Orderer,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Orderer>;
