import {View} from "@khanacademy/wonder-blocks-core";
import {spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {
    BodyMonospace,
    LabelXSmall,
} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import Heading from "../../../components/heading";

type Props = {
    id: string;
    equationString: string;
    children: React.ReactNode;
};
export function InteractiveGraphCorrectAnswer(props: Props) {
    return (
        <>
            <Heading
                title="Correct Answer"
                isOpen={true}
                isCollapsible={false}
            />
            <View id={props.id}>
                <View>
                    <LabelXSmall
                        style={{
                            paddingTop: spacing.xxSmall_6,
                            paddingBottom: spacing.xxSmall_6,
                            color: semanticColor.core.foreground.neutral.subtle,
                        }}
                    >
                        Graph the correct answer in the graph below and ensure
                        the equation or point coordinates displayed represent
                        the correct answer.
                    </LabelXSmall>

                    <BodyMonospace
                        style={{
                            fontSize: 12,
                            backgroundColor: "#eee",
                            paddingInline: spacing.xxSmall_6,
                            borderColor: "#ccc",
                            borderStyle: "solid",
                            borderWidth: 1,
                        }}
                    >
                        {props.equationString}
                    </BodyMonospace>
                </View>
                {props.children}
            </View>
        </>
    );
}
