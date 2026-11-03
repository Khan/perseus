import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {useState} from "react";

import {usePerseusI18n} from "../../components/i18n-context";

import {getChoiceLetter} from "./util";

import type {RadioCrossOutProps} from "./radio-component";
import type {CrossOutOptions} from "../../types";

interface UseCrossOutArgs {
    /** The host's cross-out settings (`apiOptions.crossOut`). */
    options: CrossOutOptions | undefined;
    /** The choices, in the order they're shown. */
    choices: ReadonlyArray<{id: string}>;
    /** The IDs of the choices the learner selected. */
    selectedChoiceIds: ReadonlyArray<string>;
    isReviewMode: boolean;
    isStatic: boolean;
    readOnly: boolean;
    /**
     * Called when crossing out a selected choice unselects it.
     *
     * @param selectedChoiceIds The selected choice IDs without the one that
     *     was crossed out.
     */
    onUnselect: (selectedChoiceIds: string[]) => void;
}

interface UseCrossOutResult {
    /**
     * The props for RadioComponent's cross-out tool, or undefined when it's
     * off or hidden.
     */
    crossOut: RadioCrossOutProps | undefined;
    /**
     * Restore a crossed-out choice the learner just selected.
     *
     * When the choice was shown as crossed out, this also announces that it
     * was restored and selected, so the caller must skip its own
     * announcement.
     *
     * @param choiceId The ID of the choice that was selected.
     * @returns Whether the choice was shown as crossed out.
     */
    restoreSelectedChoice: (choiceId: string) => boolean;
}

/**
 * Keep the state of the Radio widget's cross-out tool.
 *
 * Cross-out state is display-only. It lives here, never in userInput, so it's
 * never part of the answer that gets scored.
 *
 * @returns The cross-out props and a handler for selected choices.
 */
export function useCrossOut({
    options,
    choices,
    selectedChoiceIds,
    isReviewMode,
    isStatic,
    readOnly,
    onUnselect,
}: UseCrossOutArgs): UseCrossOutResult {
    const {strings} = usePerseusI18n();
    const [localToggleOn, setLocalToggleOn] = useState(false);
    const toggleOn = options?.toggleOn ?? localToggleOn;
    const [crossedOutIds, setCrossedOutIds] = useState<ReadonlyArray<string>>(
        [],
    );
    // While the toggle is off, crossed-out choices look and read like any
    // other choice. They're remembered, so turning the toggle back on shows
    // them again.
    const visibleCrossedOutIds = toggleOn ? crossedOutIds : [];

    // Clear cross-outs when the host changes the reset key (on each Check)
    // and when review mode turns on. Done while rendering, rather than in an
    // effect, so a stale cross-out is never painted.
    const resetKey = options?.resetKey;
    const [prevResetKey, setPrevResetKey] = useState(resetKey);
    if (resetKey !== prevResetKey) {
        setPrevResetKey(resetKey);
        setCrossedOutIds([]);
    } else if (isReviewMode && crossedOutIds.length > 0) {
        setCrossedOutIds([]);
    }

    const getLetterForChoice = (choiceId: string): string =>
        getChoiceLetter(
            choices.findIndex((choice) => choice.id === choiceId),
            strings,
        );

    const restoreSelectedChoice = (choiceId: string): boolean => {
        if (!crossedOutIds.includes(choiceId)) {
            return false;
        }
        setCrossedOutIds(crossedOutIds.filter((id) => id !== choiceId));

        // While the toggle is off the choice isn't shown as crossed out, so
        // it's restored silently.
        if (!visibleCrossedOutIds.includes(choiceId)) {
            return false;
        }
        // One message covers the restore and the selection, so nothing is
        // announced twice.
        announceMessage({
            message: strings.choiceRestoredAndSelected({
                letter: getLetterForChoice(choiceId),
            }),
        });
        return true;
    };

    const handleCrossOutChange = (
        choiceId: string,
        crossedOut: boolean,
    ): void => {
        const newCrossedOutIds = crossedOut
            ? [...crossedOutIds, choiceId]
            : crossedOutIds.filter((id) => id !== choiceId);
        setCrossedOutIds(newCrossedOutIds);

        // Crossing out a selected choice also unselects it.
        const unselected = crossedOut && selectedChoiceIds.includes(choiceId);
        if (unselected) {
            onUnselect(selectedChoiceIds.filter((id) => id !== choiceId));
        }

        const messageArgs = {
            letter: getLetterForChoice(choiceId),
            num: choices.length - newCrossedOutIds.length,
        };
        // One message covers the cross-out and the unselect, so nothing is
        // announced twice.
        const message = unselected
            ? strings.choiceCrossedOutAndUnselectedRemaining(messageArgs)
            : crossedOut
              ? strings.choiceCrossedOutRemaining(messageArgs)
              : strings.choiceRestoredRemaining(messageArgs);
        announceMessage({message});
    };

    const handleToggleChange = (newToggleOn: boolean): void => {
        setLocalToggleOn(newToggleOn);
        options?.onToggleChange?.(newToggleOn);

        // Turning the toggle back on shows the remembered cross-outs again,
        // so say how many there are. Nothing changes when there are none.
        if (newToggleOn && crossedOutIds.length > 0) {
            announceMessage({
                message: strings.choicesCrossedOut({
                    num: crossedOutIds.length,
                }),
            });
        }
    };

    // Cross-out is hidden in review mode, and can't be changed after Check.
    const crossOut: RadioCrossOutProps | undefined =
        options?.enabled && !isReviewMode && !isStatic
            ? {
                  toggleOn,
                  disabled: readOnly,
                  onToggleChange: handleToggleChange,
                  crossedOutIds: visibleCrossedOutIds,
                  onCrossOutChange: handleCrossOutChange,
              }
            : undefined;

    return {crossOut, restoreSelectedChoice};
}
