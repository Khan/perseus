/**
 * Controlled component for selecting the question image, for answer labeling.
 */

import {bodyXsmallBold} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import FormWrappedTextField from "../../components/form-wrapped-text-field";
import {gray17} from "../../styles/global-colors";

export type SelectImageProps = {
    // Callback for when image URL is changed.
    onChange: (url: string) => void;
    // The selected image URL.
    url: string;
};

const SelectImage = ({onChange, url}: SelectImageProps): React.ReactElement => (
    <div>
        <div className={css(styles.title)}>Image</div>

        <div className={css(styles.components)}>
            <FormWrappedTextField
                placeholder="URL"
                grow={1}
                onChange={(e) => onChange(e.target.value)}
                value={url}
            />

            <div className={css(styles.spacer)} />

            <Button
                // TODO(michaelpolyak): Design calls for uploading an image from
                // the widget. This functionality already exists in
                // `perseus-one-package/item-controls.jsx`, it's not obvious if
                // it can be triggered from within the widget, or requires
                // a similar implementation locally, in which case consider
                // refactoring `perseus-admin-package/image-upload-dialog.jsx`
                // as common utility, CP-118
                disabled={!url}
                aria-label={
                    url
                        ? ""
                        : "Not implemented. Use the 'Add Image' button in " +
                          "the editor to upload image, then copy the URL here."
                }
                onClick={() => onChange("")}
                style={styles.btn}
            >
                {url ? "Remove" : "Upload"}
            </Button>
        </div>
    </div>
);

const styles = StyleSheet.create({
    title: {
        ...bodyXsmallBold,

        marginBottom: 6,

        color: gray17,
    },

    components: {
        display: "flex",
    },

    spacer: {
        width: 16,
    },

    btn: {
        minWidth: 90,
    },
});

export default SelectImage;
