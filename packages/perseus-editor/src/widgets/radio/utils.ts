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

export function setNiceContentAndImages(
    content: string,
): [string, {url: string; altText: string}[]] {
    // Replace the hard-to-read image markdown with a nice placeholder
    // ex. "![abc](https://...) -> "![Image 1]"

    let newContent: string = "";
    const images: {url: string; altText: string}[] = [];

    let isInImageAltText = false;
    let isInImageUrl = false;
    let imageIndex = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content[i];

        // Start of an image
        if (char === "!" && i < content.length - 1 && content[i + 1] === "[") {
            isInImageAltText = true;
            newContent += "!";
            i++; // Skip the next character (the "[")
            images.push({altText: "", url: ""});
            continue;
        }

        // End of the image alt text (start of the image URL)
        if (char === "]" && isInImageAltText) {
            isInImageAltText = false;
            isInImageUrl = true;
            newContent += `[Image ${imageIndex + 1}]`;
            i++; // Skip the next character (the "(")
            continue;
        }

        // Save the alt text char while traversing the alt text
        if (isInImageAltText) {
            images[imageIndex].altText += char;
            continue;
        }

        // End of the image url
        if (isInImageUrl && char === ")") {
            isInImageUrl = false;
            imageIndex++;
            continue;
        }

        // Save the url char while traversing the url
        if (isInImageUrl) {
            images[imageIndex].url += char;
            continue;
        }

        // Save the non-image chars
        if (!isInImageAltText && !isInImageUrl) {
            newContent += char;
        }
    }

    return [newContent, images];
}

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
