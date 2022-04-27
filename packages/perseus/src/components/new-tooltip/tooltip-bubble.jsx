// @flow
/**
 * This is TooltipBubble, part of NewTooltip.
 *
 * This component manages the visuals for the tooltip "bubble" UI element,
 * which contains the tooltip content.
 *
 * This component and TooltipArrow both count as part of the tooltip, and
 * trigger mouse events like `onClick`, `onMouseEnter`, and `onMouseLeave`.
 */
import {UniqueIDProvider} from "@khanacademy/wonder-blocks-core";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {typography} from "../../styles/global-styles.js";
import a11yStyles from "../../util/a11y.js";
import Icon from "../icon.jsx";

import {
    bubbleBorderRadius,
    dropShadowOpacity,
    dropShadowRadius,
    dropShadowXOffset,
    dropShadowYOffset,
} from "./style-constants.js";
import {getTooltipColors} from "./util.js";

import type {NewTooltipProps} from "./types.js";
import type {IIdentifierFactory} from "@khanacademy/wonder-blocks-core";

const closeIconPath =
    "M6.26353762,4.99851587 L9.73097464,1.53107884 C10.0836373,1.17841618 10.0842213,0.612127047 9.73530496,0.263210718 C9.38395604,-0.0881381913 8.81874474,-0.0837668714 8.46743686,0.267541014 L4.99999981,3.73497806 L1.5325628,0.267541051 C1.1812549,-0.0837668481 0.616043606, -0.0881381955 0.264694717,0.263210694 C-0.0842215912,0.612127004 -0.0836375768,1.17841613 0.269025093,1.5310788 L3.73646206,4.9985158 L0.269025109,8.46595276 C-0.083637537,8.81861541 -0.0842215923, 9.38490462 0.264694642,9.73382106 C0.616043456,10.0851701 1.18125469, 10.0807988 1.53256259,9.72949093 L4.99999988,6.26205363 L8.46743739, 9.72949117 C8.8187453,10.0807991 9.38395655,10.0851704 9.73530537, 9.73382138 C10.0842216,9.38490498 10.0836375,8.81861579 9.73097488, 8.46595313 L6.26353762,4.99851587 Z";

type TooltipBubbleProps = {|
    tooltipProps: NewTooltipProps,
    dismiss: () => void,
|};

export default class TooltipBubble extends React.PureComponent<TooltipBubbleProps> {
    _handleClickClose: () => void = () => this.props.dismiss();

    _renderCloseButton(
        ids: IIdentifierFactory,
    ): null | React.Element<"button"> {
        const {inverted, dismissOnClickClose} = this.props.tooltipProps;

        if (!dismissOnClickClose) {
            // When `dismissOnClickClose` is not set, don't render a close
            // button at all.
            return null;
        }

        const buttonDescriptionId = ids.get("button-description");
        const headerId = this.getA11yHeaderId(ids);

        return (
            <button
                className={css(styles.closeIcon)}
                onClick={this._handleClickClose}
                aria-describedby={`${buttonDescriptionId} ${headerId}`}
            >
                <Icon
                    title={i18n._("Close")}
                    icon={closeIconPath}
                    size={10}
                    color={
                        // Use a light icon if we're inverted, or dark
                        // otherwise.
                        inverted
                            ? "rgba(255, 255, 255, 0.7)"
                            : "rgba(0, 0, 0, 0.15)"
                    }
                />
                <div
                    id={buttonDescriptionId}
                    className={css(a11yStyles.srOnly)}
                >
                    {i18n._("Closes the tooltip: ")}
                </div>
            </button>
        );
    }

    getA11yHeaderId(ids: IIdentifierFactory): string {
        const {
            tooltipProps: {a11y},
        } = this.props;
        if (!a11y || !a11y.title) {
            // No title specified so assume our content labels us.
            return this.getA11yContentId(ids);
        }
        if (typeof a11y.title === "string") {
            // We have a string title, so we'll generate our own label.
            return ids.get("header");
        }
        // We've been given a specific identifier, so use that.
        return a11y.title.id;
    }

    getA11yContentId(ids: IIdentifierFactory): string {
        return ids.get("content");
    }

    renderTooltip(ids: IIdentifierFactory): React.Element<"div"> {
        const {
            content,
            dismissOnClickClose,
            noPadding,
            onClick,
            onMouseEnter,
            onMouseLeave,
            a11y,
            testId,
        } = this.props.tooltipProps;
        const a11yTitle = a11y && a11y.title;
        const a11yAssertiveness = a11y && a11y.assertiveness;
        const {backgroundColor, textColor} = getTooltipColors(
            this.props.tooltipProps,
        );
        const headerId = this.getA11yHeaderId(ids);
        const contentId = this.getA11yContentId(ids);
        return (
            <div
                className={css(
                    styles.tooltipBubble,
                    !noPadding && styles.tooltipBubbleWithPadding,
                    dismissOnClickClose && styles.tooltipBubbleWithCloseIcon,
                    onClick && styles.tooltipBubbleWithOnClick,
                )}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{backgroundColor, color: textColor}}
                role="region"
                aria-labelledby={headerId}
                aria-describedby={contentId === headerId ? null : contentId}
                data-test-id={testId}
            >
                {this._renderCloseButton(ids)}
                <div aria-live={a11yAssertiveness}>
                    {typeof a11yTitle === "string" ? (
                        <div className={css(a11yStyles.srOnly)} id={headerId}>
                            {a11yTitle}
                        </div>
                    ) : null}
                    <div id={contentId} className={css(styles.tooltipContent)}>
                        {content}
                    </div>
                </div>
            </div>
        );
    }

    render(): React.Node {
        return (
            <UniqueIDProvider mockOnFirstRender={false} scope="tooltip-bubble">
                {(ids) => this.renderTooltip(ids)}
            </UniqueIDProvider>
        );
    }
}

// These styles are copied from tooltip-package/tooltip.jsx - with some minor
// modifications, because positioning is handled differently.
//
// TODO(mdr): Also, the standard tooltip seemed to have `transition` styles
//     designed to fade-in the tooltip... but they don't seem to work? I've
//     removed them for now. We'd probably have to use an
//     AphroditeCSSTransitionGroup, in order to initialize the opacity to 0,
//     then wait a tick before setting the opacity to 1.
const styles = StyleSheet.create({
    tooltipBubble: {
        // layout styles
        boxSizing: "border-box",
        position: "relative", // for the close icon

        // content styles
        ...typography.labelMedium,

        // border and box shadow styles
        borderRadius: bubbleBorderRadius,
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow:
            `${dropShadowXOffset}px ${dropShadowYOffset}px ` +
            `${dropShadowRadius}px 0px ` +
            `rgba(0, 0, 0, ${dropShadowOpacity})`,

        // Ensure that clicking on the tooltip's empty space doesn't clear the
        // user's text selection elsewhere in the page. (We reset this rule in
        // `tooltipContent`, so that the user _can_ select text _inside_ the
        // tooltip.)
        userSelect: "none",
    },

    tooltipBubbleWithPadding: {
        padding: "10px 23px",
    },

    tooltipBubbleWithCloseIcon: {
        paddingRight: 34,
    },

    tooltipBubbleWithOnClick: {
        cursor: "pointer",
    },

    tooltipContent: {
        // Reset the `userSelect: none` rule in `tooltipBubble`, to enable the
        // user to select the tooltip's content.
        userSelect: "auto",
    },

    closeIcon: {
        display: "block",
        position: "absolute",
        right: 10,
        top: 10,
        padding: 0,
        background: "inherit",
        border: "none",
    },
});
