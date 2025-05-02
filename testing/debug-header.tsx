import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Switch from "@khanacademy/wonder-blocks-switch";
import {Title} from "@khanacademy/wonder-blocks-typography";
import deviceMobile from "@phosphor-icons/core/regular/device-mobile.svg";
import * as React from "react";

type DebugHeaderProps = {
    title: string;
    isMobile: boolean;
    onToggleMobile: (isMobile: boolean) => void;
};

/**
 * A component that renders the header for the debug UI
 */
export const DebugHeader = ({
    title,
    isMobile,
    onToggleMobile,
}: DebugHeaderProps): React.ReactElement => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Title>{title}</Title>
            <View style={{marginLeft: "auto"}}>
                <Switch
                    icon={<PhosphorIcon icon={deviceMobile} />}
                    checked={isMobile}
                    onChange={onToggleMobile}
                />
            </View>
        </View>
    );
};
