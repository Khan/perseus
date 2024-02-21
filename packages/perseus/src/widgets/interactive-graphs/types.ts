import type {PerseusGraphTypeCommon} from "../../perseus-types";
import type {InteractiveGraphProps} from "../interactive-mafs";

export type MafsGraphProps<T extends PerseusGraphTypeCommon> = {
    usesLegacyBackgoundImage?: boolean;
} & Omit<InteractiveGraphProps, "graph"> & {graph: T};
