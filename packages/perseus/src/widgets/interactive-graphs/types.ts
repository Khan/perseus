import type {
    PerseusGraphType,
    PerseusInteractiveGraphWidgetOptions,
} from "../../perseus-types";
import type {WidgetProps} from "../../types";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphWidgetOptions
>;

export type OnGraphChange<T extends PerseusGraphType> = (
    callback: (current: T) => T,
) => void;

export type MafsGraphProps<T extends PerseusGraphType> = {
    usesLegacyGrid?: boolean;
    onGraphChange: OnGraphChange<T>;
} & Omit<InteractiveGraphProps, "graph"> & {graph: T};
