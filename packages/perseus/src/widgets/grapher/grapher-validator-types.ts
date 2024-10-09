import type {Coord} from "@khanacademy/perseus";

export type LinearType = {
    url: string;
    defaultCoords: ReadonlyArray<Coord>;
    getCoefficients: (coords: ReadonlyArray<Coord>) => number[] | undefined;
    getFunctionForCoeffs: (coeffs: any, x: number) => number;
    getEquationString: (coords: ReadonlyArray<Coord>) => string;
};

export type QuadraticType = {
    url: string;
    defaultCoords: ReadonlyArray<Coord>;
    Movable: any;
    getCoefficients: (coords: ReadonlyArray<Coord>) => number[];
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
    };
    getEquationString: (coords: ReadonlyArray<Coord>) => string;
};

export type SinusoidType = {
    url: string;
    defaultCoords: ReadonlyArray<Coord>;
    Movable: any;
    getCoefficients: (coords: ReadonlyArray<Coord>) => number[];
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getPropsForCoeffs: (coeffs: ReadonlyArray<number>) => {
        a: number;
        b: number;
        c: number;
    };
    getEquationString: (coords: ReadonlyArray<Coord>) => string;
    areEqual: (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) => boolean;
};

export type TangentType = {
    url: string;
    defaultCoords: ReadonlyArray<Coord>;
    getCoefficients: (coords: ReadonlyArray<Coord>) => number[];
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (coords: ReadonlyArray<Coord>) => string;
    areEqual: (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) => boolean;
};

export type ExponentialType = {
    url: string;
    defaultCoords: ReadonlyArray<Coord>;
    defaultAsymptote: ReadonlyArray<Coord>;
    extraCoordConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
        graph: any,
    ) => boolean | Coord;
    extraAsymptoteConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
        graph: any,
    ) => Coord;
    allowReflectOverAsymptote: boolean;
    getCoefficients: (
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
    ) => ReadonlyArray<number>;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
    ) => string | null;
};

export type LogarithmType = {
    url: string;
    defaultCoords: ReadonlyArray<Coord>;
    defaultAsymptote: ReadonlyArray<Coord>;
    extraCoordConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
        graph: any,
    ) => boolean;
    extraAsymptoteConstraint: (
        newCoord: Coord,
        oldCoord: Coord,
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
        graph: any,
    ) => Coord;
    allowReflectOverAsymptote: boolean;
    getCoefficients: (
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
    ) => ReadonlyArray<number>;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (
        coords: ReadonlyArray<Coord>,
        asymptote: ReadonlyArray<Coord>,
    ) => string | null;
};
export type AbsoluteValueType = {
    url: string;
    defaultCoords: ReadonlyArray<Coord>;
    getCoefficients: (
        coords: ReadonlyArray<Coord>,
    ) => ReadonlyArray<number> | undefined;
    getFunctionForCoeffs: (coeffs: ReadonlyArray<number>, x: number) => number;
    getEquationString: (coords: ReadonlyArray<Coord>) => string;
};

export type FunctionTypeMappingTypes = {
    readonly linear: LinearType;
    readonly quadratic: QuadraticType;
    readonly sinusoid: SinusoidType;
    readonly tangent: TangentType;
    readonly exponential: ExponentialType;
    readonly logarithm: LogarithmType;
    readonly absolute_value: any;
};

export type FunctionTypes =
    | LinearType
    | QuadraticType
    | SinusoidType
    | TangentType
    | ExponentialType
    | LogarithmType
    | AbsoluteValueType;
