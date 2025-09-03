import {components, Util} from "@khanacademy/perseus";
import Banner from "@khanacademy/wonder-blocks-banner";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import React from "react";

import styles from "./image-editor.module.css";

import type {Props} from "./image-editor";

const {InfoTip} = components;

// Match any image URL (including "web+graphie" links) that is hosted by KA.
// We're somewhat generous in our AWS URL matching
// ("ka-<something>.s3.amazonaws.com") so that we don't have to update Perseus
// every time we add a new proxied AWS bucket.
const INTERNALLY_HOSTED_DOMAINS =
    "(" +
    "ka-.*.s3.amazonaws.com|" +
    "(fastly|cdn).kastatic.org|" +
    "khanacademy.org|" +
    "kasandbox.org" +
    ")";
const INTERNALLY_HOSTED_URL_RE = new RegExp(
    "^(https?|web\\+graphie)://[^/]*" + INTERNALLY_HOSTED_DOMAINS,
);

export default function ImageUrlInput({backgroundImage, onChange}: Props) {
    const uniqueId = React.useId();
    const urlId = `${uniqueId}-url`;

    const [urlFieldValue, setUrlFieldValue] = React.useState<string>(
        backgroundImage.url || "",
    );
    const [backgroundImageError, setBackgroundImageError] = React.useState<
        string | null
    >(null);

    function setUrl(url: string, width: number, height: number) {
        const image = {...backgroundImage};

        image.url = url;
        image.width = width;
        image.height = height;
        const box = [image.width, image.height] satisfies [number, number];
        onChange({
            backgroundImage: image,
            box: box,
        });
    }

    async function onUrlChange(url: string) {
        // Don't try to load the image if there is no URL.
        if (!url) {
            setBackgroundImageError(null);
            setUrl(url, 0, 0);
            return;
        }

        // Require the image to be hosted by Khan Academy.
        if (url && !INTERNALLY_HOSTED_URL_RE.test(url)) {
            setBackgroundImageError(
                "Images must be from sites hosted by Khan Academy. " +
                    "Please input a Khan Academy-owned address, or use the " +
                    "Add Image tool to rehost an existing image",
            );
            return;
        }

        // Clear previous errors
        setBackgroundImageError(null);

        // Try to load the image.
        try {
            const size = await Util.getImageSizeModern(url);
            setUrl(url, size[0], size[1]);
        } catch (error) {
            setBackgroundImageError(
                `There was an error loading the image URL: ${JSON.stringify(
                    error,
                    null,
                    2,
                )}`,
            );
        }
    }

    return (
        <>
            <div className={styles.labelWithInfoTip}>
                <HeadingXSmall tag="label" htmlFor={urlId}>
                    Image url:
                </HeadingXSmall>
                <InfoTip>Paste an image or graphie image URL.</InfoTip>
            </div>

            {backgroundImageError && (
                <Banner
                    kind="critical"
                    layout="floating"
                    text={backgroundImageError}
                />
            )}

            <TextField
                id={urlId}
                value={urlFieldValue}
                onBlur={(e) => onUrlChange(e.target.value)}
                onChange={(value) => setUrlFieldValue(value)}
                style={{
                    // TODO: Use CSS modules after Wonder Blocks styles
                    // are moved to a different layer.
                    marginBlockStart: sizing.size_040,
                    marginBlockEnd: sizing.size_080,
                }}
            />
        </>
    );
}
