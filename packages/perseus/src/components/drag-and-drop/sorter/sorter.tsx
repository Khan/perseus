import classNames from "classnames";
import * as React from "react";

import {AnswerTile} from "../answer-tile";
import {BlankComponent} from "../blank";
import {ChoiceBank} from "../choice-bank";
import {bankDragId, placedDragId} from "../drag-ids";
import {PerseusDndProvider} from "../perseus-dnd-provider";
import {tempDndStrings as strings} from "../temp-strings";
import {isTileInBank} from "../tile-placements";
import {useTileMoveActions} from "../use-tile-move-actions";
import {useWidestTileWidth} from "../use-widest-tile-width";

import styles from "./sorter.module.css";

import type {TilePlacements} from "../tile-placements";

export type SorterTile = {
    id: string;
    /** Perseus markdown: text, TeX, or an image. Empty is not allowed. */
    content: string;
    /** Plain-text value for screen readers. */
    label: string;
};

export type SorterLegend = {
    startLabel: string;
    endLabel: string;
    /** Conveys the scale textually: it labels the list of blanks. */
    srLabel: string;
    startStyle: "arrow" | "bar" | "none";
    endStyle: "arrow" | "bar" | "none";
    /**
     * Side of the blanks the legend renders on, in the block direction.
     * The default is "end" (below a horizontal row). A staggered
     * timeline (5+ blanks) ignores it — the axis runs through the
     * middle — and the vertical layout ignores it: the legend always
     * runs down the start side.
     */
    position?: "start" | "end";
};

export interface SorterProps {
    variant: "scale" | "timeline";
    legend: SorterLegend;
    /** One blank per tile: no unused blanks, no unused tiles. */
    tiles: ReadonlyArray<SorterTile>;
    /**
     * Requested orientation. A horizontal sorter still falls back to
     * vertical when the row cannot house the widest tile.
     */
    orientation: "horizontal" | "vertical";
    /** Controlled placements: blankId -> tileId. */
    placements: TilePlacements;
    onPlacementsChange: (next: TilePlacements) => void;
}

const BANK_DROP_ID = "sorter-choice-bank";
/** Space between slots, matched by --sorter-gap in the CSS. */
const SLOT_GAP = 16;
/**
 * Minimum slot width for a horizontal timeline. Timeline tiles wrap to
 * two lines, so the single-line widest-tile width overshoots. The value
 * is a starting point for design review.
 */
const TIMELINE_MIN_SLOT = 120;

/**
 * Sorter is the render side of the upcoming Sorter widget: learners
 * order tiles from a choice bank into discrete blanks along a labeled
 * legend. Scale places the blanks on a spectrum between two labels;
 * Timeline hangs them off a time axis with connector stems.
 *
 * Proof of concept, following the FillInTheBlank pattern. Plan:
 * widgets/fill-in-the-blank/notes/.
 */
export function Sorter(props: SorterProps): React.ReactElement {
    const {
        variant,
        legend,
        tiles,
        orientation,
        placements,
        onPlacementsChange,
    } = props;

    const blankIds = React.useMemo(
        () => tiles.map((_, index) => `blank ${index + 1}`),
        [tiles],
    );
    const blankLabels = React.useMemo(() => {
        const labels: Record<string, string> = {};
        blankIds.forEach((blankId, index) => {
            labels[blankId] = strings.blankLabel({num: index + 1});
        });
        return labels;
    }, [blankIds]);
    const tilesById = React.useMemo(
        () => new Map(tiles.map((tile) => [tile.id, tile])),
        [tiles],
    );

    const {containerRef, remeasure, maxWidth} = useWidestTileWidth();

    const {
        handleMove,
        handleClear,
        handleDragEnd,
        firstBankMenuRef,
        placedMenuRef,
    } = useTileMoveActions({
        placements,
        onPlacementsChange,
        tileUsage: "single",
        getTileLabel: (tileId) => tilesById.get(tileId)?.label ?? "",
        getBlankLabel: (blankId) => blankLabels[blankId],
        blankIds,
        bankDropId: BANK_DROP_ID,
    });

    // Fall back to vertical when the horizontal row cannot house every
    // slot at its minimum width.
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = React.useState<number>();
    React.useEffect(() => {
        const element = rootRef.current;
        if (element == null || typeof ResizeObserver === "undefined") {
            return;
        }
        const observer = new ResizeObserver((entries) => {
            setContainerWidth(entries[0].contentRect.width);
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const count = tiles.length;
    const isStaggered = variant === "timeline" && count >= 5;
    const minSlotWidth = variant === "scale" ? maxWidth : TIMELINE_MIN_SLOT;
    let requiredWidth: number | undefined;
    if (minSlotWidth != null) {
        requiredWidth = isStaggered
            ? // Staggered slots span 2 of the grid's count+1 gapless
              // columns and pad half a gap on each side, so each column
              // must be half of (slot + gap).
              ((minSlotWidth + SLOT_GAP) / 2) * (count + 1)
            : minSlotWidth * count + SLOT_GAP * (count - 1);
    }
    const isVertical =
        orientation === "vertical" ||
        (requiredWidth != null &&
            containerWidth != null &&
            requiredWidth > containerWidth);

    const bankTiles = tiles
        .filter((tile) => isTileInBank(placements, tile.id, "single"))
        .map((tile, index) => ({
            tileId: bankDragId(tile.id),
            content: tile.content,
            label: tile.label,
            moveTargets: blankIds.map((blankId) => ({
                id: blankId,
                label: blankLabels[blankId],
            })),
            onMove: (targetId: string) =>
                handleMove({tileId: tile.id}, targetId, true),
            menuRef: index === 0 ? firstBankMenuRef : undefined,
        }));

    const renderSlot = (blankId: string) => {
        const tileId = placements[blankId];
        const tile = tileId != null ? tilesById.get(tileId) : undefined;
        const dragId =
            tile != null ? placedDragId(blankId, tile.id) : undefined;
        return (
            <BlankComponent
                blankId={blankId}
                displayType="normal"
                placedTileId={dragId}
                minWidth={
                    variant === "scale" && !isVertical ? maxWidth : undefined
                }
                className={styles.slot}
            >
                {tile != null && dragId != null && (
                    <AnswerTile
                        tileId={dragId}
                        content={tile.content}
                        label={tile.label}
                        fillsBlank={true}
                        moveTargets={blankIds
                            .filter((id) => id !== blankId)
                            .map((id) => ({id, label: blankLabels[id]}))}
                        onMove={(targetId) =>
                            handleMove(
                                {tileId: tile.id, fromBlankId: blankId},
                                targetId,
                                true,
                            )
                        }
                        clearFromLabel={blankLabels[blankId]}
                        onClear={() => handleClear(blankId, true)}
                        menuRef={placedMenuRef(blankId)}
                    />
                )}
            </BlankComponent>
        );
    };

    const axisClasses = (axisOrientation: "h" | "v") =>
        classNames(
            axisOrientation === "h" ? styles.axisH : styles.axisV,
            styles[`start-${legend.startStyle}`],
            styles[`end-${legend.endStyle}`],
        );

    // The legend visuals are decoration: the srLabel on the list carries
    // the meaning for screen readers. The labels sit on the far side of
    // the axis, so the axis stays adjacent to the slots and their stems.
    const legendPosition = legend.position ?? "end";
    const horizontalLegend = (
        <div
            aria-hidden="true"
            className={classNames(
                styles.legendH,
                legendPosition === "start" && styles.legendHStart,
            )}
        >
            <div className={axisClasses("h")} />
            <div className={styles.legendLabels}>
                <span>{legend.startLabel}</span>
                <span>{legend.endLabel}</span>
            </div>
        </div>
    );

    const verticalLegend = (
        <div aria-hidden="true" className={styles.legendV}>
            <span>{legend.startLabel}</span>
            <div className={axisClasses("v")} />
            <span>{legend.endLabel}</span>
        </div>
    );

    let slotArea: React.ReactNode;
    if (isVertical) {
        // Vertical: the legend runs down the start side; timeline slots
        // keep a stem to the axis.
        slotArea = (
            <div className={styles.verticalLayout}>
                {verticalLegend}
                <ol aria-label={legend.srLabel} className={styles.columnSlots}>
                    {blankIds.map((blankId) => (
                        <li key={blankId} className={styles.columnItem}>
                            {variant === "timeline" && (
                                <span
                                    aria-hidden="true"
                                    className={styles.stemH}
                                />
                            )}
                            {renderSlot(blankId)}
                        </li>
                    ))}
                </ol>
            </div>
        );
    } else if (isStaggered) {
        // 5+ timeline blanks alternate above and below the axis. Each
        // slot spans 2 of count+1 columns, so the below row sits half a
        // slot over from the above row.
        slotArea = (
            <div className={styles.staggerLayout}>
                <ol
                    aria-label={legend.srLabel}
                    className={styles.staggerGrid}
                    style={{
                        gridTemplateColumns: `repeat(${count + 1}, 1fr)`,
                    }}
                >
                    {blankIds.map((blankId, index) => {
                        const above = index % 2 === 0;
                        return (
                            <li
                                key={blankId}
                                className={
                                    above
                                        ? styles.staggerItemAbove
                                        : styles.staggerItemBelow
                                }
                                style={{
                                    gridColumn: `${index + 1} / span 2`,
                                    gridRow: above ? 1 : 2,
                                }}
                            >
                                {above && renderSlot(blankId)}
                                <span
                                    aria-hidden="true"
                                    className={styles.stemV}
                                />
                                {!above && renderSlot(blankId)}
                            </li>
                        );
                    })}
                </ol>
                <div aria-hidden="true" className={styles.staggerAxisArea}>
                    <div className={axisClasses("h")} />
                </div>
                <span aria-hidden="true" className={styles.staggerStartLabel}>
                    {legend.startLabel}
                </span>
                <span
                    aria-hidden="true"
                    className={classNames(
                        styles.staggerEndLabel,
                        // An even count puts a below-row slot at the far
                        // end, so the label moves above the axis.
                        count % 2 === 0 && styles.staggerEndLabelAbove,
                    )}
                >
                    {legend.endLabel}
                </span>
            </div>
        );
    } else {
        // One horizontal row. Timeline slots carry a stem on the legend
        // side; the legend renders above or below the row.
        const stem = variant === "timeline" && (
            <span aria-hidden="true" className={styles.stemV} />
        );
        const row = (
            <ol
                aria-label={legend.srLabel}
                className={styles.rowSlots}
                style={{gridTemplateColumns: `repeat(${count}, 1fr)`}}
            >
                {blankIds.map((blankId) => (
                    <li key={blankId} className={styles.rowItem}>
                        {legendPosition === "start" && stem}
                        {renderSlot(blankId)}
                        {legendPosition === "end" && stem}
                    </li>
                ))}
            </ol>
        );
        slotArea = (
            <div className={styles.horizontalLayout}>
                {legendPosition === "start" ? (
                    <>
                        {horizontalLegend}
                        {row}
                    </>
                ) : (
                    <>
                        {row}
                        {horizontalLegend}
                    </>
                )}
            </div>
        );
    }

    // The hidden copy keeps every tile measurable. `inert` keeps its
    // controls out of the tab order and assistive tech.
    const setMeasurementRef = (element: HTMLElement | null) => {
        element?.setAttribute("inert", "");
        containerRef(element);
    };

    return (
        <div className={styles.sorter} ref={rootRef}>
            <PerseusDndProvider onDragEnd={handleDragEnd}>
                {slotArea}
                <ChoiceBank
                    label={strings.choices}
                    answerTiles={bankTiles}
                    bankId={BANK_DROP_ID}
                />
            </PerseusDndProvider>
            <PerseusDndProvider>
                <div
                    aria-hidden="true"
                    className={styles.measurement}
                    key={tiles.map((tile) => tile.id).join(" ")}
                    ref={setMeasurementRef}
                >
                    {tiles.map((tile) => (
                        <AnswerTile
                            key={tile.id}
                            tileId={`measure__${tile.id}`}
                            content={tile.content}
                            label={tile.label}
                            moveTargets={[]}
                            onMove={() => {}}
                            onContentRender={remeasure}
                        />
                    ))}
                </div>
            </PerseusDndProvider>
        </div>
    );
}
