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
