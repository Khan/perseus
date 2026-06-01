import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {usePerseusI18n} from "./i18n-context";
import {ZoomedImageView} from "./zoomed-image-view";

import type {Props as SvgImageProps} from "./svg-image";

interface Props extends SvgImageProps {
    imgSrc: string;

    // width and height are optional in SVGImageProps,
    // but they are required here.
    width: number;
    height: number;
}

export const ZoomImageButton = (props: Props) => {
    const {imgSrc} = props;

    const i18n = usePerseusI18n();
    // Remove the colons from the React-generated unique ID so that it
    // can be used as ModalLauncher's initialFocusId. ModalLauncher uses
    // querySelector to find the element to focus, and unescaped colons
    // are treated as pseudo-class selectors in CSS, causing an error.
    const uniqueId = React.useId().replace(/:/g, "");
    const zoomedImageUniqueId = `zoomed-image-${uniqueId}`;

    // Check for "Command + Click" or "Control + Click" to open the image
    // in a new tab. This feature was part of the old zoom service, so
    // we're adding it here to keep the behavior consistent.
    const handleClick = (
        event: React.SyntheticEvent<Element>,
        openModal: () => void,
    ) => {
        // eslint-disable-next-line no-restricted-syntax
        const mouseEvent = event as React.MouseEvent;
        if (mouseEvent.metaKey || mouseEvent.ctrlKey) {
            window.open(imgSrc, "_blank");
        } else {
            openModal();
        }
    };

    return (
        <ModalLauncher
            initialFocusId={zoomedImageUniqueId}
            modal={({closeModal}) => (
                <ZoomedImageView
                    {...props}
                    initialFocusId={zoomedImageUniqueId}
                    onClose={closeModal}
                />
            )}
        >
            {({openModal}) => (
                <Clickable
                    aria-label={i18n.strings.imageZoomAriaLabel}
                    onClick={(event) => handleClick(event, openModal)}
                    // TODO(LEMS-3686): Use CSS modules after Wonder Blocks
                    // supports it instead of inline styles.
                    style={{
                        // Overlay the button over the image.
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        cursor: "zoom-in",
                    }}
                >
                    {() => {
                        return <React.Fragment />;
                    }}
                </Clickable>
            )}
        </ModalLauncher>
    );
};
