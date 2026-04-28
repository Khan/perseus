import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import infoIconBold from "@phosphor-icons/core/bold/info-bold.svg";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";

interface Props {
    hasCaption: boolean;
    onClick: () => void;
}

export default function ExploreImageButton({hasCaption, onClick}: Props) {
    const context = React.useContext(PerseusI18nContext);
    if (!hasCaption) {
        return (
            <Button
                // Aria-label informs screen reader users that the button
                // provides access to the long description.
                aria-label={context.strings.imageExploreButtonAriaLabel}
                kind="secondary"
                startIcon={infoIconBold}
                onClick={onClick}
            >
                {context.strings.imageExploreButton}
            </Button>
        );
    }

    return (
        <IconButton
            aria-label={context.strings.imageExploreButtonAriaLabel}
            icon={infoIconBold}
            kind="secondary"
            onClick={onClick}
            // Stop the icon button from getting squished.
            style={{flexShrink: 0}}
        />
    );
}
