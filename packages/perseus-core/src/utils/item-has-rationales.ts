import type {
    LabelImageWidget,
    PerseusItem,
    PerseusWidget,
    PerseusWidgetsMap,
    RadioWidget,
} from "../data-schema";

/**
 * Returns true if a Perseus item contains any widget with rationales.
 */
export const itemHasRationales = (item: PerseusItem) =>
    widgetsHaveRationales(item.question.widgets);

const widgetsHaveRationales = (widgets: PerseusWidgetsMap) =>
    Object.values(widgets).some(widgetHasRationales);

const widgetHasRationales = (widget: PerseusWidget): boolean => {
    switch (widget.type) {
        case "radio":
            return radioWidgetHasRationales(widget);
        case "label-image":
            return labelImageWidgetHasRationales(widget);
        case "graded-group":
        case "group":
            return widgetsHaveRationales(widget.options.widgets);
        default:
            return false;
    }
};

const radioWidgetHasRationales = (widget: RadioWidget): boolean => {
    return widget.options.choices.some((choice) => !!choice.rationale);
};

const labelImageWidgetHasRationales = (widget: LabelImageWidget): boolean => {
    return widget.options.markers.some((marker) => marker.answers.length > 0);
};
