import type {Coord} from "@khanacademy/perseus";

export type Coords = [Coord, Coord];

// Includes common properties for all function types and plotDefaults
type SharedGrapherType = {
    url: string;
    defaultCoords: Coords;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (coords: Coords, asymptote?: Coords) => string;
    areEqual: (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) => boolean;
    Movable: any;
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
    getCoefficients: (coords: Coords) => ReadonlyArray<number> | undefined;
};

export type QuadraticType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
    };
    getCoefficients: (coords: Coords) => ReadonlyArray<number>;
};

export type SinusoidType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
        d: number;
    };
    getCoefficients: (coords: Coords) => ReadonlyArray<number>;
};

export type TangentType = SharedGrapherType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    getCoefficients: (coords: Coords) => ReadonlyArray<number>;
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
    getCoefficients: (coords: Coords) => ReadonlyArray<number> | undefined;
};
