import {
    ActionItem,
    ActionMenu,
    CustomOpener,
    SeparatorItem,
} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import dotsSixVerticalIcon from "@phosphor-icons/core/regular/dots-six-vertical.svg";
import * as React from "react";
import {useId} from "react";

import styles from "./dnd-action-menu.module.css";

export type MoveTarget = {
    /** dnd-kit droppable id of the blank/column. */
    id: string;
    /** Translated visible label, e.g. "Blank 1" or a column label. */
    label: string;
    /** Translated spoken form, e.g. "Move to Blank 1". */
    actionLabel: string;
};

interface DndActionMenuProps {
    /** id of the parent AnswerTile. */
    tileId: string;
    /** The tile's value — labels the button via aria-labelledby. */
    label: string;
    /** SR-only description: remaining count (if multi-use) + "actions menu". */
    description: string;
    /** Translated visual-only header, e.g. "Move to". */
    headerLabel: string;
    /** Blanks/columns this tile can move to. `[]` when there are none. */
    moveTargets: ReadonlyArray<MoveTarget>;
    onMove: (targetId: string) => void;
    /** Provided only when the tile is placed in a blank. */
    onClear?: () => void;
    /** Translated visible label for the clear action, e.g. "Clear". */
    clearLabel: string;
    /** Translated spoken form, e.g. "Clear Blank 1". */
    clearActionLabel: string;
    /** Above in the choice bank, below when placed. */
    placement: "above" | "below";
    /** Scored/unused tiles. */
    disabled: boolean;
}

type OpenerInnerProps = {
    /** The parent-facing ref, forwarded by DndActionMenu for focus return. */
    openerRef: React.ForwardedRef<HTMLButtonElement>;
    disabled: boolean;
    "aria-labelledby": string;
    "aria-describedby": string;
    className: string;
    children: React.ReactNode;
};

/**
 * ActionMenu clones whatever the `opener` render prop returns and injects its
 * own ref (for focus-on-close via findDOMNode) — which would clobber a ref
 * placed directly on CustomOpener. This wrapper forwards ActionMenu's
 * injected ref AND mirrors the node into the parent's forwarded ref, so both
 * get the opener `<button>`.
 */
const MergedRefOpener = React.forwardRef<HTMLButtonElement, OpenerInnerProps>(
    function MergedRefOpener({openerRef, ...rest}, injectedRef) {
        const mergedRef = (node: HTMLButtonElement | null) => {
            for (const r of [injectedRef, openerRef]) {
                if (typeof r === "function") {
                    r(node);
                } else if (r) {
                    r.current = node;
                }
            }
        };
        return <CustomOpener ref={mergedRef} {...rest} />;
    },
);

// The Figma menu is a fixed 160px wide. There is no sizing token for 160px,
// and the menu shouldn't scale with font size, so the value is hardcoded.
const MENU_WIDTH = 160;

// Figma item height is 48px. ActionItem has no height variant, so we set a
// min block size on each item. Cosmetic — falls back to WB's default height
// if the (internal-flagged) `style` prop stops being honored.
const itemStyle = {minBlockSize: sizing.size_480};

/**
 * DndActionMenu is the per-tile actions menu for the Drag-and-Drop widget
 * family: the single-pointer/keyboard/screen-reader alternative to dragging
 * (WCAG 2.2 SC 2.5.7). It lists every blank the tile can move to and, when
 * the tile is placed, a Clear action.
 *
 * Purely presentational — the parent owns dnd-kit wiring, move-announcements
 * (via the WB Announcer), and post-move focus management (via the forwarded
 * ref, which reaches the opener `<button>`).
 */
export const DndActionMenu = React.forwardRef<
    HTMLButtonElement,
    DndActionMenuProps
>(function DndActionMenu(props, ref): React.ReactElement {
    const {
        tileId,
        label,
        description,
        headerLabel,
        moveTargets,
        onMove,
        onClear,
        clearLabel,
        clearActionLabel,
        placement,
        disabled,
    } = props;

    const labelId = useId();
    const descriptionId = useId();

    const menuItems: Array<React.ReactElement> = [
        // ActionMenu has no header slot, so the visual-only "Move to" header
        // rides along as an extra child. ActionMenu clones every child with
        // an injected role="menuitem" and onClick, so the span must be
        // aria-hidden (keeps it out of the accessibility tree — the spoken
        // phrasing lives in each item's aria-label instead) and the CSS sets
        // pointer-events: none (defuses the injected click handler).
        <span
            key="header"
            aria-hidden="true"
            className={styles.menuHeader}
            data-testid="dnd-action-menu-header"
        >
            {headerLabel}
        </span>,
        ...moveTargets.map((target) => (
            <ActionItem
                key={target.id}
                label={target.label}
                aria-label={target.actionLabel}
                onClick={() => onMove(target.id)}
                style={itemStyle}
            />
        )),
    ];

    if (onClear) {
        menuItems.push(
            <SeparatorItem key="separator" />,
            <ActionItem
                key="clear"
                label={clearLabel}
                aria-label={clearActionLabel}
                onClick={onClear}
                style={itemStyle}
            />,
        );
    }

    return (
        <>
            {/* The opener's accessible name is the tile value and its
                description carries the SR-only context ("5 remaining.
                Actions menu."), per the DnD Overview's labelling model. */}
            <span id={labelId} className={styles.srOnly}>
                {label}
            </span>
            <span id={descriptionId} className={styles.srOnly}>
                {description}
            </span>
            <ActionMenu
                // menuText is required by ActionMenu but unused with a
                // custom opener; the real name comes from aria-labelledby.
                menuText={label}
                disabled={disabled}
                alignment={placement === "above" ? "top-start" : "bottom-start"}
                dropdownStyle={{width: MENU_WIDTH}}
                testId={`dnd-action-menu-${tileId}`}
                opener={() => (
                    <MergedRefOpener
                        openerRef={ref}
                        disabled={disabled}
                        aria-labelledby={labelId}
                        aria-describedby={descriptionId}
                        className={styles.opener}
                    >
                        <PhosphorIcon
                            icon={dotsSixVerticalIcon}
                            size="medium"
                            className={styles.openerIcon}
                        />
                    </MergedRefOpener>
                )}
            >
                {
                    // Cast: ActionMenu's children type only admits
                    // Action/Option/Separator items; the decorative header
                    // span is deliberately smuggled past it (see above).
                    // eslint-disable-next-line no-restricted-syntax -- deliberate unsafe boundary: ActionMenu's Item type can't express the header span
                    menuItems as Array<React.ReactElement<any>>
                }
            </ActionMenu>
        </>
    );
});
