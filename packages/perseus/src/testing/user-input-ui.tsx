import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

import type {UserInputMap} from "@khanacademy/perseus-core";

type Props = {
    userInput: UserInputMap;
};

export default function UserInputUI({userInput}: Props) {
    return (
        <View
            style={{
                padding: `0 ${sizing.size_160} ${sizing.size_160}`,
            }}
        >
            <Heading size="medium" style={{marginTop: sizing.size_100}}>
                User Input
            </Heading>
            <ReactJson
                quotesOnKeys={false}
                enableClipboard={false}
                src={userInput}
            />
        </View>
    );
}
