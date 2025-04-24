export const WARNINGS = {
    inaccessibleWidget: (widgetType: string) => ({
        id: `${widgetType} inaccessible`,
        description: `This ${widgetType} widget is marked as inaccessible. Consider using an alternative to support all learners. Please checkout the following documentation on compliant widget options.`,
        helpUrl:
            "https://khanacademy.atlassian.net/wiki/spaces/LC/pages/1909489691/Widget+Fundamentals",
        help: "Widget Fundamentals",
        impact: "Medium",
        message:
            "Selecting inaccessible widgets for a practice item will result in this exercise being hidden from users with 'Hide visually dependant content' setting set to true. Please select another widget or create an alternative practice item.",
    }),
};
