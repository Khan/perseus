import type {Issue} from "./components/issues-panel";
// This file is meant to contain any and all perseus-editor messages
// we want to show within the Issues Panel.
export const WARNINGS = {
    inaccessibleWidget: (widgetType: string, widgetId: string): Issue => ({
        id: `${widgetId} inaccessible`,
        description: `This ${widgetType} widget (${widgetId}) is inaccessible. Consider using an alternative to support all learners. Please check out the following documentation on compliant widget options.`,
        helpUrl:
            "https://khanacademy.atlassian.net/wiki/spaces/LC/pages/1909489691/Widget+Fundamentals",
        help: "Widget Fundamentals",
        impact: "medium",
        message:
            "Selecting inaccessible widgets for a practice item will result in this exercise being hidden from users with 'Hide visually dependant content' setting set to true. Please select another widget or create an alternative practice item.",
    }),

    genericLinterWarning: (rule: string, message: string): Issue => ({
        id: rule,
        description: message,
        help: "Learn more about best practices for authoring items",
        helpUrl:
            "https://docs.google.com/document/d/1N13f4sY-7EXWDwQ04ivA9vJBVvPPd60qjBT73B4NHuM/edit?tab=t.0",
        impact: "low",
        message: message,
    }),
};
