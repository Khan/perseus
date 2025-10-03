import {PerseusMarkdown} from "@khanacademy/perseus";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

type IssueCta = {
    label: string;
    onClick: () => void;
};

export function convertImageMarkdownToImageWidget(
    question: PerseusRenderer,
    onEditorChange: (newProps: any) => void,
) {
    // Parse the question
    const parsedQuestion = PerseusMarkdown.parse(question.content, {});
    let newContent = "";

    // Helper function to process nodes recursively
    const processNode = (node: any) => {
        if (node.type === "image") {
            // Replace the image node with an image widget - the image
            // widget number becomes the first free number available amongst
            // all image widgets in the question.
            newContent += "image";
        } else if (node.type === "text") {
            // For text nodes, add the content directly
            newContent += node.content;
        } else if (node.type === "widget") {
            // For widget nodes, preserve them in the output
            newContent += `[[☃ ${node.id}]]`;
        } else if (node.content && Array.isArray(node.content)) {
            // For container nodes (like paragraphs), process their children
            node.content.forEach(processNode);
        }
    };

    // Process all top-level nodes
    parsedQuestion.forEach(processNode);

    onEditorChange({
        content: newContent,
    });
}

export function getAllCtasMap(
    question: PerseusRenderer,
    onEditorChange: (newProps: any) => void,
): Record<string, IssueCta> {
    return {
        "image-markdown": {
            label: "Convert all image markdown to image widget",
            onClick: () =>
                convertImageMarkdownToImageWidget(question, onEditorChange),
        },
    };
}
