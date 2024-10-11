import type {Coord} from "@khanacademy/perseus";

export type Coords = [Coord, Coord];

// Includes common properties for all function types and plotDefaults
type BaseType = {
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

export type LinearType = BaseType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    getCoefficients: (coords: Coords) => ReadonlyArray<number> | undefined;
};

export type QuadraticType = BaseType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
    };
    getCoefficients: (coords: Coords) => ReadonlyArray<number>;
};

export type SinusoidType = BaseType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
        d: number;
    };
    getCoefficients: (coords: Coords) => ReadonlyArray<number>;
};

export type TangentType = BaseType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    getCoefficients: (coords: Coords) => ReadonlyArray<number>;
};

export type ExponentialType = BaseType & {
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
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    getCoefficients: (
        coords: Coords,
        asymptote: Coords,
    ) => ReadonlyArray<number>;
};

export type LogarithmType = BaseType & {
    defaultAsymptote: Coords;
    extraCoordConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coords,
        asymptote: Coords,
        graph: any,
    ) => boolean;
    extraAsymptoteConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coords,
        asymptote: Coords,
        graph: any,
    ) => Coord;
    allowReflectOverAsymptote: boolean;
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    getCoefficients: (
        coords: Coords,
        asymptote: Coords,
    ) => ReadonlyArray<number>;
};

export type AbsoluteValueType = BaseType & {
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
    getCoefficients: (coords: Coords) => ReadonlyArray<number> | undefined;
};

export type FunctionTypes =
    | LinearType
    | QuadraticType
    | SinusoidType
    | TangentType
    | ExponentialType
    | LogarithmType
    | AbsoluteValueType;
