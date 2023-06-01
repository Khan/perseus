export const UNLIMITED = "unlimited" as const;
export type PointValue = number | typeof UNLIMITED;

// Parses a string (ostensibly from some UI element that only supports string
// types, such as a <select />) into a numeric point count or the special sigil
// "unlimited". Note that 0 is a special case, and means "unlimited".
export const parsePointCount = (points: string): PointValue => {
    const parsed = parseInt(points, 10);
    if (isNaN(parsed)) {
        return UNLIMITED;
    }
    return parsed === 0 ? UNLIMITED : parsed;
};
