export function isPiMultiple(value: number): boolean {
    // Early return for integers that clearly aren't multiples
    // of pi to save some computation.
    if (Number.isInteger(value)) {
        return false;
    }

    return (
        value % Math.PI === 0 ||
        value % (Math.PI / 2) === 0 ||
        value % (Math.PI / 3) === 0 ||
        value % (Math.PI / 4) === 0 ||
        value % (Math.PI / 6) === 0
    );
}
