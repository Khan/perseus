import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Switch from "@khanacademy/wonder-blocks-switch";
import {LabelSmall, Title} from "@khanacademy/wonder-blocks-typography";
import deviceMobile from "@phosphor-icons/core/regular/device-mobile.svg";
import textAlignLeft from "@phosphor-icons/core/regular/text-align-left.svg";
import textAlignRight from "@phosphor-icons/core/regular/text-align-right.svg";
import * as React from "react";

import {ALL_LOCALES} from "./locales";

type DebugHeaderProps = {
    title: string;
    isMobile: boolean;
    isRtl: boolean;
    locale: string;
    onToggleMobile: (isMobile: boolean) => void;
    onToggleRtl: (isRtl: boolean) => void;
    onLocaleChange: (locale: string) => void;
};

/**
 * A component that renders the header for the debug UI
 */
export const DebugHeader = ({
    title,
    isMobile,
    isRtl,
    locale,
    onToggleMobile,
    onToggleRtl,
    onLocaleChange,
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
                style={{
                    marginLeft: "auto",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    <LabelSmall>Locale</LabelSmall>
                    <select
                        value={locale}
                        onChange={(e) => onLocaleChange(e.target.value)}
                        style={{
                            width: "80px",
                            padding: "4px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "12px",
                            backgroundColor: "white",
                        }}
                    >
                        {ALL_LOCALES.map((localeCode) => (
                            <option key={localeCode} value={localeCode}>
                                {localeCode}
                            </option>
                        ))}
                    </select>
                </View>
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
