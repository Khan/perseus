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

// We can use a 'widgets' map from a PerseusRenderer as a ValidationDataMap
0 as any as PerseusRenderer["widgets"] satisfies ValidationDataMap;

// We can use a ScoringDataMap as a ValidationDataMap
0 as any as ScoringDataMap satisfies ValidationDataMap;
