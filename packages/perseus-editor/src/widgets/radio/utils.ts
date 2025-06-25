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
