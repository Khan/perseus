import type {
    SorterLegend,
    SorterLegendCap,
    SorterVariant,
} from "@khanacademy/perseus-core";

const defaultCaps = {
    scale: "arrow",
    timeline: "bar",
} satisfies Record<SorterVariant, SorterLegendCap>;

/**
 * The legend a sorter shows when its content doesn't have one. The editor
 * shows the same values, so both stay in sync without writing a legend into
 * content before the author edits it.
 */
export function getDefaultLegend(
    variant: SorterVariant = "scale",
): SorterLegend {
    return {
        startCap: defaultCaps[variant],
        endCap: defaultCaps[variant],
        startLabel: "",
        endLabel: "",
        ariaLabel: "",
        position: "below",
    };
}
