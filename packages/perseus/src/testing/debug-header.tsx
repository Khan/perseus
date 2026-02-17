import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Switch from "@khanacademy/wonder-blocks-switch";
import {Title} from "@khanacademy/wonder-blocks-typography";
import deviceMobile from "@phosphor-icons/core/regular/device-mobile.svg";
import textAlignLeft from "@phosphor-icons/core/regular/text-align-left.svg";
import textAlignRight from "@phosphor-icons/core/regular/text-align-right.svg";
import * as React from "react";

type DebugHeaderProps = {
    title: string;
    isMobile: boolean;
    isRtl: boolean;
    onToggleMobile: (isMobile: boolean) => void;
    onToggleRtl: (isRtl: boolean) => void;
};

/**
 * A component that renders the header for the debug UI
 */
export const DebugHeader = ({
    title,
    isMobile,
    isRtl,
    onToggleMobile,
    onToggleRtl,
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
            <View
                style={{marginLeft: "auto", flexDirection: "row", gap: "8px"}}
            >
                <Switch
                    icon={
                        <PhosphorIcon
                            icon={isRtl ? textAlignRight : textAlignLeft}
                        />
                    }
                    checked={isRtl}
                    onChange={onToggleRtl}
                />
                <Switch
                    icon={<PhosphorIcon icon={deviceMobile} />}
                    checked={isMobile}
                    onChange={onToggleMobile}
                />
            </View>
        </View>
    );
};
