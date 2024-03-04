import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState} from "./interactive-graph-state";
import type {PerseusInteractiveGraphWidgetOptions} from "../../perseus-types";
import type {WidgetProps} from "../../types";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphWidgetOptions
>;

export type MafsGraphProps<T extends InteractiveGraphState> = {
    graphState: T;
    dispatch: (action: InteractiveGraphAction) => unknown;
};
