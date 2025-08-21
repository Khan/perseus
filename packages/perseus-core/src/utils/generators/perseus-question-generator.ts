import type {PerseusRenderer} from "../../data-schema";

function generateDefaultContent(
    questionProperties: Partial<PerseusRenderer>,
): string {
    const {widgets} = questionProperties;
    if (!widgets) {
        return "";
    }

    let content = "";
    const widgetTypes = Object.keys(widgets);
    for (let i = 0; i < widgetTypes.length; i++) {
        const widgetType = widgetTypes[i];
        content += `[[☃ ${widgetType}]]\n`;
    }
    return content;
}

export function generateQuestion(
    questionProperties: Partial<PerseusRenderer>,
): PerseusRenderer {
    return {
        // Generate the content with the snowmen so that we don't have to
        // manually put in snowmen every time we generate a question.
        content: generateDefaultContent(questionProperties),
        images: {},
        widgets: {},
        ...questionProperties,
    };
}
