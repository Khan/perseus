import type {Graphie} from "../util/graphie";

export type Coord = [number, number]; // x, y
export type Line = [Coord, Coord]; // start, end
export type Constraint = (
    this: {graphie: Graphie},
    current: Coord | boolean,
    previous: Coord,
    options: ConstraintCallbacks,
) => Coord | boolean | undefined;

// TODO(benchristel): these callbacks feel overcomplicated. Can we
// get rid of them?
export type ConstraintCallbacks = {
    onSkipRemaining(): void;
    onOutOfBounds?: () => void;
};
