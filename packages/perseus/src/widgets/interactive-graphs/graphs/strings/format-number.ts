export function srFormatNumber(
    a: number,
    locale: string,
    maximumFractionDigits?: number,
): string {
    const piBasedNumber = getPiMultiple(a);
    if (piBasedNumber) {
        return piBasedNumber;
    }

    // adding zero here converts negative zero to positive zero.
    return (0 + a).toLocaleString(locale, {
        maximumFractionDigits: maximumFractionDigits ?? 3,
        useGrouping: false, // no thousands separators
    });
}

// Exported for testing
export function getPiMultiple(a: number): string | null {
    // - Save some calculations by checking if this is an integer first.
    //   If a is an integer, it's definitely not a multiple of π.
    // - 0 should not be presented as a multiple of π.
    // - If a is greater than 1e12, then it thinks that it's always a
    //   multiple of π even when it's not, due to rounding errors.
    if (Number.isInteger(a) || a === 0 || a > 1e12) {
        return null;
    }

    // Figure out the coefficient before the π.
    // Example: If a = π/2, then piCoefficient = 0.5
    // Example: If a = 2π, then piCoefficient = 2
    const piCoefficient = a / Math.PI;
    // Truncate the coefficient to account for floating point errors.
    // π calculations are only accurate up to precision of 1e-12.
    const truncatedCoefficient = parseFloat(piCoefficient.toFixed(12));

    // If the coefficient is already an integer, then the number
    // is a multiple of π. Return it here.
    // Example: If a = 2π, then truncatedCoefficient = 2, so return "2π"
    if (Number.isInteger(truncatedCoefficient)) {
        // NOTE: We are NOT doing a custom check to return -π and π here
        // instead of -1π and 1π, because screen readers may not read the
        // negative sign at all if it's directly before the π. This could
        // completely mess up the understanding of the graph for visually
        // impaired users.
        return truncatedCoefficient + "π";
    }

    // If the coefficient is not an integer, then we need to
    // check if it's a multiple of π/2, π/3, π/4, or π/6.
    // These are π-based values on a unit circle.
    const acceptableDivisors = [2, 3, 4, 6];

    // Loop through the acceptable divisors and check if the
    // coefficient is a multiple of (1/divisor).
    // Example: If a = 5π/6, the coeff is 5/6, which is a multiple of 1/6.
    // So we return "5π/6".
    for (const divisor of acceptableDivisors) {
        // Check if the coefficient is a multiple of (1/divisor) by
        // multiplying the coefficient by the divisor and checking if
        // the result is an integer.
        // Example: If a = 5π/6, then piCoefficient = 5/6. We multiply
        // by 6 (divisor) to get 5, which is an integer.
        const coefficientNumerator = parseFloat(
            // π calculations are only accurate up to precision of 1e-12.
            (piCoefficient * divisor).toFixed(12),
        );

        if (Number.isInteger(coefficientNumerator)) {
            // NOTE: We are NOT doing a custom check to return -π and π here
            // instead of -1π and 1π, because screen readers may not read the
            // negative sign at all if it's directly before the π. This could
            // completely mess up the understanding of the graph for visually
            // impaired users.
            return coefficientNumerator + "π/" + divisor;
        }
    }

    return null;
}
