import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {renderHook, act} from "@testing-library/react";
import * as React from "react";

import {initializeGraphState} from "../reducer/initialize-graph-state";
import {actions} from "../reducer/interactive-graph-action";
import {interactiveGraphReducer} from "../reducer/interactive-graph-reducer";

import {
    useAnnouncingReducer,
    useGraphAnnouncer,
} from "./use-announcing-reducer";

import type {InitializeGraphStateParams} from "../reducer/initialize-graph-state";

jest.mock("@khanacademy/wonder-blocks-announcer");

const baseParams: InitializeGraphStateParams = {
    graph: {type: "point", numPoints: 2},
    range: [
        [-10, 10],
        [-10, 10],
    ],
    step: [1, 1],
    snapStep: [1, 1],
};

describe("useAnnouncingReducer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("keeps state in lockstep with interactiveGraphReducer after dispatch", () => {
        const {result} = renderHook(() => {
            const [state, dispatch] = React.useReducer(
                interactiveGraphReducer,
                baseParams,
                initializeGraphState,
            );
            const announcingDispatch = useAnnouncingReducer(state, dispatch);
            return {state, announcingDispatch};
        });

        const action = actions.pointGraph.movePoint(0, [3, 4]);
        act(() => {
            result.current.announcingDispatch(action);
        });

        const expected = interactiveGraphReducer(
            initializeGraphState(baseParams),
            action,
        );
        expect(result.current.state).toEqual(expected);
    });

    it("does not call announceMessage when the central handler returns null", () => {
        const {result} = renderHook(() => {
            const [state, dispatch] = React.useReducer(
                interactiveGraphReducer,
                baseParams,
                initializeGraphState,
            );
            return useAnnouncingReducer(state, dispatch);
        });

        act(() => {
            result.current(actions.pointGraph.movePoint(0, [1, 1]));
        });

        expect(announceMessage).not.toHaveBeenCalled();
    });

    it("returns a stable dispatch reference across re-renders", () => {
        const {result, rerender} = renderHook(() => {
            const [state, dispatch] = React.useReducer(
                interactiveGraphReducer,
                baseParams,
                initializeGraphState,
            );
            return useAnnouncingReducer(state, dispatch);
        });
        const firstDispatch = result.current;
        rerender();
        expect(result.current).toBe(firstDispatch);
    });
});

describe("useGraphAnnouncer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls announceMessage with the provided message", () => {
        const {result} = renderHook(() => useGraphAnnouncer());
        act(() => {
            result.current.announce("test message");
        });
        expect(announceMessage).toHaveBeenCalledWith(
            expect.objectContaining({message: "test message"}),
        );
    });

    it("applies the default 500 ms debounce threshold", () => {
        const {result} = renderHook(() => useGraphAnnouncer());
        act(() => {
            result.current.announce("test message");
        });
        expect(announceMessage).toHaveBeenCalledWith(
            expect.objectContaining({debounceThreshold: 500}),
        );
    });

    it("honours a per-call debounceThreshold override", () => {
        const {result} = renderHook(() => useGraphAnnouncer());
        act(() => {
            result.current.announce("test message", {debounceThreshold: 0});
        });
        expect(announceMessage).toHaveBeenCalledWith(
            expect.objectContaining({debounceThreshold: 0}),
        );
    });

    it("returns a stable announce reference across re-renders", () => {
        const {result, rerender} = renderHook(() => useGraphAnnouncer());
        const firstAnnounce = result.current.announce;
        rerender();
        expect(result.current.announce).toBe(firstAnnounce);
    });
});
