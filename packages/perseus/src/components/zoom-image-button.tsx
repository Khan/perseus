import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {usePerseusI18n} from "./i18n-context";
import {ZoomedImageView} from "./zoomed-image-view";

type Props = {
    imgElement: React.ReactNode;
    imgSrc: string;
    width?: number;
    height?: number;
};

export const ZoomImageButton = ({imgElement, imgSrc, width, height}: Props) => {
    const i18n = usePerseusI18n();

    return (
        <ModalLauncher
            modal={({closeModal}) =>
                ZoomedImageView({
                    imgElement,
                    imgSrc,
                    onClose: closeModal,
                })
            }
        >
            {({openModal}) => (
                <Clickable
                    aria-label={i18n.strings.imageZoomAriaLabel}
                    onClick={openModal}
                    // TODO(LEMS-3686): Use CSS modules after Wonder Blocks
                    // supports it instead of inline styles.
                    style={{
                        // Overlay the button over the image.
                        position: "absolute",
                        width: width ?? "100%",
                        height: height,
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
