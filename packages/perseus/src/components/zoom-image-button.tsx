import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {usePerseusI18n} from "./i18n-context";
import {ZoomedImageView} from "./zoomed-image-view";

type Props = {
    imgElement: React.ReactNode;
    imgSrc: string;
    width: number;
    height: number;
};

export const ZoomImageButton = ({imgElement, imgSrc, width, height}: Props) => {
    const i18n = usePerseusI18n();

    // Check for "Command + Click" or "Control + Click" to open the image
    // in a new tab. This feature was part of the old zoom service, so
    // we're adding it here to keep the behavior consistent.
    const handleClick = (
        event: React.SyntheticEvent<Element>,
        openModal: () => void,
    ) => {
        const mouseEvent = event as React.MouseEvent;
        if (mouseEvent.metaKey || mouseEvent.ctrlKey) {
            window.open(imgSrc, "_blank");
        } else {
            openModal();
        }
    };

    return (
        <ModalLauncher
            modal={({closeModal}) => (
                <ZoomedImageView
                    imgElement={imgElement}
                    width={width}
                    height={height}
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
