/**
 * SpreadType<A, B> simulates {...A, ...B} from Flow.
 */
declare type SpreadType<A, B> = Omit<A, keyof B> & B;

declare type Empty = Record<never, never>;
