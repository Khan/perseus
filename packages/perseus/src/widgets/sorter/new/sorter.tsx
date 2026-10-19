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
import {useDependencies} from "../../../dependencies";
import {getPromptJSON as _getPromptJSON} from "../../../widget-ai-utils/sorter/sorter-ai-utils";
import deprecatedStandin from "../../deprecated-standin";

import styles from "./sorter.module.css";

import type {MoveTarget} from "../../../components/drag-and-drop/dnd-action-menu";
import type {TilePlacements} from "../../../components/drag-and-drop/tile-placements";
import type {Widget, WidgetProps} from "../../../types";
import type {SorterPromptJSON} from "../../../widget-ai-utils/sorter/sorter-ai-utils";
import type {
    PerseusSorterWidgetOptions,
    PerseusSorterUserInput,
} from "@khanacademy/perseus-core";

const DeprecatedStandin = deprecatedStandin.widget;

type Props = WidgetProps<PerseusSorterWidgetOptions, PerseusSorterUserInput>;

function getBlankId(index: number): string {
    return `blank-${index}`;
}

function placementsFromOrder(order: string[]): TilePlacements {
    const placements: Record<string, string> = {};
    order.forEach((tileId, index) => {
        placements[getBlankId(index)] = tileId;
    });
    return placements;
}

const Sorter = forwardRef<Widget, Props>(function Sorter(props, ref) {
    const dependencies = useDependencies();

    const {options, userInput, widgetId, handleUserInput, trackInteraction} =
        props;

    const blankIds = options.correct.map((_, index) => getBlankId(index));

    const [bankOrder] = useState(() => userInput.options);
    const [placements, setPlacements] = useState<TilePlacements>(() =>
        userInput.changed ? placementsFromOrder(userInput.options) : {},
    );

    const layout =
        options.correct.length > SORTER_MAX_HORIZONTAL_CARDS
            ? "vertical"
            : options.layout;

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

    function getTileLabel(tileId: string): string {
        return tileId;
    }

    function getBlankLabel(blankId: string): string {
        return tempDndStrings.blankLabel({num: blankIds.indexOf(blankId) + 1});
    }

    function handlePlacementsChange(next: TilePlacements) {
        setPlacements(next);

        const isComplete = blankIds.every((blankId) => next[blankId] != null);
        if (isComplete) {
            handleUserInput({
                options: blankIds.map((blankId) => next[blankId]),
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
        placements,
        onPlacementsChange: handlePlacementsChange,
        tileUsage: "single",
        getTileLabel,
        getBlankLabel,
        blankIds,
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
        return <DeprecatedStandin />;
    }

    const bankTiles = bankOrder.filter((tileId) =>
        isTileInBank(placements, tileId, "single"),
    );

    return (
        <PerseusDndProvider onDragEnd={handleDragEnd}>
            <div className={styles.sorter}>
                <ol
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
                                            content={tileId}
                                            label={getTileLabel(tileId)}
                                            moveTargets={getMoveTargets(
                                                blankId,
                                            )}
                                            onMove={(targetId) =>
                                                handleMove(
                                                    {
                                                        tileId,
                                                        fromBlankId: blankId,
                                                    },
                                                    targetId,
                                                )
                                            }
                                            clearFromLabel={getBlankLabel(
                                                blankId,
                                            )}
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
                <ChoiceBank label={tempDndStrings.choices}>
                    {bankTiles.map((tileId, index) => (
                        <AnswerTile
                            key={tileId}
                            tileId={tileId}
                            content={tileId}
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

export default Sorter;
