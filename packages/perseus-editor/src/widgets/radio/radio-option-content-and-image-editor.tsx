import {ApiOptions, Util} from "@khanacademy/perseus";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import Editor from "../../editor";

import {
    setMarkdownContentFromImageProxy,
    setImageProxyFromMarkdownContent,
} from "./utils";

type Props = {
    isNoneOfTheAbove: boolean;
    content: string;
    choiceIndex: number;
    onContentChange: (choiceIndex: number, content: string) => void;
};

export type RadioOptionContentAndImageEditorHandle = {
    focus: () => void;
};

export const RadioOptionContentAndImageEditor = React.forwardRef<
    RadioOptionContentAndImageEditorHandle,
    Props
>(function RadioOptionContentAndImageEditor(props, ref) {
    const {content, choiceIndex, onContentChange, isNoneOfTheAbove} = props;
    const uniqueId = React.useId();
    const contentTextAreaId = `${uniqueId}-content-textarea`;
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    // Expose focus method to parent components
    React.useImperativeHandle(ref, () => ({
        focus: () => {
            textAreaRef.current?.focus();
        },
    }));

    // States for updating content and images
    const [proxiedContent, setProxiedContent] = React.useState<string>("");
    const [images, setImages] = React.useState<
        {url: string; altText: string; width?: number; height?: number}[]
    >([]);

    React.useEffect(() => {
        const [proxiedContent, parsedImages] = setImageProxyFromMarkdownContent(
            content ?? "",
        );
        setProxiedContent(proxiedContent);

        // Set images immediately without dimensions so they render right away
        setImages(parsedImages);

        // Fetch dimensions for all images asynchronously,
        // to prevent image from overflowing its container in editor previews
        async function fetchAllDimensions() {
            const imagesWithDimensions = await Promise.all(
                parsedImages.map(async (image) => {
                    try {
                        const size = await Util.getImageSizeModern(image.url);
                        return {
                            ...image,
                            width: size[0],
                            height: size[1],
                        };
                    } catch (error) {
                        // If we can't get dimensions, return image without them
                        return image;
                    }
                }),
            );
            // Update images with dimensions once fetched
            setImages(imagesWithDimensions);
        }

        void fetchAllDimensions();
    }, [content]);

    // Add the image markdown at the end of the content.
    const handleAddImage = (
        choiceIndex: number,
        imageUrl: string,
        imageAltText: string,
        width?: number,
        height?: number,
    ) => {
        // Update to use an image widget and not inject markdown content.
        const newContent = `${content}\n![${imageAltText}](${imageUrl})`;
        onContentChange(choiceIndex, newContent);
    };

    const handleContentChange = (
        choiceIndex: number,
        newProxiedContent: string,
    ) => {
        setProxiedContent(newProxiedContent);

        const newContent = setMarkdownContentFromImageProxy(
            newProxiedContent,
            images,
        );
        onContentChange(choiceIndex, newContent);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const imageURL = e.clipboardData.getData("text");
        if (
            imageURL.includes("cdn.kastatic.org") ||
            imageURL.includes("graphie")
        ) {
            e.preventDefault();
            handleAddImage(choiceIndex, imageURL, "");
        }
    };

    if (isNoneOfTheAbove) {
        return (
            <>
                <HeadingXSmall tag="label" htmlFor={contentTextAreaId}>
                    Content
                </HeadingXSmall>
                <TextArea
                    id={contentTextAreaId}
                    value="None of the above"
                    disabled={true}
                    onChange={() => {}}
                    autoResize={true}
                />
            </>
        );
    }

    return (
        <>
            {/* Content textarea */}
            <HeadingXSmall
                tag="label"
                htmlFor={contentTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Content
            </HeadingXSmall>

            <Editor
                id={contentTextAreaId}
                apiOptions={ApiOptions.defaults}
                content={proxiedContent}
                widgets={{}}
                widgetEnabled={true}
                immutableWidgets={false}
                onChange={() => {
                    // Update to ensure we're updating content and widgets used.
                    handleContentChange(choiceIndex, "");
                }}
            />
            <TextArea
                id={contentTextAreaId}
                ref={textAreaRef}
                value={proxiedContent}
                placeholder="Type a choice here..."
                onChange={(value) => {
                    handleContentChange(choiceIndex, value);
                }}
                onPaste={handlePaste}
                autoResize={true}
            />
        </>
    );
});
