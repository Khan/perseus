import {showTickLabel} from "./graphs/components/axis-tick-labels";

it("should hide the first negative axis tick label if the gridStep > tickStep", () => {
    const gridStep = 2;
    const tickStep = 1;
    const label = -1;
    const graphEdge = 400;
    const position = 220;
    const axisOutOfBounds = false;
    expect(
        showTickLabel({
            gridStep,
            tickStep,
            label,
            graphEdge,
            position,
            axisOutOfBounds,
        }),
    ).toEqual(false);
});

it("should show the first negative axis tick label if the tickStep > gridStep", () => {
    const gridStep = 1;
    const tickStep = 2;
    const label = -2;
    const graphEdge = 400;
    const position = 220;
    const axisOutOfBounds = false;
    expect(
        showTickLabel({
            gridStep,
            tickStep,
            label,
            graphEdge,
            position,
            axisOutOfBounds,
        }),
    ).toEqual(true);
});

it("should hide a label if the position is greater than the relevant graph edge", () => {
    const gridStep = 2;
    const tickStep = 1;
    const label = -1;
    const graphEdge = 400;
    const position = 420;
    const axisOutOfBounds = false;
    expect(
        showTickLabel({
            gridStep,
            tickStep,
            label,
            graphEdge,
            position,
            axisOutOfBounds,
        }),
    ).toEqual(false);
});
