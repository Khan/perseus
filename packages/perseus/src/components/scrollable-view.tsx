import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import caretLeftIcon from "@phosphor-icons/core/regular/caret-left.svg";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";
import {useEffect, useRef, useState} from "react";

import {usePerseusI18n} from "./i18n-context";
import styles from "./scrollable-view.module.css";

type ScrollAxisX = {
    overflowX: React.CSSProperties["overflowX"];
    overflowY?: React.CSSProperties["overflowY"];
};
type ScrollAxisY = {
    overflowY: React.CSSProperties["overflowY"];
    overflowX?: React.CSSProperties["overflowX"];
};

interface ScrollableAreaPropsBase extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    role?: string;
    scrollDescription?: string;
    id?: string;
}
type ScrollableAreaProps = (ScrollAxisX | ScrollAxisY) &
    ScrollableAreaPropsBase;

interface ScrollControlsProps {
    target?: string;
    scrollDescription?: string;
}

interface ScrollState {
    isScrollable: boolean;
    canScrollStart: boolean;
    canScrollEnd: boolean;
    isRTL: boolean;
    scroll: (direction: "start" | "end") => void;
    scrollDescription: string;
}

// This is the number of pixels to scroll when the left or right scroll buttons
// are clicked. Adjust this value to change the scroll amount as needed.
const SCROLL_DISTANCE = 100;

// Global registry for scroll instances
const scrollInstances = new Map<string, ScrollState>();

// This renders the scrollable area and will be used with the ScrollControls component
function ScrollableArea({
    overflowX,
    overflowY,
    children,
    className,
    scrollDescription,
    style,
    role = "group",
    id: providedId,
    ...additionalProps
}: ScrollableAreaProps) {
    const {strings} = usePerseusI18n();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    // Generate unique ID if not provided
    const generatedId = React.useId();
    const id = providedId || generatedId;

    const scrollableThreshold = React.useMemo(() => {
        /**
         * Determines the scrollable threshold based on device width to prevent
         * scroll buttons from appearing when content is only barely overflowing
         * (by less than 5-8px), which would create a poor UX with unnecessary
         * scroll controls for minimal overflow. A higher threshold on mobile is
         * used for better touch interaction and spacing optimization.
         * - Mobile devices (≤767px width): Uses 8px threshold
         * - Desktop devices (>767px width): Uses 5px threshold
         */
        return window.innerWidth <= 767 ? 8 : 5;
    }, []);

    const scroll = React.useCallback(
        (direction: "start" | "end") => {
            if (!containerRef.current || isScrolling) {
                return; // Prevent rapid clicks while scrolling
            }

            // Set scrolling state to prevent rapid clicks
            setIsScrolling(true);

            const scrollNegative =
                (isRtl && direction !== "start") ||
                (!isRtl && direction === "start");
            const scrollAmount = scrollNegative
                ? -SCROLL_DISTANCE
                : SCROLL_DISTANCE;

            /**
             * Note on Chrome browser scroll behavior:
             * Chrome handles smooth scrolling differently than other browsers.
             * The scrollbar may briefly disappear when scrolling from extreme
             * positions (beginning or end of scroll area).
             * This occurs both when starting the initial scroll from position 0 and
             * when scrolling back to the start from the end position.
             */
            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });

            // Clear scrolling state after a short delay to allow next scroll
            setTimeout(() => {
                setIsScrolling(false);
            }, 150); // Short delay to prevent rapid clicking but allow normal usage
        },
        [isRtl, isScrolling],
    );

    /**
     * Updates scroll state variables based on current scroll position.
     *
     * This function determines:
     * 1. Whether the content is scrollable (content width > container width + threshold)
     * 2. Whether user can scroll towards the start of the content
     * 3. Whether user can scroll towards the end of the content
     *
     * Visual button representation is always < > in both LTR and RTL modes:
     *
     * For LTR (left-to-right):
     * - Button < (scrollStart): Scrolls left towards the start of content
     * - Button > (scrollEnd): Scrolls right towards the end of content
     * - canScrollStart: true when scrollLeft > 0 (user can scroll left)
     * - canScrollEnd: true when scrollLeft + clientWidth < scrollWidth (user can scroll right)
     *
     * For RTL (right-to-left):
     * - Button < (scrollEnd): Scrolls left towards the end of content
     * - Button > (scrollStart): Scrolls right towards the start of content
     * - RTL scrolling works differently across browsers, with scrollLeft potentially being negative
     * - canScrollStart: true when there's content to the right to scroll to (start of content)
     * - canScrollEnd: true when there's content to the left to scroll to (end of content)
     */
    const updateScrollState = React.useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        const {scrollLeft, scrollWidth, clientWidth} = containerRef.current;
        const newIsRtl =
            getComputedStyle(containerRef.current).direction === "rtl";
        setIsRtl(newIsRtl);

        // Only consider content scrollable if there's a meaningful amount to scroll
        const newIsScrollable = scrollWidth > clientWidth + scrollableThreshold;
        setIsScrollable(newIsScrollable);

        // In RTL mode, scrollLeft values work differently (can be negative)
        // We need to handle this to ensure the correct buttons are enabled
        let newCanScrollStart: boolean;
        let newCanScrollEnd: boolean;

        if (newIsRtl) {
            // For RTL, scrollLeft is negative when scrolling to the end (right side in visual terms)
            // Math.abs to get a positive value for comparison
            newCanScrollStart =
                Math.abs(scrollLeft) <
                scrollWidth - clientWidth - scrollableThreshold;
            newCanScrollEnd = scrollLeft < -scrollableThreshold;
        } else {
            newCanScrollStart = scrollLeft > scrollableThreshold;
            newCanScrollEnd =
                scrollLeft + clientWidth < scrollWidth - scrollableThreshold;
        }

        // Update global registry
        const scrollState: ScrollState = {
            isScrollable: newIsScrollable,
            canScrollStart: newCanScrollStart,
            canScrollEnd: newCanScrollEnd,
            isRTL: newIsRtl,
            scroll,
            scrollDescription: scrollDescription || strings.scrollAnswers,
        };

        scrollInstances.set(id, scrollState);
    }, [
        id,
        scrollableThreshold,
        scrollDescription,
        strings.scrollAnswers,
        scroll,
    ]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        updateScrollState();
        container.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);

        return () => {
            container.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
            // Clean up from global registry
            scrollInstances.delete(id);
        };
    }, [children, updateScrollState, id]);

    const mergeStyle: React.CSSProperties = {
        // For Chrome, we need to explicitly set overflow to 'scroll' when scrollable
        // rather than using 'auto', to prevent the scrollbar from appearing/disappearing
        overflowX: isScrollable && overflowX === "auto" ? "scroll" : overflowX,
        overflowY: isScrollable && overflowY === "auto" ? "scroll" : overflowY,
        // Firefox scrollbar styles
        scrollbarWidth: "thin",
        ...style,
    };

    // Render scrollable area and the controls are handled separately via ScrollableView.Controls
    return (
        <div
            {...additionalProps}
            id={id}
            role={role}
            className={className}
            style={mergeStyle}
            ref={containerRef}
        >
            {children}
        </div>
    );
}

// ScrollControls component - renders independently and connects to ScrollableArea by ID
function ScrollControls({
    target,
    scrollDescription: overrideDescription,
}: ScrollControlsProps) {
    const {strings} = usePerseusI18n();
    const [scrollState, setScrollState] = useState<ScrollState | null>(null);

    // Monitor the target scroll instance
    useEffect(() => {
        if (!target) {
            return;
        }

        const checkForScrollState = () => {
            const state = scrollInstances.get(target);
            if (state) {
                setScrollState(state);
            }
        };

        // Check immediately
        checkForScrollState();

        // Set up polling to detect changes (better would be event-based, but this works)
        const interval = setInterval(checkForScrollState, 100);

        return () => {
            clearInterval(interval);
        };
    }, [target]);

    if (!scrollState || !scrollState.isScrollable) {
        return null;
    }

    const description = overrideDescription || scrollState.scrollDescription;

    return (
        <div
            className={styles.scrollButtonsContainer}
            aria-live="polite"
            role="group"
            aria-label={description}
        >
            <IconButton
                icon={scrollState.isRTL ? caretRightIcon : caretLeftIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={() =>
                    scrollState.isRTL
                        ? scrollState.scroll("end")
                        : scrollState.scroll("start")
                }
                aria-label={strings.scrollStart}
                disabled={
                    scrollState.isRTL
                        ? !scrollState.canScrollEnd
                        : !scrollState.canScrollStart
                }
            />
            <IconButton
                icon={scrollState.isRTL ? caretLeftIcon : caretRightIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={() =>
                    scrollState.isRTL
                        ? scrollState.scroll("start")
                        : scrollState.scroll("end")
                }
                aria-label={strings.scrollEnd}
                disabled={
                    scrollState.isRTL
                        ? !scrollState.canScrollStart
                        : !scrollState.canScrollEnd
                }
            />
            <LabelSmall>{description}</LabelSmall>
        </div>
    );
}

// Create compound component that includes both ScrollableArea and ScrollControls
const ScrollableView = ScrollableArea as typeof ScrollableArea & {
    Controls: typeof ScrollControls;
};

ScrollableView.Controls = ScrollControls;

export default ScrollableView;
