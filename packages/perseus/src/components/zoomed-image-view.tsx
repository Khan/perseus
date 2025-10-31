import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ModalDialog, ModalPanel} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {usePerseusI18n} from "./i18n-context";
import styles from "./zoomed-image-view.module.css";

type Props = {
    imgElement: React.ReactNode;
    imgSrc: string;
    onClose: () => void;
};

export const ZoomedImageView = ({imgElement, imgSrc, onClose}: Props) => {
    const i18n = usePerseusI18n();
    // Check for "Command + Click" or "Control + Click" to open the image
    // in a new tab. This feature was part of the old zoom service, so
    // we're adding it here to keep the behavior consistent.
    const handleClick = (event: React.SyntheticEvent<Element>) => {
        const mouseEvent = event as React.MouseEvent;
        if (mouseEvent.metaKey || mouseEvent.ctrlKey) {
            window.open(imgSrc, "_blank");
        } else {
            onClose();
        }
    };

    return (
        <ModalDialog
            // aria-labelledby is a required prop for ModalDialog, but there
            // is no title for the modal. Since there is no element within
            // this modal for it to be labeled by, we pass an empty string.
            aria-labelledby=""
            style={{
                width: "auto",
                height: "auto",
                // Add padding so that the image doesn't touch the
                // edges of the screen.
                padding: sizing.size_320,
            }}
        >
            <ModalPanel
                closeButtonVisible={false}
                content={
                    <div className={styles.contentWrapper}>
                        <Clickable
                            onClick={handleClick}
                            aria-label={i18n.strings.imageResetZoomAriaLabel}
                            style={{
                                cursor: "zoom-out",
                            }}
                        >
                            {() => imgElement}
                        </Clickable>
                    </div>
                }
            />
        </ModalDialog>
    );
};
