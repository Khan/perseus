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

// Take the hard-to-read image markdown, and replace
// it with an easy-to-read proxy.
// ex. "![abc](https://...) -> "![Image 1]"
export function setImageProxyFromMarkdownContent(
    markdownContent: string,
): [string, {url: string; altText: string}[]] {
    const images: {url: string; altText: string}[] = [];

    // Parse the markdown content using perseus-markdown.
    const parsedMarkdown = PerseusMarkdown.parse(markdownContent, {});

    // Find all image nodes in the parsed tree.
    PerseusMarkdown.traverseContent(parsedMarkdown, (node: any) => {
        if (node.type === "image") {
            images.push({
                url: node.target || "",
                altText: node.alt || "",
            });
        }
    });

    // Replace images with easy-to-read proxies
    let proxiedContent = markdownContent;
    images.forEach((image, index) => {
        // Build the original markdown pattern to replace
        const originalPattern = `![${image.altText}](${image.url})`;
        const replacement = `![Image ${index + 1}]`;

        // Replace only the first occurrence to handle identical images correctly
        const patternIndex = proxiedContent.indexOf(originalPattern);
        if (patternIndex !== -1) {
            proxiedContent =
                proxiedContent.substring(0, patternIndex) +
                replacement +
                proxiedContent.substring(patternIndex + originalPattern.length);
        }
    });

    return [proxiedContent, images];
}

// Take proxied content, and replace it with how the original markdown
// content would be saved.
// ex. "![Image 1]" -> "![URL](alt text)"
export function setMarkdownContentFromImageProxy(
    proxiedContent: string,
    images: {url: string; altText: string}[],
) {
    let markdownContent = proxiedContent;
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        markdownContent = markdownContent.replace(
            `![Image ${i + 1}]`,
            `![${image.altText}](${image.url})`,
        );
    }

    return markdownContent;
}

/**
 * Given a known aspect ratio, and a new side length,
 * return the other side length that maintains the aspect ratio.
 *
 * Ratio math: x/y = x'/y'
 *    newWidth/newHeight = width/height
 * => newWidth = (newHeight * width) / height
 * or
 *    newHeight/newWidth = height/width
 * => newHeight = (newWidth * height) / width
 */
export function getOtherSideLengthWithPreservedAspectRatio(
    sideLength: number,
    otherSideLength: number,
    newSideLength: number,
): number {
    // Don't allow dividing by zero.
    if (sideLength === 0) {
        return NaN;
    }

    // Disallow setting image dimensions to zero in order to avoid
    // the image dimensions no longer being preserved.
    // (If one side gets changed to 0, so does the other one, and then
    // we don't know what the original aspect ratio was anymore.)
    if (newSideLength === 0 || otherSideLength === 0) {
        return NaN;
    }

    return (newSideLength * otherSideLength) / sideLength;
}
