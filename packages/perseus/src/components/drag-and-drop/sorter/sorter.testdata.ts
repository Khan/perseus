import type {SorterProps} from "./sorter";

/** Generates complete, valid props for a three-loan scale exercise. */
export function generateSorterProps(
    overrides: Partial<SorterProps> = {},
): SorterProps {
    return {
        variant: "scale",
        legend: {
            startLabel: "Lowest",
            endLabel: "Highest",
            srLabel: "Interest rate, from lowest to highest",
            startStyle: "arrow",
            endStyle: "arrow",
        },
        tiles: [
            {id: "car", content: "car loan", label: "car loan"},
            {id: "credit", content: "credit card", label: "credit card"},
            {id: "student", content: "student loan", label: "student loan"},
        ],
        orientation: "horizontal",
        placements: {},
        onPlacementsChange: () => {},
        ...overrides,
    };
}
