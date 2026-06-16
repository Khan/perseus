/**
 * Controlled component for selecting the question image, for answer labeling.
 */

import Button from "@khanacademy/wonder-blocks-button";
import * as React from "react";

import FormWrappedTextField from "../../components/form-wrapped-text-field";

import styles from "./select-image.module.css";

export interface SelectImageProps {
    // Callback for when image URL is changed.
    onChange: (url: string) => void;
    // The selected image URL.
    url: string;
}

const SelectImage = ({onChange, url}: SelectImageProps): React.ReactElement => (
    <div>
        <div className={styles.title}>Image</div>

        <div className={styles.imageRow}>
            <FormWrappedTextField
                placeholder="URL"
                grow={1}
                onChange={(e) => onChange(e.target.value)}
                value={url}
            />

            <Button
                disabled={!url}
                aria-label={
                    url
                        ? ""
                        : "Not implemented. Use the 'Add Image' button in " +
                          "the editor to upload image, then copy the URL here."
                }
                onClick={() => onChange("")}
                style={{minWidth: 90}}
            >
                {url ? "Remove" : "Upload"}
            </Button>
        </div>
    </div>
);

export default SelectImage;
