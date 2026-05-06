import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {useCallback, useRef} from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {interactiveGraphReducer} from "../reducer/interactive-graph-reducer";

import {getAnnouncementForAction} from "./central-announcer";

import type {InteractiveGraphAction} from "../reducer/interactive-graph-action";
import type {InteractiveGraphState} from "../types";
import type * as React from "react";

const DEFAULT_DEBOUNCE_THRESHOLD_MS = 500;

/**
 * Wraps a dispatch function with WB Announcer integration.
 *
 * Pass in the state and dispatch from your own React.useReducer call.
 * Returns a wrapped dispatch that consults the central announcer before
 * forwarding each action.  In the initial (Phase 1) state the central handler
 * returns null for every action, so no announcement fires and the returned
 * dispatch is behaviourally identical to the original.
 *
 * Internal useEffect / bookkeeping dispatches (changeSnapStep, changeRange,
 * reinitialize) can stay on the raw dispatch from useReducer — the central
 * handler returns null for those anyway.
 */
export function useAnnouncingReducer(
    state: InteractiveGraphState,
    dispatch: React.Dispatch<InteractiveGraphAction>,
): React.Dispatch<InteractiveGraphAction> {
    const {strings, locale} = usePerseusI18n();

    // Mirror the current state into a ref so the wrapped dispatch can read
    // prevState synchronously at call time without closing over a stale value.
    const stateRef = useRef<InteractiveGraphState>(state);
    stateRef.current = state;

    return useCallback(
        (action: InteractiveGraphAction) => {
            const prevState = stateRef.current;
            // Run the reducer to get nextState for the announcer.
            // The real dispatch below runs the same reducer internally;
            // the double-compute is acceptable for announcement correctness.
            const nextState = interactiveGraphReducer(prevState, action);
            const message = getAnnouncementForAction(
                action,
                prevState,
                nextState,
                strings,
                locale,
            );
            if (message !== null) {
                announceMessage({message});
            }
            dispatch(action);
        },
        [dispatch, strings, locale],
    );
}

type AnnounceOptions = {
    debounceThreshold?: number;
};

/**
 * Per-graph escape hatch for math-heavy announcements that belong in the
 * graph component rather than the central handler (OQ3 routing rule).
 *
 * Returns {announce} — call it with a localised string to fire the WB
 * Announcer.  A 500 ms debounce is applied by default; pass
 * {debounceThreshold: N} to override per call.
 */
export function useGraphAnnouncer() {
    const announce = useCallback(
        (message: string, options?: AnnounceOptions) => {
            announceMessage({
                message,
                debounceThreshold:
                    options?.debounceThreshold ?? DEFAULT_DEBOUNCE_THRESHOLD_MS,
            });
        },
        [],
    );

    return {announce};
}
