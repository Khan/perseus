import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import caretLeftIcon from "@phosphor-icons/core/regular/caret-left.svg";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useEffect, useRef} from "react";

import type {CSSProperties, StyleDeclaration} from "aphrodite";

type ScrollAxisX = {
    x: CSSProperties["overflowX"];
    y?: CSSProperties["overflowY"];
};
type ScrollAxisY = {
    y: CSSProperties["overflowY"];
    x?: CSSProperties["overflowX"];
};
type AriaLabelOnly = {
    "aria-label": string;
    "aria-labelledby"?: never;
};
type AriaLabelledByOnly = {
    "aria-labelledby": string;
    "aria-label"?: never;
};
interface ScrollableViewPropsBase extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    showScrollButtons?: boolean;
    role?: string;
}
type ScrollableViewProps = (ScrollAxisX | ScrollAxisY) &
    // Require label OR labelId
    (AriaLabelOnly | AriaLabelledByOnly) &
    React.HTMLAttributes<HTMLDivElement> &
    ScrollableViewPropsBase;

export function ScrollableView({
    x,
    y,
    children,
    showScrollButtons = false,
    style,
    role = "group",
    ...rest
}: ScrollableViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = React.useState(false);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const updateScrollState = () => {
        if (!containerRef.current) {
            return;
        }

        const {scrollLeft, scrollWidth, clientWidth} = containerRef.current;
        setIsScrollable(scrollWidth > clientWidth + 1); // 1px tolerance
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    const scroll = (direction: "left" | "right") => {
        if (!containerRef.current) {
            return;
        }

        const scrollAmount = 100; // Adjust this value as needed
        containerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
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
        overflowX: x,
        overflowY: y,
        ...style,
    };

    return (
        <div style={{position: "relative"}}>
            <div {...rest} role={role} style={mergeStyle} ref={containerRef}>
                {children}
            </div>
            {isScrollable && showScrollButtons && (
                <ScrollButtons
                    onScrollLeft={() => scroll("left")}
                    onScrollRight={() => scroll("right")}
                    canScrollLeft={canScrollLeft}
                    canScrollRight={canScrollRight}
                />
            )}
        </div>
    );
}

interface ScrollButtonsProps {
    onScrollLeft: () => void;
    onScrollRight: () => void;
    canScrollLeft: boolean;
    canScrollRight: boolean;
}

function ScrollButtons({
    onScrollLeft,
    onScrollRight,
    canScrollLeft,
    canScrollRight,
}: ScrollButtonsProps) {
    return (
        <View style={styles.scrollButtonsContainer}>
            <IconButton
                icon={caretLeftIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={onScrollLeft}
                aria-label="scroll left"
                disabled={!canScrollLeft}
            />
            <IconButton
                icon={caretRightIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={onScrollRight}
                aria-label="scroll right"
                disabled={!canScrollRight}
            />
            <LabelSmall>Scroll Answers</LabelSmall>
        </View>
    );
}

const styles: StyleDeclaration = StyleSheet.create({
    scrollButtonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.xSmall_8,
        padding: spacing.small_12,
        // TODO: LEMS-3006 Check the impact in mobile view
        // marginLeft: styleConstants.negativePhoneMargin,
        // paddingLeft: styleConstants.phoneMargin,
    },
});
