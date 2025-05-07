import type {
    GradedGroupWidget,
    GroupWidget,
    LabelImageWidget,
    PerseusItem,
    PerseusWidget,
    RadioWidget,
} from "../data-schema";

/**
 * Returns true if a Perseus item contains any widget with rationales.
 */
export const itemHasRationales = (item: PerseusItem) =>
    Object.values(item.question.widgets).some(widgetHasRationales);

const widgetHasRationales = (widget: PerseusWidget) => {
    switch (widget.type) {
        case "radio":
            return radioWidgetHasRationales(widget);
        case "label-image":
            return labelImageWidgetHasRationales(widget);
        case "graded-group":
            return gradedGroupWidgetHasRationales(widget);
        case "group":
            return groupWidgetHasRationales(widget);
        default:
            return false;
    }
};

const radioWidgetHasRationales = (widget: RadioWidget): boolean => {
    return widget.options.choices.some((choice) => !!choice.clue);
};

const labelImageWidgetHasRationales = (widget: LabelImageWidget): boolean => {
    return widget.options.markers.some((marker) => marker.answers.length > 0);
};

const gradedGroupWidgetHasRationales = (widget: GradedGroupWidget): boolean => {
    return Object.values(widget.options.widgets).some(widgetHasRationales);
};

const groupWidgetHasRationales = (widget: GroupWidget): boolean => {
    return Object.values(widget.options.widgets).some(widgetHasRationales);
};
