import {Interval} from "mafs";

export function size([min, max]: Interval): number {
    return max - min;
}
