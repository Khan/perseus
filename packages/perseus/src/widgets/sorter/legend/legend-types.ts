// TODO(anakaren): Replace these with the Sorter legend types from
// perseus-core once the legend schema lands.
export type SorterLegendCap = "arrow" | "bar" | "none";

export type SorterLegend = {
    startCap: SorterLegendCap;
    endCap: SorterLegendCap;
    startLabel: string;
    endLabel: string;
    ariaLabel: string;
    position: "above" | "below";
};
