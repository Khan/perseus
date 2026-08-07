import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import questionIcon from "@phosphor-icons/core/regular/question.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    children: React.ReactNode;
};

export default function InfoTip(props: Props) {
    return (
        <Tooltip
            content={<BodyText style={styles.body}>{props.children}</BodyText>}
            placement="right"
        >
            <PhosphorIcon
                size="small"
                icon={questionIcon}
                style={styles.spacingLeft}
            />
        </Tooltip>
    );
}

const styles = StyleSheet.create({
    spacingLeft: {
        marginInlineStart: sizing.size_040,
    },
    body: {
        padding: sizing.size_160,
    },
});
