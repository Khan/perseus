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

interface ScrollableViewPropsBase extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    role?: string;
    scrollDescription?: string;
}
type ScrollableViewProps = (ScrollAxisX | ScrollAxisY) &
    ScrollableViewPropsBase;

// This is the number of pixels to scroll when the left or right scroll buttons
// are clicked. Adjust this value to change the scroll amount as needed.
const SCROLL_DISTANCE = 100;

function ScrollableView({
    overflowX,
    overflowY,
    children,
    className,
    scrollDescription,
    style,
    role = "group",
    ...additionalProps
}: ScrollableViewProps) {
    const {strings} = usePerseusI18n();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [canScrollStart, setCanScrollStart] = useState(false);
    const [canScrollEnd, setCanScrollEnd] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    /**
     * Updates scroll state variables based on current scroll position.
     *
     * This function determines:
     * 1. Whether the content is scrollable (content width > container width)
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
        setIsRtl(getComputedStyle(containerRef.current).direction === "rtl");

        // Only consider content scrollable if there's a meaningful amount to scroll
        // Using a slightly higher threshold to prevent micro-scrolling issues
        const scrollableThreshold = 5; // 5px threshold
        setIsScrollable(scrollWidth > clientWidth + scrollableThreshold);

        // In RTL mode, scrollLeft values work differently (can be negative)
        // We need to handle this to ensure the correct buttons are enabled
        if (isRtl) {
            // For RTL, scrollLeft is negative when scrolling to the end (right side in visual terms)
            // Math.abs to get a positive value for comparison
            setCanScrollStart(
                Math.abs(scrollLeft) <
                    scrollWidth - clientWidth - scrollableThreshold,
            );
            setCanScrollEnd(scrollLeft < -scrollableThreshold);
        } else {
            setCanScrollStart(scrollLeft > scrollableThreshold);
            setCanScrollEnd(
                scrollLeft + clientWidth < scrollWidth - scrollableThreshold,
            );
        }
    }, [isRtl]);

    const scroll = (direction: "start" | "end") => {
        if (!containerRef.current) {
            return;
        }

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
    };

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
        };
    }, [children, updateScrollState]);

    const mergeStyle: React.CSSProperties = {
        // For Chrome, we need to explicitly set overflow to 'scroll' when scrollable
        // rather than using 'auto', to prevent the scrollbar from appearing/disappearing
        overflowX: isScrollable && overflowX === "auto" ? "scroll" : overflowX,
        overflowY: isScrollable && overflowY === "auto" ? "scroll" : overflowY,
        // Firefox scrollbar styles
        scrollbarWidth: "thin",
        ...style,
    };

    return (
        <>
            {canScrollEnd && (
                <div
                    className={`${styles.scrollFade} ${isRtl ? styles.scrollFadeRight : styles.scrollFadeLeft}`}
                />
            )}
            {canScrollStart && (
                <div
                    className={`${styles.scrollFade} ${isRtl ? styles.scrollFadeLeft : styles.scrollFadeRight}`}
                />
            )}
            <div
                {...additionalProps}
                role={role}
                className={className}
                style={mergeStyle}
                ref={containerRef}
            >
                {children}
            </div>
            {isScrollable && (
                <ScrollButtons
                    onScrollStart={() =>
                        isRtl ? scroll("end") : scroll("start")
                    }
                    onScrollEnd={() =>
                        isRtl ? scroll("start") : scroll("end")
                    }
                    canScrollStart={canScrollStart}
                    canScrollEnd={canScrollEnd}
                    scrollDescription={
                        scrollDescription
                            ? scrollDescription
                            : strings.scrollAnswers
                    }
                    isRTL={isRtl}
                />
            )}
        </>
    );
}

interface ScrollButtonsProps {
    onScrollStart: () => void;
    onScrollEnd: () => void;
    canScrollStart: boolean;
    canScrollEnd: boolean;
    scrollDescription: string;
    isRTL: boolean;
}

function ScrollButtons({
    onScrollStart,
    onScrollEnd,
    canScrollStart,
    canScrollEnd,
    scrollDescription,
    isRTL,
}: ScrollButtonsProps) {
    const {strings} = usePerseusI18n();

    return (
        <div className={styles.scrollButtonsContainer}>
            <IconButton
                icon={isRTL ? caretRightIcon : caretLeftIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={isRTL ? onScrollEnd : onScrollStart}
                aria-label={strings.scrollStart}
                disabled={isRTL ? !canScrollEnd : !canScrollStart}
            />
            <IconButton
                icon={isRTL ? caretLeftIcon : caretRightIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={isRTL ? onScrollStart : onScrollEnd}
                aria-label={strings.scrollEnd}
                disabled={isRTL ? !canScrollStart : !canScrollEnd}
            />
            <LabelSmall>{scrollDescription}</LabelSmall>
        </div>
    );
}

export default ScrollableView;
