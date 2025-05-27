/**
 * SpreadType<A, B> simulates {...A, ...B} from Flow.
 */
declare type SpreadType<A, B> = Omit<A, keyof B> & B;

declare type Empty = Record<never, never>;

export type Issue = {
    id: string;
    description: string;
    helpUrl: string;
    help: string;
    impact: "low" | "medium" | "high";
    message: string;
};
