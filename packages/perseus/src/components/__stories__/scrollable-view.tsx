import classNames from "classnames";
import * as React from "react";
import {CSSProperties, StyleDeclaration, StyleSheet} from "aphrodite";
import caretLeftIcon from "@phosphor-icons/core/regular/caret-left.svg";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {LabelXSmall} from "@khanacademy/wonder-blocks-typography";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as styleConstants from "../../styles/constants";

interface ScrollAxisX {
    x: CSSProperties["overflowX"];
    y?: CSSProperties["overflowY"];
}
interface ScrollAxisY {
    y: CSSProperties["overflowY"];
    x?: CSSProperties["overflowX"];
}
interface AriaLabelOnly {
    "aria-label": string;
    "aria-labelledby"?: never;
}
interface AriaLabelledByOnly {
    "aria-labelledby": string;
    "aria-label"?: never;
}
interface ScrollableViewPropsBase extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
type ScrollableViewProps = (ScrollAxisX | ScrollAxisY) &
    // Require label OR labelId
    (AriaLabelOnly | AriaLabelledByOnly) &
    React.HTMLAttributes<HTMLDivElement> &
    ScrollableViewPropsBase;
/**
 * Handles the accessible markup for a scrollable container
 * @see https://www.a11yproject.com/posts/how-to-use-the-tabindex-attribute/#scrollable-overflow-containers
 */
export function ScrollableView(props: ScrollableViewProps) {
    const {role = "group", style, x, y, children, ...rest} = props;
    // TODO: LEMS-3006 Figure out why using classNames or styles.fieldSetContent will cause the instructions to also scroll with the choices
    // const classes = classNames({
    //     overflowX: x ? "auto" : "hidden",
    //     overflowY: y ? "auto" : "hidden",
    //     whiteSpace: "nowrap",
    // });

    return (
        <div
            {...rest}
            role={role}
            // className={classes}
            style={{
                overflowX: x ? "auto" : "hidden",
                overflowY: y ? "auto" : "hidden",
                whiteSpace: "nowrap",
            }}
            tabIndex={0}
        >
            {children}
        </div>
    );
}

export function ScrollButtons() {
    return (
        <View style={styles.scrollButtonsContainer}>
            <IconButton
                icon={caretLeftIcon}
                actionType="progressive"
                kind="secondary"
                size="small"
                onClick={(e) => console.log("Click!")}
                aria-label="scroll left"
            />
            <IconButton
                icon={caretRightIcon}
                actionType="progressive"
                kind="secondary"
                size="small"
                onClick={(e) => console.log("Click!")}
                aria-label="scroll right"
            />
            <LabelXSmall>Scroll Answers</LabelXSmall>
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
