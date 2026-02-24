import IconButton from "@khanacademy/wonder-blocks-icon-button";
import pauseIcon from "@phosphor-icons/core/fill/pause-fill.svg";
import playIcon from "@phosphor-icons/core/fill/play-fill.svg";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";

export const GifControlsIcon = ({
    isPlaying,
    onToggle,
}: {
    isPlaying: boolean;
    onToggle: () => void;
}) => {
    const strings = usePerseusI18n().strings;

    return (
        <IconButton
            icon={isPlaying ? pauseIcon : playIcon}
            kind="secondary"
            aria-label={
                isPlaying ? strings.gifPauseAriaLabel : strings.gifPlayAriaLabel
            }
            onClick={onToggle}
            // Stop the icon button from getting squished.
            style={{flexShrink: 0}}
        />
    );
};
