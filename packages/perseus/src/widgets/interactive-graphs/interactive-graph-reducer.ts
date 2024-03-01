import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState} from "./interactive-graph-state";

export function interactiveGraphReducer(
    state: Readonly<InteractiveGraphState>,
    action: InteractiveGraphAction,
): InteractiveGraphState {
    return {
        ...state,
        hasBeenInteractedWith: true,
        segments: updateAtIndex(state.segments, action.objectIndex, (segment) =>
            setAtIndex(segment, action.pointIndex, action.destination),
        ),
    };
}

function updateAtIndex<A extends readonly any[]>(
    array: A,
    index: number,
    update: (elem: A[number]) => A[number],
): A {
    return setAtIndex(array, index, update(array[index]));
}

function setAtIndex<A extends readonly any[]>(
    array: A,
    index: number,
    newValue: A[number],
): A {
    const copy = [...array] as any;
    copy[index] = newValue;
    return copy;
}
