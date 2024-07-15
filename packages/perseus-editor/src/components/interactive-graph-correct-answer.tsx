import * as perseus from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import LabeledRow from "./graph-locked-figures/labeled-row";
import Heading from "./heading";

const {InfoTip} = perseus.components;

type Props = {
    equationString: string;
    children: React.ReactNode;
};
export function InteractiveGraphCorrectAnswer(props: Props) {
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
        <>
            <Heading
                title="Correct Answer"
                isOpen={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
            />
            {isExpanded && (
                <View>
                    <LabeledRow label="Correct answer:">
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
                        <InfoTip>
                            <p>
                                Graph the correct answer in the graph below and
                                ensure the equation or point coordinates
                                displayed represent the correct answer.
                            </p>
                        </InfoTip>
                    </LabeledRow>
                    {props.children}
                </View>
            )}
        </>
    );
}
