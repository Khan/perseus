import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {interactiveGraphReducer} from "../reducer/interactive-graph-reducer";

import {getAnnouncementForAction} from "./central-announcer";

import type {InitializeGraphStateParams} from "../reducer/initialize-graph-state";
import type {InteractiveGraphAction} from "../reducer/interactive-graph-action";
import type {InteractiveGraphState} from "../types";

/**
 * Drop-in replacement for `React.useReducer(interactiveGraphReducer, ...)` that
 * additionally runs every dispatched action through the central announcer and
 * speaks the resulting message via the Wonder Blocks Announcer.
 *
 * Per-graph components that want to announce something the central handler
 * doesn't know about (math-heavy semantics, e.g. logarithm asymptote crossing)
 * can use `useGraphAnnouncer` below — that's the OQ3 hybrid escape hatch.
 */
export function useAnnouncingReducer(
    initialParams: InitializeGraphStateParams,
    init: (params: InitializeGraphStateParams) => InteractiveGraphState,
): [InteractiveGraphState, React.Dispatch<InteractiveGraphAction>] {
    const [state, baseDispatch] = React.useReducer(
        interactiveGraphReducer,
        initialParams,
        init,
    );
    const {strings, locale} = usePerseusI18n();

    // Hold the latest state in a ref so the wrapped dispatch can read prevState
    // synchronously without re-creating the dispatch identity every render.
    const stateRef = React.useRef(state);
    stateRef.current = state;

    const dispatch = React.useCallback(
        (action: InteractiveGraphAction) => {
            const prevState = stateRef.current;
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
            baseDispatch(action);
        },
        [strings, locale],
    );

    return [state, dispatch];
}

/**
 * Default debounce window for per-graph announcements. Long enough to collapse
 * a burst of continuous motion (arrow-key holds, drag movement) into a single
 * trailing announcement after the user pauses; short enough to feel responsive.
 */
const DEFAULT_GRAPH_ANNOUNCE_DEBOUNCE_MS = 500;

/**
 * Per-graph escape hatch (OQ3 hybrid). Use this from a graph component when
 * you need to announce something the central handler can't easily compute —
 * for example, a logarithm graph announcing "the point crossed the asymptote".
 *
 * Announcements are debounced by default so continuous motion (drag, arrow-key
 * hold) collapses to a single trailing message rather than jamming the SR
 * queue with one announcement per intermediate position. Pass
 * `{debounceThreshold: 0}` to disable, or any other value to override.
 */
export function useGraphAnnouncer(): {
    announce: (
        message: string,
        options?: {debounceThreshold?: number},
    ) => void;
} {
    return {
        announce: React.useCallback(
            (message: string, options?: {debounceThreshold?: number}) => {
                announceMessage({
                    message,
                    debounceThreshold:
                        options?.debounceThreshold ??
                        DEFAULT_GRAPH_ANNOUNCE_DEBOUNCE_MS,
                });
            },
            [],
        ),
    };
}
