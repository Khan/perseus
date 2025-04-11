/**
 * This file contains TypeScript type "tests" which ensure that types needed
 * for scoring and validation stay in sync with other types in the system.
 *
 * If you make a change and `Extends<>` starts to complain, that will usually
 * mean you've made a change that will cause runtime breakages in scoring or
 * validation. ie. The types that should be compatible are no longer
 * compatible. Read the TypeScript error message closely and it should point
 * you in the right direction.
 */
import type {PerseusRenderer} from "./data-schema";
import type {RubricMap, ValidationDataMap} from "./validation.types";

/**
 * An utility type that verifies that the given type `E` extends the type `T`.
 * This is useful for asserting that one type remains a compatible subset of
 * the other.
 */
type Extends<T, E extends T> = (T) => E;

// We can use a 'widgets' map from a PerseusRenderer as a ValidationDataMap
type _ = Extends<ValidationDataMap, PerseusRenderer["widgets"]>;

// We can use a RubricMap as a ValidationDataMap
type __ = Extends<ValidationDataMap, RubricMap>;
