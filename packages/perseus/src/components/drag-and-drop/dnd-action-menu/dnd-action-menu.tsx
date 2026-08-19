import {
    ActionItem,
    ActionMenu,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import dotsSixVerticalIcon from "@phosphor-icons/core/regular/dots-six-vertical.svg";
import * as React from "react";
import {useId} from "react";

import {usePerseusI18n} from "../../i18n-context";
import a11yStyles from "../../../styles/a11y.module.css";

import styles from "./dnd-action-menu.module.css";
import {MergedRefOpener} from "./merged-ref-opener";

export type MoveTarget = {
    /** id of the intended blank target */
    id: string;
    /** The blank/column's label, e.g. "Blank 1" or an authored column name. */
    label: string;
};

export interface DndActionMenuProps {
    /** The tile's value — labels the button via aria-labelledby. */
    label: string;
    /**
     * Remaining uses for a multi-use tile. When provided, it is spoken as
     * part of the opener's description ("5 remaining. Actions menu").
     */
    remainingUses?: number;
    /**
     * Available Blanks/columns this tile can move to.
     */
    moveTargets: ReadonlyArray<MoveTarget>;
    /** Called with the target blank's id when a move action is selected. */
    onMove: (targetId: string) => void;
    /**
     * Visible label (not the id) of the blank/column the tile currently
     * sits in, e.g. "Blank 1" — spoken in the clear action as
     * "Clear from Blank 1". Provide together with onClear.
     */
    targetLabel?: string;
    /** Callback for removing the tile from its blank. */
    onClear?: () => void;
    /** Scored/unused tiles. */
    disabled: boolean;
}

/**
 * DndActionMenu is the menu that appears on each Answer Tile in our upcoming
 * Drag-and-Drop widget family. It lists every blank the tile can move to and,
 * when the tile is placed in a blank, a Clear action.
 *
 * This is currently purely presentational, and does not include the dnd-kit wiring
 * or move announcements, which will be tackled in future tickets.
 */
export const DndActionMenu = React.forwardRef<
    HTMLButtonElement,
    DndActionMenuProps
>(function DndActionMenu(props, ref): React.ReactElement {
    const {
        label,
        remainingUses,
        moveTargets,
        onMove,
        targetLabel,
        onClear,
        disabled,
    } = props;

    const {strings} = usePerseusI18n();
    const labelId = useId();
    const descriptionId = useId();

    const description =
        remainingUses != null
            ? `${strings.menuRemaining({num: remainingUses})} ${strings.actionsMenu}`
            : strings.actionsMenu;

    const showClearAction = onClear != null && targetLabel != null;

    const menuItems: Array<React.ReactElement<any>> = [
        // ActionMenu has no header slot, so the visual-only "Move to" header
        // rides along as an extra child. ActionMenu clones every child with
        // an injected role="menuitem" and onClick, so the span must be
        // aria-hidden (keeps it out of the accessibility tree — the spoken
        // phrasing lives in each item's aria-label instead) and the CSS sets
        // pointer-events: none (defuses the injected click handler). The
        // cast sneaks the span past ActionMenu's children type, which only
        // accepts Action/Option/Separator items.
        // eslint-disable-next-line no-restricted-syntax
        (
            <span key="header" aria-hidden="true" className={styles.menuHeader}>
                {strings.moveTo}
            </span>
        ) as React.ReactElement<any>,
        ...moveTargets.map((target) => (
            <ActionItem
                key={target.id}
                label={target.label}
                aria-label={strings.moveToTarget({target: target.label})}
                onClick={() => onMove(target.id)}
                style={menuItemStyle}
            />
        )),
    ];

    if (showClearAction) {
        menuItems.push(
            <SeparatorItem key="separator" />,
            <ActionItem
                key="clear"
                label={strings.clear}
                aria-label={strings.clearTarget({target: targetLabel})}
                onClick={onClear}
                style={menuItemStyle}
            />,
        );
    }

    // With nothing to move to and nothing to clear, the menu would
    // contain only the decorative header. While an unlikely situation,
    // this simply ensures that the button is disabled in such an instance.
    const hasActions = moveTargets.length > 0 || showClearAction;
    const isDisabled = disabled || !hasActions;

    return (
        <>
            {/* Name and description sources for the opener button. They are
                aria-hidden so browse-mode screen readers don't also hit them
                as loose text — aria-labelledby/aria-describedby still resolve
                hidden nodes. */}
            <span
                id={labelId}
                aria-hidden="true"
                className={a11yStyles.srOnly}
            >
                {label}
            </span>
            <span
                id={descriptionId}
                aria-hidden="true"
                className={a11yStyles.srOnly}
            >
                {description}
            </span>
            <ActionMenu
                // menuText is required by ActionMenu but unused with a
                // custom opener; the real name comes from aria-labelledby.
                menuText={label}
                disabled={isDisabled}
                // "auto-start": Popper opens the menu on whichever side of
                // the opener has the most room ("auto") and lines its edge
                // up with the opener's edge ("start").
                alignment="auto-start"
                dropdownStyle={menuStyle}
                opener={() => (
                    <MergedRefOpener
                        openerRef={ref}
                        disabled={isDisabled}
                        aria-labelledby={labelId}
                        aria-describedby={descriptionId}
                        className={styles.opener}
                    >
                        <PhosphorIcon
                            icon={dotsSixVerticalIcon}
                            size="medium"
                        />
                    </MergedRefOpener>
                )}
            >
                {menuItems}
            </ActionMenu>
        </>
    );
});

// These live at module scope (rather than inline) so they keep a stable
// identity across renders, and at the end of the file per convention.

// The design calls for the menu items to be 48px tall,
// and WonderBlocks defaults to 40px.
const menuItemStyle = {minBlockSize: sizing.size_480};

// A minimum (not fixed) width, in rem so it scales with the user's font
// size. Short labels get breathing room; long labels can still widen the
// menu. No sizing token reaches this scale.
const menuStyle = {minInlineSize: "16rem"};
