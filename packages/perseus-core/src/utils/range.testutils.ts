export function range(min: number, max: number): number[] {
    const ret: number[] = [];
    for (let n = min; n <= max; n++) {
        ret.push(n);
    }
    return ret;
}
