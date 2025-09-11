import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import infoIconBold from "@phosphor-icons/core/bold/info-bold.svg";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";

export default function ExploreImageButton({
    hasCaption,
    onClick,
}: {
    hasCaption: boolean;
    onClick: () => void;
}) {
    const context = React.useContext(PerseusI18nContext);
    if (!hasCaption) {
        return (
            <Button kind="secondary" startIcon={infoIconBold} onClick={onClick}>
                {context.strings.imageExploreButton}
            </Button>
        );
    }

    return (
        <IconButton
            aria-label={context.strings.imageExploreButton}
            icon={infoIconBold}
            kind="secondary"
            onClick={onClick}
        />
    );
}
