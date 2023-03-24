/**
 * Ray Utils
 * A ray (→) is an array of an endpoint and another point along the ray.
 * For example, [[0, 0], [1, 0]] is the ray starting at the origin and
 * traveling along the positive x-axis.
 */

import * as kpoint from "./point";
import * as kvector from "./vector";

import type {Point} from "./point";

export type Ray = [Point, Point];

export function equal(ray1: Ray, ray2: Ray, tolerance?: number): boolean {
    // Compare the directions of the rays
    const v1 = kvector.subtract(ray1[1], ray1[0]);
    const v2 = kvector.subtract(ray2[1], ray2[0]);

    const sameOrigin = kpoint.equal(ray1[0], ray2[0]);
    const codirectional = kvector.codirectional(v1, v2, tolerance);

    return sameOrigin && codirectional;
}
