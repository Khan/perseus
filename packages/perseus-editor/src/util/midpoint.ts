import {vec} from "mafs";

import type {Coord} from "@khanacademy/perseus-core";

// TODO(LEMS-4567): this is a temporary workaround for a bug in mafs'
//  vec.midpoint() function. Remove this implementation of midpoint and use
//  vec.midpoint once we have the fix in https://github.com/stevenpetryk/mafs/pull/188.
export function midpoint(p1: Coord, p2: Coord): Coord {
    return vec.scale(vec.add(p1, p2), 0.5);
}
