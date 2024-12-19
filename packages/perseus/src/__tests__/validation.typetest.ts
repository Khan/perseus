/**
 * This file contains TypeScript type "tests" which ensure that types needed
 * for scoring and validation stay in sync with other types in the system.
 *
 * If you make a change and one of these "satisfies" assertions fails, that
 * will usually mean you've made a change that will cause runtime breakages in
 * scoring or validation.
 */
import type {PerseusRenderer} from "../perseus-types";
import type {ScoringDataMap, ValidationDataMap} from "../validation.types";

/**
 * An utility type that verifies that the given type `E` extends the type `T`.
 * This is useful for asserting that one type remains a compatible subset of
 * the other.
 */
type Extends<T, E extends T> = (T) => E;

// We can use a 'widgets' map from a PerseusRenderer as a ValidationDataMap
type _ = Extends<ValidationDataMap, PerseusRenderer["widgets"]>;

// We can use a ScoringDataMap as a ValidationDataMap
type __ = Extends<ValidationDataMap, ScoringDataMap>;
