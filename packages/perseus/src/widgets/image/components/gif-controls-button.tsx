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
            // While this might look redundant, it is important to define the
            // aria-label for this button so when the aria-label dynamically
            // changes based on the state it is communicated to assistive
            // technologies. As most screen readers will not announce for
            // changes in content, but might for changes in the aria-label.
            // Reference: https://sarahmhigley.com/writing/playing-with-state/
            aria-label={
                isPlaying
                    ? strings.gifPauseButtonLabel
                    : strings.gifPlayButtonLabel
            }
            kind="secondary"
            startIcon={isPlaying ? pauseIcon : playIcon}
            onClick={onToggle}
            // As per the design, the button should be a smaller width,
            // rather than taking up the full width of the container.
            style={{width: "fit-content"}}
        >
            {isPlaying
                ? strings.gifPauseButtonLabel
                : strings.gifPlayButtonLabel}
        </Button>
    );
};
