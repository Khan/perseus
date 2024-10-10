import type {Coord} from "@khanacademy/perseus";

export type PlotDefaultTypes = {
    areEqual: (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) => boolean;
    Movable: any;
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {fn: any};
};

export type LinearType = PlotDefaultTypes & {
    url: string;
    defaultCoords: [Coord, Coord];
    getCoefficients: (coords: [Coord, Coord]) => number[];
    getFunctionForCoeffs: (coeffs: any, x: number) => number;
    getEquationString: (coords: [Coord, Coord]) => string;
};

export type QuadraticType = PlotDefaultTypes & {
    url: string;
    defaultCoords: [Coord, Coord];
    Movable: any;
    getCoefficients: (coords: [Coord, Coord]) => number[];
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
    };
    getEquationString: (coords: [Coord, Coord]) => string;
};

export type SinusoidType = PlotDefaultTypes & {
    url: string;
    defaultCoords: [Coord, Coord];
    Movable: any;
    getCoefficients: (coords: [Coord, Coord]) => number[];
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
    };
    getEquationString: (coords: [Coord, Coord]) => string;
    areEqual: (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) => boolean;
};

export type TangentType = PlotDefaultTypes & {
    url: string;
    defaultCoords: [Coord, Coord];
    getCoefficients: (coords: [Coord, Coord]) => number[];
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (coords: [Coord, Coord]) => string;
    areEqual: (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) => boolean;
};

export type ExponentialType = PlotDefaultTypes & {
    url: string;
    defaultCoords: [Coord, Coord];
    defaultAsymptote: [Coord, Coord];
    extraCoordConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
        graph: any,
    ) => boolean | Coord;
    extraAsymptoteConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
        graph: any,
    ) => Coord;
    allowReflectOverAsymptote: boolean;
    getCoefficients: (
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
    ) => ReadonlyArray<number>;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
    ) => string | null;
};

export type LogarithmType = PlotDefaultTypes & {
    url: string;
    defaultCoords: [Coord, Coord];
    defaultAsymptote: [Coord, Coord];
    extraCoordConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
        graph: any,
    ) => boolean;
    extraAsymptoteConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
        graph: any,
    ) => Coord;
    allowReflectOverAsymptote: boolean;
    getCoefficients: (
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
    ) => ReadonlyArray<number>;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (
        coords: [Coord, Coord],
        asymptote: [Coord, Coord],
    ) => string | null;
};
export type AbsoluteValueType = PlotDefaultTypes & {
    url: string;
    defaultCoords: [Coord, Coord];
    getCoefficients: (coords: [Coord, Coord]) => ReadonlyArray<number>;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (coords: [Coord, Coord]) => string;
};

export type FunctionTypes =
    | LinearType
    | QuadraticType
    | SinusoidType
    | TangentType
    | ExponentialType
    | LogarithmType
    | AbsoluteValueType;
