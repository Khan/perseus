import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState, Segment} from "./interactive-graph-state";
import Util from "../../util"

export function interactiveGraphReducer(
    state: Readonly<InteractiveGraphState>,
    action: InteractiveGraphAction,
): InteractiveGraphState {
    const newSegments = updateAtIndex(state.segments, action.objectIndex, (segment) =>
        setAtIndex(segment, action.pointIndex, action.destination),
    )
    if (!validSegments(newSegments)) {
        return state
    }
    return {
        ...state,
        hasBeenInteractedWith: true,
        segments: newSegments
    };
}

function validSegments(segments: Segment[]): boolean {
    return segments.every(([start, end]) => !Util.deepEq(start, end))
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
