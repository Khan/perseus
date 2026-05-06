import {mockStrings} from "../../../strings";
import {initializeGraphState} from "../reducer/initialize-graph-state";
import {
    actions,
    changeRange,
    changeSnapStep,
    reinitialize,
} from "../reducer/interactive-graph-action";

import {getAnnouncementForAction} from "./central-announcer";

import type {InteractiveGraphAction} from "../reducer/interactive-graph-action";
import type {InteractiveGraphState} from "../types";

// A minimal valid state used as prevState/nextState across all rows.
const baseState: InteractiveGraphState = initializeGraphState({
    graph: {type: "point", numPoints: 2},
    range: [
        [-10, 10],
        [-10, 10],
    ],
    step: [1, 1],
    snapStep: [1, 1],
});

const locale = "en";

// One row per InteractiveGraphAction type.  In Phase 1 every action returns
// null — this table locks in the dormant default and forces future
// contributors to *deliberately* add a case rather than silently inheriting
// null.
const actionsTable: Array<[string, InteractiveGraphAction]> = [
    [
        "reinitialize",
        reinitialize({
            graph: {type: "point"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
        }),
    ],
    [
        "move-point-in-figure",
        actions.linearSystem.movePointInFigure(0, 0, [1, 1]),
    ],
    ["move-line", actions.linear.moveLine([1, 1])],
    ["move-all", actions.polygon.moveAll([1, 0])],
    ["move-point", actions.angle.movePoint(0, [1, 1])],
    ["move-center", actions.circle.moveCenter([1, 1])],
    ["move-radius-point", actions.circle.moveRadiusPoint([2, 0])],
    ["change-snap-step", changeSnapStep([1, 1])],
    [
        "change-range",
        changeRange([
            [-10, 10],
            [-10, 10],
        ]),
    ],
    ["add-point", actions.polygon.addPoint([3, 3])],
    ["remove-point", actions.polygon.removePoint(0)],
    ["focus-point", actions.polygon.focusPoint(0)],
    ["blur-point", actions.polygon.blurPoint()],
    ["delete-intent", actions.global.deleteIntent()],
    ["click-point", actions.polygon.clickPoint(0)],
    ["close-polygon", actions.polygon.closePolygon()],
    ["open-polygon", actions.polygon.openPolygon()],
    [
        "change-interaction-mode",
        actions.global.changeInteractionMode("keyboard"),
    ],
    [
        "change-keyboard-invitation-visibility",
        actions.global.changeKeyboardInvitationVisibility(true),
    ],
];

describe("getAnnouncementForAction (Phase 1 — dormant)", () => {
    it.each(actionsTable)("returns null for %s", (_label, action) => {
        const result = getAnnouncementForAction(
            action,
            baseState,
            baseState,
            mockStrings,
            locale,
        );
        expect(result).toBeNull();
    });
});
