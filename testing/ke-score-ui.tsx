import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
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
            style={{
                padding: `0 ${sizing.size_160} ${sizing.size_160}`,
            }}
        >
            <HeadingSmall style={{marginTop: sizing.size_100}}>
                Guess
            </HeadingSmall>
            <ReactJson
                quotesOnKeys={false}
                enableClipboard={false}
                src={score.guess}
            />
        </View>
    );
}
