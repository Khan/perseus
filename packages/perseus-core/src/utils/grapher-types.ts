import type {Coord} from "../data-schema";

export type Coords = [Coord, Coord];

// Includes common properties for all function types and plotDefaults
type SharedGrapherType = {
    url: string;
    defaultCoords: Coords;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (coords: Coords, asymptote?: Coords) => string | null;
    areEqual: (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) => boolean;
    Movable: any;
    getCoefficients: (
        coords: Coords,
        asymptote?: Coords,
    ) => ReadonlyArray<number> | undefined;
};

type AsymptoticGraphsType = {
    defaultAsymptote: Coords;
    extraCoordConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coords,
        asymptote: Coords,
        graph: any,
    ) => boolean | Coord;
    extraAsymptoteConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coords,
        asymptote: Coords,
        graph: any,
    ) => Coord;
    allowReflectOverAsymptote: boolean;
};

export type LinearType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
};

export type QuadraticType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
    };
};

export type SinusoidType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
        d: number;
    };
};

export type TangentType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
};

export type ExponentialType = SharedGrapherType &
    AsymptoticGraphsType & {
        getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    };

export type LogarithmType = SharedGrapherType &
    AsymptoticGraphsType & {
        getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    };

export type AbsoluteValueType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
};
