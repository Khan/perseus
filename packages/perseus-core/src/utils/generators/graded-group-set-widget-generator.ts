import type {GradedGroupSetWidget} from "../../data-schema";

export function generateGradedGroupSetWidget(
    gradedGroupSetWidgetProperties?: Partial<
        Omit<GradedGroupSetWidget, "type">
    >,
): GradedGroupSetWidget {
    return {
        type: "graded-group-set",
        graded: false,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "block",
        options: {gradedGroups: []},
        ...gradedGroupSetWidgetProperties,
    };
}
