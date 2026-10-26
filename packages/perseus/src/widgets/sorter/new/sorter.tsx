import {
    exceedsCardLimit,
    SORTER_MAX_HORIZONTAL_CARDS,
} from "@khanacademy/perseus-core";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import classNames from "classnames";
import * as React from "react";
import {forwardRef, useImperativeHandle, useState} from "react";

import {AnswerTile} from "../../../components/drag-and-drop/answer-tile";
import {BlankComponent} from "../../../components/drag-and-drop/blank";
import {ChoiceBank} from "../../../components/drag-and-drop/choice-bank";
import {PerseusDndProvider} from "../../../components/drag-and-drop/perseus-dnd-provider";
import {tempDndStrings} from "../../../components/drag-and-drop/temp-strings";
import {isTileInBank} from "../../../components/drag-and-drop/tile-placements";
import {useTileMoveActions} from "../../../components/drag-and-drop/use-tile-move-actions";
import UnsupportedWidgetMessage from "../../../components/unsupported-widget-message";
import {useDependencies} from "../../../dependencies";
import {getPromptJSON as _getPromptJSON} from "../../../widget-ai-utils/sorter/sorter-ai-utils";
import {LegendBar} from "../legend/legend-bar/legend-bar";
import {LegendLabel} from "../legend/legend-label/legend-label";

import styles from "./sorter.module.css";

import type {MoveTarget} from "../../../components/drag-and-drop/dnd-action-menu";
import type {TilePlacements} from "../../../components/drag-and-drop/tile-placements";
import type {Widget, WidgetProps} from "../../../types";
import type {SorterPromptJSON} from "../../../widget-ai-utils/sorter/sorter-ai-utils";
import type {SorterLegend} from "../legend/legend-types";
import type {
    PerseusSorterWidgetOptions,
    PerseusSorterUserInput,
} from "@khanacademy/perseus-core";

// TODO(anakaren): Drop the `{legend?: SorterLegend}` addition once the legend schema adds it
// to PerseusSorterWidgetOptions.
type Props = WidgetProps<
    PerseusSorterWidgetOptions & {legend?: SorterLegend},
    PerseusSorterUserInput
>;

function getBlankId(index: number): string {
    return `blank-${index}`;
}

function getTileId(index: number): string {
    return `tile-${index}`;
}

function placementsFromOrder(order: string[]): TilePlacements {
    const placements: Record<string, string> = {};
    order.forEach((_, index) => {
        placements[getBlankId(index)] = getTileId(index);
    });
    return placements;
}

const Sorter = forwardRef<Widget, Props>(function Sorter(props, ref) {
    const {options, userInput, widgetId, handleUserInput, trackInteraction} =
        props;
    const {legend} = options;

    const dependencies = useDependencies();

    // TODO: this is a hack while supporting both the new/old Sorter,
    // since the old Sorter doesn't have a separation between
    // choice bank and user input. This copies the original shuffled
    // order for the choice bank.
    const [bankOrder] = useState(() => userInput.options);

    // Where the learner has put cards (what user input is derived from)
    const [placements, setPlacements] = useState<TilePlacements>(() =>
        userInput.changed ? placementsFromOrder(userInput.options) : {},
    );

    useOnMountEffect(() => {
        dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "sorter",
                widgetId: widgetId,
            },
        });
    });

    const blankIds = options.correct.map((_, index) => getBlankId(index));
    const layout =
        options.correct.length > SORTER_MAX_HORIZONTAL_CARDS
            ? "vertical"
            : options.layout;

    const tileIds = bankOrder.map((_, index) => getTileId(index));

    function getTileContent(tileId: string): string {
        return bankOrder[tileIds.indexOf(tileId)];
    }

    function getTileLabel(tileId: string): string {
        return getTileContent(tileId);
    }

    function getBlankLabel(blankId: string): string {
        return tempDndStrings.blankLabel({num: blankIds.indexOf(blankId) + 1});
    }

    function onPlacementsChange(next: TilePlacements) {
        setPlacements(next);

        const isComplete = blankIds.every((blankId) => next[blankId] != null);
        if (isComplete) {
            handleUserInput({
                options: blankIds.map((blankId) =>
                    getTileContent(next[blankId]),
                ),
                changed: true,
            });
        } else if (userInput.changed) {
            handleUserInput({options: userInput.options, changed: false});
        }

        trackInteraction();
    }

    const {
        handleMove,
        handleClear,
        handleDragEnd,
        firstBankMenuRef,
        placedMenuRef,
    } = useTileMoveActions({
        tileUsage: "single",
        blankIds,
        placements,
        onPlacementsChange,
        getBlankLabel,
        getTileLabel,
    });

    useImperativeHandle(ref, () => ({
        getPromptJSON(): SorterPromptJSON {
            return _getPromptJSON(props.userInput);
        },

        /**
         * @deprecated and likely very broken API
         * [LEMS-3185] do not trust serializedState
         */
        getSerializedState(): any {
            const {userInput, options, ...rest} = props;
            return {
                ...rest,
                ...options,
                changed: userInput.changed,
                options: userInput.options,
            };
        },
    }));

    function getMoveTargets(fromBlankId?: string): MoveTarget[] {
        return blankIds
            .filter((blankId) => blankId !== fromBlankId)
            .map((blankId) => ({id: blankId, label: getBlankLabel(blankId)}));
    }

    if (exceedsCardLimit(options.correct)) {
        return (
            <UnsupportedWidgetMessage
                widgetType="sorter"
                widgetSubType="null"
                widgetId={widgetId}
                reason="exceeds-card-limit"
            />
        );
    }

    const bankTiles = tileIds.filter((tileId) =>
        isTileInBank(placements, tileId, "single"),
    );

    const blankList = (
        <ol
            aria-label={legend?.ariaLabel}
            className={classNames(
                styles.blanks,
                layout === "vertical" && styles.vertical,
            )}
        >
            {blankIds.map((blankId) => {
                const tileId = placements[blankId];
                return (
                    <li key={blankId} className={styles.blankItem}>
                        <BlankComponent
                            blankId={blankId}
                            displayType="normal"
                            className={styles.blank}
                        >
                            {tileId != null && (
                                <AnswerTile
                                    tileId={tileId}
                                    fromBlankId={blankId}
                                    content={getTileContent(tileId)}
                                    label={getTileLabel(tileId)}
                                    moveTargets={getMoveTargets(blankId)}
                                    onMove={(targetId) =>
                                        handleMove(
                                            {tileId, fromBlankId: blankId},
                                            targetId,
                                        )
                                    }
                                    clearFromLabel={getBlankLabel(blankId)}
                                    onClear={() => handleClear(blankId)}
                                    menuRef={placedMenuRef(blankId)}
                                    fillsBlank={true}
                                />
                            )}
                        </BlankComponent>
                    </li>
                );
            })}
        </ol>
    );

    const legendPosition = legend?.position ?? "below";

    return (
        <PerseusDndProvider onDragEnd={handleDragEnd}>
            <div className={styles.sorter}>
                {layout === "vertical" ? (
                    <div
                        className={classNames(
                            styles.answerZone,
                            styles.vertical,
                        )}
                    >
                        <LegendBar
                            orientation="vertical"
                            startCap={legend?.startCap}
                            endCap={legend?.endCap}
                        />
                        <div className={styles.verticalColumn}>
                            {legend?.startLabel && (
                                <LegendLabel content={legend.startLabel} />
                            )}
                            {blankList}
                            {legend?.endLabel && (
                                <LegendLabel content={legend.endLabel} />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.answerZone}>
                        {legendPosition === "above" && (
                            <HorizontalLegend
                                legend={legend}
                                position="above"
                            />
                        )}
                        {blankList}
                        {legendPosition === "below" && (
                            <HorizontalLegend
                                legend={legend}
                                position="below"
                            />
                        )}
                    </div>
                )}
                <ChoiceBank label={tempDndStrings.choices}>
                    {bankTiles.map((tileId, index) => (
                        <AnswerTile
                            key={tileId}
                            tileId={tileId}
                            content={getTileContent(tileId)}
                            label={getTileLabel(tileId)}
                            moveTargets={getMoveTargets()}
                            onMove={(targetId) =>
                                handleMove({tileId}, targetId)
                            }
                            menuRef={index === 0 ? firstBankMenuRef : undefined}
                        />
                    ))}
                </ChoiceBank>
            </div>
        </PerseusDndProvider>
    );
});

// The labels sit on the side of the bar away from the blanks.
function HorizontalLegend(props: {
    legend?: SorterLegend;
    position: "above" | "below";
}) {
    const {legend, position} = props;
    const hasLabels = !!(legend?.startLabel || legend?.endLabel);

    const labels = hasLabels && (
        <div className={styles.horizontalLabels}>
            {legend?.startLabel && (
                <div className={styles.startLabel}>
                    <LegendLabel content={legend.startLabel} />
                </div>
            )}
            {legend?.endLabel && (
                <div className={styles.endLabel}>
                    <LegendLabel content={legend.endLabel} />
                </div>
            )}
        </div>
    );

    return (
        <div className={styles.horizontalLegend}>
            {position === "above" && labels}
            <LegendBar
                orientation="horizontal"
                startCap={legend?.startCap}
                endCap={legend?.endCap}
            />
            {position === "below" && labels}
        </div>
    );
}

export default Sorter;
