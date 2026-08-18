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
    /** id of the indended blank target */
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
    /** SR-only description */
    description: string;
    /** Translated visual-only header, e.g. "Move to". */
    headerLabel: string;
    /**
     * Available Blanks/columns this tile can move to.
     */
    moveTargets: ReadonlyArray<MoveTarget>;
    /** Called with the target blank's id when a move action is selected. */
    onMove: (targetId: string) => void;
    /** The clear action. Provided only when the tile is placed in a blank. */
    clearAction?: {
        /** Translated visible label, e.g. "Clear". */
        label: string;
        /** Translated spoken form, e.g. "Clear Blank 1". */
        actionLabel: string;
        onClear: () => void;
    };
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

// The Figma menu is a fixed 160px wide; no sizing token equals 160px.
const MENU_WIDTH = 160;

// Figma item height is 48px. ActionItem has no height variant, so we set a
// min block size on each item via its (internal-flagged) `style` prop.
const itemStyle = {minBlockSize: sizing.size_480};

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
        description,
        headerLabel,
        moveTargets,
        onMove,
        clearAction,
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

    if (clearAction) {
        menuItems.push(
            <SeparatorItem key="separator" />,
            <ActionItem
                key="clear"
                label={clearAction.label}
                aria-label={clearAction.actionLabel}
                onClick={clearAction.onClear}
                style={itemStyle}
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
                dropdownStyle={{width: MENU_WIDTH}}
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
