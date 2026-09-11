import Banner from "@khanacademy/wonder-blocks-banner";
import warningOctagonIcon from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import * as React from "react";

type Props = {
    type: string;
};

export const UnregisteredWidgetNotice = ({type}: Props): React.ReactNode => (
    <Banner
        kind="warning"
        icon={warningOctagonIcon}
        text={
            <>
                Widget <code>{type}</code> is not registered. Add it to this
                story's decorator.
            </>
        }
    />
);
