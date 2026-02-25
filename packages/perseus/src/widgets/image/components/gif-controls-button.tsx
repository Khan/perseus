import Button from "@khanacademy/wonder-blocks-button";
import pauseIcon from "@phosphor-icons/core/fill/pause-fill.svg";
import playIcon from "@phosphor-icons/core/fill/play-fill.svg";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";

export const GifControlsButton = ({
    isPlaying,
    onToggle,
}: {
    isPlaying: boolean;
    onToggle: () => void;
}) => {
    const strings = usePerseusI18n().strings;

    return (
        <Button
            kind="secondary"
            startIcon={isPlaying ? pauseIcon : playIcon}
            onClick={onToggle}
            // As per the design, the button should be a smaller width,
            // rather than taking up the full width of the container.
            style={{width: "fit-content"}}
        >
            {isPlaying ? strings.gifPauseButton : strings.gifPlayButton}
        </Button>
    );
};
