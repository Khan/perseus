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

import {usePerseusI18n} from "../i18n-context";

import styles from "./dnd-action-menu.module.css";

export type MoveTarget = {
    /** id of the intended blank target */
    id: string;
    /** The blank/column's label, e.g. "Blank 1" or an authored column name. */
    label: string;
};

interface DndActionMenuProps {
    /** id of the parent AnswerTile. */
    tileId: string;
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
    /** The clear action. Provided only when the tile is placed in a blank. */
    clearAction?: {
        /** Label of the blank the tile currently sits in, e.g. "Blank 1". */
        targetLabel: string;
        onClear: () => void;
    };
    /** Above in the choice bank, below when placed. */
    placement: "above" | "below";
    /** Scored/unused tiles. */
    disabled: boolean;
}

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
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
 * Two things need a ref to the opener button: ActionMenu (to restore focus
 * when the menu closes) and our parent (to move focus after a tile moves).
 * ActionMenu overwrites any ref we set directly, so this wrapper catches
 * ActionMenu's ref and writes the button into both.
 */
const MergedRefOpener = React.forwardRef<HTMLButtonElement, OpenerInnerProps>(
    function MergedRefOpener({openerRef, ...rest}, injectedRef) {
        const mergedRef = (node: HTMLButtonElement | null) => {
            assignRef(injectedRef, node);
            assignRef(openerRef, node);
        };
        return <CustomOpener ref={mergedRef} {...rest} />;
    },
);

/**
 * ActionMenu's children type only accepts Action/Option/Separator items,
 * which makes it hard to reliably add a header with translated text.
 * This helper confines that one unsafe cast so every other call site
 * stays honestly typed.
 */
function asMenuChild(element: React.ReactElement): React.ReactElement<any> {
    // eslint-disable-next-line no-restricted-syntax
    return element as React.ReactElement<any>;
}

// The design calls for the menu items to be 48px tall,
// and WonderBlocks defaults to 40px.
const menuItemStyle = {minBlockSize: sizing.size_480};

// A minimum (not fixed) width, in rem so it scales with the user's font
// size. Short labels get breathing room; long labels can still widen the
// menu. No sizing token reaches this scale.
const menuStyle = {minInlineSize: "16rem"};

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
        tileId,
        label,
        remainingUses,
        moveTargets,
        onMove,
        clearAction,
        placement,
        disabled,
    } = props;

    const {strings} = usePerseusI18n();
    const labelId = useId();
    const descriptionId = useId();

    const description =
        remainingUses != null
            ? strings.dndActionsMenuRemaining({count: remainingUses})
            : strings.dndActionsMenu;

    const menuItems: Array<React.ReactElement<any>> = [
        // ActionMenu has no header slot, so the visual-only "Move to" header
        // rides along as an extra child. ActionMenu clones every child with
        // an injected role="menuitem" and onClick, so the span must be
        // aria-hidden (keeps it out of the accessibility tree — the spoken
        // phrasing lives in each item's aria-label instead) and the CSS sets
        // pointer-events: none (defuses the injected click handler).
        asMenuChild(
            <span
                key="header"
                aria-hidden="true"
                className={styles.menuHeader}
                data-testid="dnd-action-menu-header"
            >
                {strings.dndMoveToHeader}
            </span>,
        ),
        ...moveTargets.map((target) => (
            <ActionItem
                key={target.id}
                label={target.label}
                aria-label={strings.dndMoveToTarget({target: target.label})}
                onClick={() => onMove(target.id)}
                style={menuItemStyle}
            />
        )),
    ];

    if (clearAction) {
        menuItems.push(
            <SeparatorItem key="separator" />,
            <ActionItem
                key="clear"
                label={strings.dndClear}
                aria-label={strings.dndClearTarget({
                    target: clearAction.targetLabel,
                })}
                onClick={clearAction.onClear}
                style={menuItemStyle}
            />,
        );
    }

    // With nothing to move to and nothing to clear, the menu would
    // contain only the decorative header. While an unlikely situation,
    // this simply ensures that the button is disabled in such an instance.
    const hasActions = moveTargets.length > 0 || clearAction != null;
    const isDisabled = disabled || !hasActions;

    return (
        <>
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
                disabled={isDisabled}
                alignment={placement === "above" ? "top-start" : "bottom-start"}
                dropdownStyle={menuStyle}
                testId={`dnd-action-menu-${tileId}`}
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
