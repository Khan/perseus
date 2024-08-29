import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Body} from "@khanacademy/wonder-blocks-typography";
import questionIcon from "@phosphor-icons/core/regular/question.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    children: React.ReactNode;
};

const InfoTipBase = (props: Props) => {
    return (
        <Tooltip
            content={<Body style={styles.body}>{props.children}</Body>}
            placement="right"
        >
            <PhosphorIcon
                size="small"
                icon={questionIcon}
                style={styles.spacingLeft}
            />
        </Tooltip>
    );
};

const styles = StyleSheet.create({
    spacingLeft: {
        marginInlineStart: spacing.xxxSmall_4,
    },
    body: {
        padding: spacing.medium_16,
    },
});

export default InfoTipBase;
