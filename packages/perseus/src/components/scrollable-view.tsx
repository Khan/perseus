import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import caretLeftIcon from "@phosphor-icons/core/regular/caret-left.svg";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";
import {useEffect, useRef, useState} from "react";

import {usePerseusI18n} from "./i18n-context";

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
     * For LTR (left-to-right):
     * - canScrollStart: true when scrollLeft > 0 (user can scroll left)
     * - canScrollEnd: true when scrollLeft + clientWidth < scrollWidth (user can scroll right)
     *
     * For RTL (right-to-left):
     * - RTL scrolling works differently across browsers, with scrollLeft potentially being negative
     * - canScrollStart: true when there's content to the right to scroll to
     * - canScrollEnd: true when there's content to the left to scroll to
     */
    const updateScrollState = () => {
        if (!containerRef.current) {
            return;
        }

        const {scrollLeft, scrollWidth, clientWidth} = containerRef.current;
        const rtlDirection =
            getComputedStyle(containerRef.current).direction === "rtl";
        setIsRtl(rtlDirection);

        setIsScrollable(scrollWidth > clientWidth + 1); // 1px tolerance

        // In RTL mode, scrollLeft values work differently (can be negative)
        // We need to handle this to ensure the correct buttons are enabled
        if (rtlDirection) {
            // For RTL, scrollLeft is negative when scrolling to the end (right side in visual terms)
            // Math.abs to get a positive value for comparison
            setCanScrollStart(
                Math.abs(scrollLeft) < scrollWidth - clientWidth - 1,
            );
            setCanScrollEnd(scrollLeft < 0);
        } else {
            setCanScrollStart(scrollLeft > 0);
            setCanScrollEnd(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    const scroll = (direction: "start" | "end") => {
        if (!containerRef.current) {
            return;
        }

        const scrollAmount = isRtl
            ? direction === "start"
                ? SCROLL_DISTANCE
                : -SCROLL_DISTANCE
            : direction === "start"
              ? -SCROLL_DISTANCE
              : SCROLL_DISTANCE;

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
    }, [children]);

    const mergeStyle: React.CSSProperties = {
        overflowX,
        overflowY,
        ...style,
    };

    return (
        <>
            {canScrollEnd && (
                <div
                    style={{
                        ...styles.scrollFade,
                        ...(isRtl
                            ? styles.scrollFadeRight
                            : styles.scrollFadeLeft),
                    }}
                />
            )}
            {canScrollStart && (
                <div
                    style={{
                        ...styles.scrollFade,
                        ...(isRtl
                            ? styles.scrollFadeLeft
                            : styles.scrollFadeRight),
                    }}
                />
            )}
            <div
                {...additionalProps}
                role={role}
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
}

function ScrollButtons({
    onScrollStart,
    onScrollEnd,
    canScrollStart,
    canScrollEnd,
    scrollDescription,
}: ScrollButtonsProps) {
    const {strings} = usePerseusI18n();

    return (
        <View style={styles.scrollButtonsContainer}>
            <IconButton
                icon={caretLeftIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={onScrollStart}
                aria-label={strings.scrollStart}
                disabled={!canScrollStart}
            />
            <IconButton
                icon={caretRightIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={onScrollEnd}
                aria-label={strings.scrollEnd}
                disabled={!canScrollEnd}
            />
            <LabelSmall>{scrollDescription}</LabelSmall>
        </View>
    );
}

const styles = {
    scrollButtonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.xSmall_8,
        padding: spacing.small_12,
    },

    scrollFade: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "max-content",
        pointerEvents: "none",
        zIndex: 1,
        transition: "opacity 0.3s ease",
    },

    scrollFadeRight: {
        right: 0,
        background:
            "linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
    },

    scrollFadeLeft: {
        left: 0,
        background:
            "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
    },
} as const;

export default ScrollableView;
