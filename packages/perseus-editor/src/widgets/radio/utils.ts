import {PerseusMarkdown} from "@khanacademy/perseus";

import type {ChoiceMovementType} from "./radio-option-settings-actions";
import type {PerseusRadioChoice} from "@khanacademy/perseus-core";

export function getMovedChoices(
    choices: PerseusRadioChoice[],
    hasNoneOfTheAbove: boolean,
    choiceIndex: number,
    movement: ChoiceMovementType,
): PerseusRadioChoice[] {
    const newChoices = [...choices];
    const [removedChoice] = newChoices.splice(choiceIndex, 1);

    switch (movement) {
        case "top":
            // No need to move the first choice to the top since it's already there.
            if (choiceIndex === 0) {
                return choices;
            }

            // Move the removed choice to the beginning/top of the array.
            newChoices.unshift(removedChoice);
            break;
        case "up":
            // No need to move the first choice up since it's already at the top.
            if (choiceIndex === 0) {
                return choices;
            }

            // Move the removed choice to the position before its current index.
            newChoices.splice(choiceIndex - 1, 0, removedChoice);
            break;
        case "down":
            // No need to move the last choice down since it's already at the bottom.
            if (choiceIndex === choices.length - 1) {
                return choices;
            }

            // If the current choice is the second to last choice and the
            // last choice is "None of the above", we don't want to move
            // the current choice down. Keep the "None of the above" choice
            // as the last choice.
            if (choiceIndex === choices.length - 2 && hasNoneOfTheAbove) {
                return choices;
            }

            // Move the removed choice to the position after its current index.
            newChoices.splice(choiceIndex + 1, 0, removedChoice);
            break;
        case "bottom":
            // No need to move the last choice to the bottom since it's already there.
            if (choiceIndex === choices.length - 1) {
                return choices;
            }

            // If the last choice is "None of the above", we don't want to move
            // the current choice to the bottom. Keep the "None of the above"
            // choice as the last choice, and move the current choice to the
            // second to last position.
            if (hasNoneOfTheAbove) {
                const removedNoneOfTheAbove = newChoices.pop();
                newChoices.push(removedChoice);

                if (removedNoneOfTheAbove) {
                    newChoices.push(removedNoneOfTheAbove);
                }
            } else {
                newChoices.push(removedChoice);
            }
            break;
    }

    return newChoices;
}

// Take the hard-to-read image markdown, and replace it with a nice placeholder.
// ex. "![abc](https://...) -> "![Image 1]"
export function setNiceContentAndImages(
    content: string,
): [string, {url: string; altText: string}[]] {
    const images: {url: string; altText: string}[] = [];

    // Parse the markdown content using perseus-markdown.
    const parsedMarkdown = PerseusMarkdown.parse(content, {});

    // Find all image nodes in the parsed tree.
    PerseusMarkdown.traverseContent(parsedMarkdown, (node: any) => {
        if (node.type === "image") {
            images.push({
                url: node.target || "",
                altText: node.alt || "",
            });
        }
    });

    // Replace images with nice placeholders
    let newContent = content;
    images.forEach((image, index) => {
        // Build the original markdown pattern to replace
        const originalPattern = `![${image.altText}](${image.url})`;
        const replacement = `![Image ${index + 1}]`;

        // Replace only the first occurrence to handle identical images correctly
        const patternIndex = newContent.indexOf(originalPattern);
        if (patternIndex !== -1) {
            newContent =
                newContent.substring(0, patternIndex) +
                replacement +
                newContent.substring(patternIndex + originalPattern.length);
        }
    });

    return [newContent, images];
}

// Take already nice content, and replace it with how the original content
// would be saved.
// ex. "![Image 1]" -> "![URL](alt text)"
export function setContentFromNiceContentAndImages(
    niceContent: string,
    images: {url: string; altText: string}[],
) {
    let newContent = niceContent;
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        newContent = newContent.replace(
            `![Image ${i + 1}]`,
            `![${image.altText}](${image.url})`,
        );
    }

    return newContent;
}
