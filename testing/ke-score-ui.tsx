import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

import type {KEScore} from "@khanacademy/perseus-core";

type Props = {
    score: KEScore | null | undefined;
};

export default function KEScoreUI({score}: Props) {
    if (score == null) {
        return null;
    }

    return (
        <View
            style={{padding: `0 ${spacing.medium_16}px ${spacing.medium_16}px`}}
        >
            <HeadingSmall style={{marginTop: "10px"}}>Guess</HeadingSmall>
            <ReactJson
                quotesOnKeys={false}
                enableClipboard={false}
                src={score.guess}
            />
            <HeadingSmall style={{marginTop: "10px"}}>State</HeadingSmall>
            <ReactJson
                quotesOnKeys={false}
                enableClipboard={false}
                src={score.state}
            />
        </View>
    );
}
