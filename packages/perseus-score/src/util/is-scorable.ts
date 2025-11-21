import {getWidgetScorer} from "../widgets/widget-registry";

/**
 * Returns true if the widget type can be scored for correctness.
 * A widget is scorable if it has a scoring function registered.
 */
export function isScorable(type: string): boolean {
    return getWidgetScorer(type) !== null;
}
