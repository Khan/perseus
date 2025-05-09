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
    const [shouldShowButtons, setShouldShowButtons] = React.useState(false);

    const checkIfScrollable = () => {
        if (containerRef.current) {
            const scrollWidth = containerRef.current.scrollWidth;
            const clientWidth = containerRef.current.clientWidth;
            setShouldShowButtons(scrollWidth > clientWidth);
        }
    };

    useEffect(() => {
        checkIfScrollable();
        window.addEventListener("resize", checkIfScrollable);
        return () => window.removeEventListener("resize", checkIfScrollable);
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
            {showScrollButtons && shouldShowButtons && (
                <ScrollButtons containerRef={containerRef} />
            )}
        </div>
    );
}

interface ScrollButtonsProps {
    containerRef: React.RefObject<HTMLDivElement>;
}

function ScrollButtons({containerRef}: ScrollButtonsProps) {
    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const scrollAmount = 100; // Adjust this value as needed
            const scrollLeft = containerRef.current.scrollLeft;
            const clientWidth = containerRef.current.clientWidth;
            const scrollWidth = containerRef.current.scrollWidth;

            if (direction === "left") {
                containerRef.current.scrollTo({
                    left: Math.max(scrollLeft - scrollAmount, 0),
                    behavior: "smooth",
                });
            } else {
                containerRef.current.scrollTo({
                    left: Math.min(
                        scrollLeft + scrollAmount,
                        scrollWidth - clientWidth,
                    ),
                    behavior: "smooth",
                });
            }
        }
    };

    return (
        <View style={styles.scrollButtonsContainer}>
            <IconButton
                icon={caretLeftIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={(e) => scroll("left")}
                aria-label="scroll left"
            />
            <IconButton
                icon={caretRightIcon}
                actionType="neutral"
                kind="secondary"
                size="small"
                onClick={(e) => scroll("right")}
                aria-label="scroll right"
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
