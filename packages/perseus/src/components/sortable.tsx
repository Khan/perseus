/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable @typescript-eslint/no-invalid-this, react/no-unsafe */
import * as PerseusLinter from "@khanacademy/perseus-linter";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {StyleSheet, css} from "aphrodite";
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {getDependencies} from "../dependencies";
import Renderer from "../renderer";
import Util from "../util";

import {PerseusI18nContext} from "./i18n-context";

import type {Position} from "../util";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Layout = "horizontal" | "vertical";

enum ItemState {
    STATIC = "static",
    DRAGGING = "dragging",
    ANIMATING = "animating",
    DISABLED = "disabled",
}

// Augment the given position with the scroll position of the offset parent.
const addOffsetParentScroll = ($el: any, position: any) => {
    // NOTE(slim): $(el).offsetParent() is NOT equivalent to $el[0].offsetParent.
    // Specifically, when `el` is not positioned, then the native HTMLElement.offsetParent
    // returns the closest table element, which in this case is the <td> rendered by the
    // Perseus Matcher widget.
    // Conversely, jQuery's offsetParent() always returns the closest positioned ancestor,
    // even when the element is not positioned.
    const $offsetParent = $el.offsetParent();
    return {
        top: position.top + $offsetParent.scrollTop(),
        left: position.left + $offsetParent.scrollLeft(),
    };
};

type PlaceholderProps = {
    layout: Layout;
    width: number;
    height: number;
    margin?: string;
};

// A placeholder that appears in the sortable whenever an item is dragged.
class Placeholder extends React.Component<PlaceholderProps> {
    render(): React.ReactNode {
        const {layout} = this.props;
        const className = css(
            styles.card,
            styles.placeholder,
            layout === "horizontal" && styles.horizontalCard,
        );
        const style: any = {
            width: this.props.width,
            height: this.props.height,
        };

        if (this.props.margin != null) {
            style.margin = this.props.margin;
        }

        return <li className={className} style={style} />;
    }
}

type DraggableProps = {
    content: string;
    endPosition?: {left: number; top: number};
    includePadding: boolean;
    layout: Layout;
    width?: number;
    height?: number;
    margin?: string;
    onAnimationEnd: () => void;
    onMouseDown: () => void;
    onMouseMove: () => void;
    onMouseUp: () => void;
    onRender: () => void;
    state: ItemState;
    linterContext: LinterContextProps;
};

type DefaultDraggableProps = {
    includePadding: DraggableProps["includePadding"];
    type: DraggableProps["state"];
    linterContext: DraggableProps["linterContext"];
};

type DraggableState = {
    startPosition: Position;
    startMouse: Position;
    mouse: Position;
    dragging?: boolean;
};

// A draggable item in the sortable. Can be in one of four states:
//     Static:    The item is not being interacted with.
//     Dragging:  The item is being dragged.
//     Animating: The item has been released, and is moving to its destination.
//     Disabled:  The item cannot be interacted with.
//
// Usual flow:      Static -> Dragging -> Animating -> Static
// [Dis|en]abling:  Static|Dragging|Animating -> Disabled -> Static
class Draggable extends React.Component<DraggableProps, DraggableState> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // Handler returned by requestAnimationFrame.
    animationFrameRequest = null;
    // @ts-expect-error - TS2564 - Property 'isMouseMoveUpBound' has no initializer and is not definitely assigned in the constructor.
    isMouseMoveUpBound: boolean;
    // @ts-expect-error - TS2564 - Property '_mounted' has no initializer and is not definitely assigned in the constructor.
    _mounted: boolean;

    static defaultProps: DefaultDraggableProps = {
        includePadding: true,
        type: ItemState.STATIC,
        linterContext: PerseusLinter.linterContextDefault,
    };

    state: DraggableState = {
        startPosition: {left: 0, top: 0},
        startMouse: {left: 0, top: 0},
        mouse: {left: 0, top: 0},
        dragging: false,
    };

    componentDidMount() {
        this._mounted = true;
        this.isMouseMoveUpBound = false;

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

    componentDidUpdate(prevProps: DraggableProps) {
        if (this.props.state === prevProps.state) {
            return;
        }

        if (
            this.props.state === ItemState.ANIMATING &&
            this.props.endPosition
        ) {
            // Start animating
            const current = this.getCurrentPosition();
            const duration =
                15 *
                Math.sqrt(
                    Math.sqrt(
                        Math.pow(
                            this.props.endPosition.left - current.left,
                            2,
                        ) +
                            Math.pow(
                                this.props.endPosition.top - current.top,
                                2,
                            ),
                    ),
                );

            // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'animate' does not exist on type 'JQueryStatic'.
            $(ReactDOM.findDOMNode(this)).animate(this.props.endPosition, {
                duration: Math.max(duration, 1),
                // Animating -> Static
                complete: this.props.onAnimationEnd,
            });
        } else if (this.props.state === ItemState.STATIC) {
            // Ensure that any animations are done
            // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'finish' does not exist on type 'JQueryStatic'.
            $(ReactDOM.findDOMNode(this)).finish();
        }
    }

    componentWillUnmount() {
        this._mounted = false;
        // Event handlers should be unbound before component unmounting, but
        // just in case...
        if (this.isMouseMoveUpBound) {
            this.unbindMouseMoveUp();
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (this.animationFrameRequest) {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            cancelAnimationFrame(this.animationFrameRequest);
        }

        document.removeEventListener("touchmove", this.onMouseMove);
    }

    getCurrentPosition = () => {
        return {
            left:
                this.state.startPosition.left +
                this.state.mouse.left -
                this.state.startMouse.left,
            top:
                this.state.startPosition.top +
                this.state.mouse.top -
                this.state.startMouse.top,
        };
    };

    bindMouseMoveUp = () => {
        this.isMouseMoveUpBound = true;
        $(document).on("mousemove", this.onMouseMove);
        $(document).on("mouseup", this.onMouseUp);
    };

    unbindMouseMoveUp = () => {
        this.isMouseMoveUpBound = false;
        $(document).off("mousemove", this.onMouseMove);
        $(document).off("mouseup", this.onMouseUp);
    };

    onMouseDown = (event) => {
        if (this.props.state !== ItemState.STATIC) {
            return;
        }

        if (
            !(
                event.button === 0 ||
                (event.touches != null && event.touches.length === 1)
            )
        ) {
            return;
        }

        event.preventDefault();
        const loc = Util.extractPointerLocation(event);

        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'null'.
        this.animationFrameRequest = requestAnimationFrame(() => {
            // @ts-expect-error - TS2769 - No overload matches this call.
            const $el = $(ReactDOM.findDOMNode(this));

            // jQuery.position() gets the position of the element wrt its offset parent,
            // but subtracts the scroll position of the parent. We need to add that back.
            // @ts-expect-error - TS2339 - Property 'position' does not exist on type 'JQueryStatic'.
            const position = $el.position();
            const startPosition = addOffsetParentScroll($el, position);

            if (loc && this._mounted) {
                this.setState(
                    {
                        startPosition,
                        // NOTE(slim): We don't bother adjusting `loc` because we only keep track of (mouse - startMouse) in
                        // this.getCurrentPosition(). Adjusting `loc` here requires us to also change how `loc` is used in
                        // onMouseMove and onMouseUp, and this requires reading from the DOM each time to measure the parent's scrollTop.
                        startMouse: loc,
                        mouse: loc,
                        dragging: true,
                    },
                    function () {
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        this.bindMouseMoveUp();

                        // Static -> Dragging
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        this.props.onMouseDown();
                    },
                );
            }
        });
    };

    onMouseMove: (arg1: any) => void = (event) => {
        const notDragging =
            this.props.state !== ItemState.DRAGGING || !this.state.dragging;

        if (notDragging) {
            return;
        }

        event.preventDefault();
        const loc = Util.extractPointerLocation(event);

        if (loc) {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'null'.
            this.animationFrameRequest = requestAnimationFrame(() => {
                this.setState(
                    {
                        mouse: loc,
                    },
                    this.props.onMouseMove,
                );
            });
        }
    };

    onMouseUp: (arg1: any) => void = (event) => {
        const notDragging =
            this.props.state !== ItemState.DRAGGING || !this.state.dragging;

        if (notDragging) {
            return;
        }

        event.preventDefault();
        const loc = Util.extractPointerLocation(event);
        if (loc) {
            this.setState({dragging: false});
            this.unbindMouseMoveUp();

            // Dragging -> Animating
            this.props.onMouseUp();
        }
    };

    render(): React.ReactNode {
        const {includePadding, layout, state: type} = this.props;

        // We need to keep backwards compatbility with rules specified directly
        // in CSS. Hence the hacky tacking on of manual classNames.
        // See sortable.css for details.
        let className =
            css(
                styles.card,
                styles.draggable,
                layout === "horizontal" && styles.horizontalCard,
                layout === "vertical" && styles.verticalCard,
                type === ItemState.DRAGGING && styles.dragging,
                type === ItemState.DISABLED && styles.disabled,
                !includePadding && styles.unpaddedCard,
            ) +
            " " +
            "perseus-sortable-draggable";

        if (!includePadding) {
            className += " perseus-sortable-draggable-unpadded";
        }

        const style: any = {
            position: "static",
        };

        if (
            this.props.state === ItemState.DRAGGING ||
            this.props.state === ItemState.ANIMATING
        ) {
            _.extend(style, {position: "absolute"}, this.getCurrentPosition());
        }

        if (this.props.width) {
            style.width = this.props.width + 1; // Fix for non-integer widths
        }
        if (this.props.height) {
            style.height = this.props.height;
        }
        if (this.props.margin != null) {
            style.margin = this.props.margin;
        }
        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- TODO(LEMS-2871): Address a11y error
            <li
                className={className}
                style={style}
                onMouseDown={this.onMouseDown}
                onTouchStart={this.onMouseDown}
                onTouchMove={this.onMouseMove}
                onTouchEnd={this.onMouseUp}
                onTouchCancel={this.onMouseUp}
            >
                <Renderer
                    content={this.props.content}
                    linterContext={PerseusLinter.pushContextStack(
                        this.props.linterContext,
                        "draggable",
                    )}
                    onRender={this.props.onRender}
                    strings={this.context.strings}
                />
            </li>
        );
    }
}

export type SortableOption = string;

type SortableProps = {
    constraints:
        | {
              width: number;
              height: number;
          }
        | Record<any, any>;
    disabled: boolean;
    layout: Layout;
    margin: number;
    onChange: (arg1: any) => void;
    onMeasure: (arg1: {
        widths: ReadonlyArray<number>;
        heights: ReadonlyArray<number>;
    }) => void;
    padding: boolean;
    linterContext: LinterContextProps;
    options: ReadonlyArray<SortableOption>;
    waitForTexRendererToLoad: boolean;
};

type DefaultProps = {
    constraints: SortableProps["constraints"];
    disabled: SortableProps["disabled"];
    layout: SortableProps["layout"];
    margin: SortableProps["margin"];
    onChange: SortableProps["onChange"];
    onMeasure: SortableProps["onMeasure"];
    padding: SortableProps["padding"];
    linterContext: SortableProps["linterContext"];
    waitForTexRendererToLoad: SortableProps["waitForTexRendererToLoad"];
};

type SortableItem = {
    option: SortableOption;
    key: number;
    state: ItemState;
    endPosition?: Position;
    width: number;
    height: number;
};

type SortableState = {
    items: ReadonlyArray<SortableItem>;
    texRendererLoaded: boolean;
};
class Sortable extends React.Component<SortableProps, SortableState> {
    static defaultProps: DefaultProps = {
        layout: "horizontal",
        padding: true,
        disabled: false,
        constraints: {},
        onMeasure: function () {},
        margin: 5,
        onChange: function () {},
        linterContext: PerseusLinter.linterContextDefault,
        waitForTexRendererToLoad: true,
    };

    remeasureItems: () => void = _.debounce(() => {
        this.setState({
            // Clear item measurements
            items: Sortable.clearItemMeasurements(this.state.items),
        });
    }, 20);

    static itemsFromProps(props: {
        disabled: boolean;
        options: ReadonlyArray<SortableOption>;
    }): ReadonlyArray<SortableItem> {
        const state: ItemState = props.disabled
            ? ItemState.DISABLED
            : ItemState.STATIC;
        return props.options.map((option: SortableOption, i) => {
            return {
                option: option,
                key: i,
                state,
                width: 0,
                height: 0,
            };
        });
    }

    static clearItemMeasurements(
        items: ReadonlyArray<SortableItem>,
    ): ReadonlyArray<SortableItem> {
        return items.map((item) => {
            return {
                ...item,
                width: 0,
                height: 0,
            };
        });
    }

    constructor(props: SortableProps) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            items: Sortable.itemsFromProps(this.props),
            texRendererLoaded: false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: SortableProps) {
        const prevProps = this.props;

        if (!_.isEqual(nextProps.options, prevProps.options)) {
            // Regenerate items
            this.setState({
                items: Sortable.itemsFromProps(nextProps),
            });
        } else if (
            nextProps.layout !== prevProps.layout ||
            nextProps.padding !== prevProps.padding ||
            nextProps.disabled !== prevProps.disabled ||
            !_.isEqual(nextProps.constraints, prevProps.constraints)
        ) {
            // Clear item measurements
            this.setState({
                items: Sortable.clearItemMeasurements(this.state.items),
            });
        }
    }

    componentDidUpdate() {
        // Measure items if their dimensions have been reset
        if (
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            this.state.items.length &&
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !this.state.items[0].width &&
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !this.state.items[0].height
        ) {
            // Measure on the next frame to allow items size to settle.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(() => {
                this.measureItems();
            }, 0);
        }
    }

    measureItems() {
        // Measure all items and cache what their dimensions should be, taking
        // into account constraints and the current layout. This allows syncing
        // widths and heights for pretty rows/columns. Note that dimensions are
        // explictly set on Draggables - this prevents them from changing size
        // or shape while being dragged.

        let items: ReadonlyArray<SortableItem> = [...this.state.items];

        // Fetches a jQuery list of elements for each item
        const $items = _.map(
            items,
            function (item) {
                // eslint-disable-next-line react/no-string-refs
                // @ts-expect-error - TS2769 - No overload matches this call. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                return $(ReactDOM.findDOMNode(this.refs[item.key]));
            },
            this,
        );

        const widths: ReadonlyArray<number> = _.invoke($items, "outerWidth");
        const heights: ReadonlyArray<number> = _.invoke($items, "outerHeight");

        const {constraints, layout} = this.props;

        let syncWidth: number | null = null;
        if (constraints?.width) {
            // Items must be at least as wide as the specified constraint
            syncWidth = _.max(widths.concat(constraints.width));
        } else if (layout === "vertical") {
            // Sync widths to get a clean column
            syncWidth = _.max(widths);
        }

        let syncHeight: number | null = null;
        if (constraints?.height) {
            // Items must be at least as high as the specified constraint
            syncHeight = _.max(heights.concat(constraints.height));
        } else if (layout === "horizontal") {
            // Sync widths to get a clean row
            syncHeight = _.max(heights);
        }

        items = _.map(items, function (item, i) {
            item.width = syncWidth || widths[i];
            item.height = syncHeight || heights[i];
            return item;
        });

        this.setState({items}, () => {
            this.props.onMeasure?.({widths: widths, heights: heights});
        });
    }

    onMouseDown(key: SortableItem["key"]) {
        // Static -> Dragging
        const items = _.map(this.state.items, function (item) {
            if (item.key === key) {
                item.state = ItemState.DRAGGING;
            }
            return item;
        });

        this.setState({items: items});
    }

    // This is public API and it's ok for components that use
    // this sortable to call this.
    // moveOptionToIndex takes an option and a desired index and
    // will move that item to the desired index. This is useful
    // for testing and other cases where dragging and dropping may
    // not be available
    moveOptionToIndex(option: SortableOption, index: number) {
        const {items} = this.state;

        if (index < 0 || index > items.length) {
            throw new Error(`index ${index} out of bounds`);
        }

        const nextItems = _.clone(items);

        const item = items.filter((item: SortableItem) => {
            return item.option === option;
        })[0];

        if (item == null) {
            throw new Error(`option ${option} not found`);
        }

        const currentIndex = items.findIndex((i: SortableItem) => {
            return i.key === item.key;
        });

        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly SortableItem[]'. Did you mean 'slice'?
        nextItems.splice(currentIndex, 1);
        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly SortableItem[]'. Did you mean 'slice'?
        nextItems.splice(index, 0, item);

        this.setState({items: nextItems}, () => {
            this.props.onChange?.({});
        });
    }

    onMouseMove(key: SortableItem["key"]) {
        // Dragging: Rearrange items based on draggable's position
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $draggable = $(ReactDOM.findDOMNode(this.refs[key]));
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $sortable = $(ReactDOM.findDOMNode(this));
        const items = _.clone(this.state.items);
        const item = _.findWhere(this.state.items, {key: key});
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const margin = this.props.margin || 0;
        // @ts-expect-error - TS2345 - Argument of type 'SortableItem | undefined' is not assignable to parameter of type 'SortableItem'.
        const currentIndex = _.indexOf(items, item);
        let newIndex = 0;

        // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly SortableItem[]'. Did you mean 'slice'?
        items.splice(currentIndex, 1);

        if (this.props.layout === "horizontal") {
            // @ts-expect-error - TS2339 - Property 'offset' does not exist on type 'JQueryStatic'. | TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
            const midWidth = $draggable.offset().left - $sortable.offset().left;
            let sumWidth = 0;
            let cardWidth;

            _.each(items, function (item) {
                cardWidth = item.width;
                if (midWidth > sumWidth + cardWidth / 2) {
                    newIndex += 1;
                }
                sumWidth += cardWidth + margin;
            });
        } else {
            // @ts-expect-error - TS2339 - Property 'offset' does not exist on type 'JQueryStatic'. | TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
            const midHeight = $draggable.offset().top - $sortable.offset().top;
            let sumHeight = 0;
            let cardHeight;

            _.each(items, function (item) {
                cardHeight = item.height;
                if (midHeight > sumHeight + cardHeight / 2) {
                    newIndex += 1;
                }
                sumHeight += cardHeight + margin;
            });
        }

        if (newIndex !== currentIndex) {
            // @ts-expect-error - TS2551 - Property 'splice' does not exist on type 'readonly SortableItem[]'. Did you mean 'slice'?
            items.splice(newIndex, 0, item);
            this.setState({items: items});
        }
    }

    onMouseUp(key: SortableItem["key"]) {
        // Dragging -> Animating
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        const nextAnimationFrame = requestAnimationFrame(() => {
            const items = _.map(
                this.state.items,
                function (item) {
                    if (item.key === key) {
                        item.state = ItemState.ANIMATING;
                        const $placeholder = $(
                            // @ts-expect-error - TS2769 - No overload matches this call.
                            ReactDOM.findDOMNode(
                                // eslint-disable-next-line react/no-string-refs
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this.refs["placeholder_" + key],
                            ),
                        );
                        // @ts-expect-error - TS2339 - Property 'position' does not exist on type 'JQueryStatic'.
                        const position = $placeholder.position();
                        const endPosition = addOffsetParentScroll(
                            $placeholder,
                            position,
                        );
                        item.endPosition = endPosition;
                    }
                    return item;
                },
                this,
            );

            this.setState({items: items}, () => {
                // HACK: We need to know *that* the widget changed, but currently it's
                // not set up in a nice way to tell us *how* it changed, since the
                // permutation of the items is stored in state.
                this.props.onChange?.({});
            });
        });

        // @ts-expect-error - TS2339 - Property 'animationFrameRequest' does not exist on type 'Sortable'.
        this.animationFrameRequest = nextAnimationFrame;
    }

    onAnimationEnd(key: SortableItem["key"]) {
        // Animating -> Static
        const items = _.map(this.state.items, function (item) {
            if (item.key === key) {
                item.state = ItemState.STATIC;
            }
            return item;
        });

        this.setState({items: items});
    }

    getOptions(): ReadonlyArray<SortableOption> {
        return _.pluck(this.state.items, "option");
    }

    render(): React.ReactNode {
        // To minimize layout shift, we display a spinner until our math
        // renderer is ready to render the math inside the sortable. To
        // do this, we:
        // - render a dummy TeX component to force the math renderer to load
        // - display a spinner until the TeX component calls its onRender
        //   callback, signifying that the math is rendered (from which we can
        //   infer that the math renderer has loaded)
        //
        // If we didn't do this, the user might see a sortable with empty
        // cells on first render, and then the math would pop in a few moments
        // later once the rendering library loaded.
        if (
            this.props.waitForTexRendererToLoad &&
            !this.state.texRendererLoaded
        ) {
            const {TeX} = getDependencies();
            return (
                <>
                    <CircularSpinner />
                    <div style={{display: "none"}}>
                        <TeX
                            onRender={() =>
                                this.setState({texRendererLoaded: true})
                            }
                        >
                            1
                        </TeX>
                    </div>
                </>
            );
        }

        const cards: Array<
            | React.ReactElement<React.ComponentProps<typeof Placeholder>>
            | React.ReactElement<React.ComponentProps<typeof Draggable>>
        > = [];

        const {layout} = this.props;
        // We need to keep backwards compatbility with rules specified directly
        // in CSS. See sortable.css for details.
        const className = css(styles.sortable) + " perseus-sortable";

        const syncWidth =
            this.props.constraints?.width || layout === "vertical";
        const syncHeight =
            this.props.constraints?.height || layout === "horizontal";

        _.each(
            this.state.items,
            function (item, i, items) {
                const isLast = i === items.length - 1;
                const isStatic =
                    item.state === ItemState.STATIC ||
                    item.state === ItemState.DISABLED;
                let margin;

                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                if (this.props.layout === "horizontal") {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    margin = "0 " + this.props.margin + "px 0 0"; // right
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                } else if (this.props.layout === "vertical") {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    margin = "0 0 " + this.props.margin + "px 0"; // bottom
                }

                cards.push(
                    <Draggable
                        content={item.option}
                        key={item.key}
                        state={item.state}
                        // @ts-expect-error - TS2769 - No overload matches this call.
                        ref={item.key}
                        width={syncWidth ? item.width : undefined}
                        height={syncHeight ? item.height : undefined}
                        layout={layout}
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        includePadding={this.props.padding}
                        margin={isLast && isStatic ? 0 : margin}
                        endPosition={item.endPosition}
                        linterContext={PerseusLinter.pushContextStack(
                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                            this.props.linterContext,
                            "sortable",
                        )}
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onRender={this.remeasureItems}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onMouseDown={this.onMouseDown.bind(this, item.key)}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onMouseMove={this.onMouseMove.bind(this, item.key)}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onMouseUp={this.onMouseUp.bind(this, item.key)}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onTouchMove={this.onMouseMove.bind(this, item.key)}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onTouchEnd={this.onMouseUp.bind(this, item.key)}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onTouchCancel={this.onMouseUp.bind(this, item.key)}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        onAnimationEnd={this.onAnimationEnd.bind(
                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                            this,
                            item.key,
                        )}
                    />,
                );

                if (
                    item.state === ItemState.DRAGGING ||
                    item.state === ItemState.ANIMATING
                ) {
                    cards.push(
                        <Placeholder
                            key={"placeholder_" + item.key}
                            ref={"placeholder_" + item.key}
                            width={item.width}
                            height={item.height}
                            layout={layout}
                            margin={isLast ? 0 : margin}
                        />,
                    );
                }
            },
            this,
        );

        return <ul className={className}>{cards}</ul>;
    }
}

const styles = StyleSheet.create({
    sortable: {
        boxSizing: "border-box",
        float: "left",

        padding: 0,
        margin: 0,
    },

    card: {
        boxSizing: "border-box",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 4,
        cursor: "pointer",
        minWidth: 25,
        minHeight: 44,
        padding: 10,

        listStyleType: "none",

        userSelect: "none",
        touchAction: "none",
    },

    placeholder: {
        background: "#ddd",
        border: "1px solid #ccc",
    },

    draggable: {
        textAlign: "center",
    },

    horizontalCard: {
        float: "left",
        cursor: "ew-resize",
    },

    verticalCard: {
        maxWidth: "100%",
        cursor: "ns-resize",
    },

    unpaddedCard: {
        padding: 0,
    },

    dragging: {
        background: "#ffedcd",
        opacity: 0.8,
    },

    disabled: {
        backgroundColor: "inherit",
        border: "1px solid transparent",
        cursor: "default",
    },
});

export default Sortable;
