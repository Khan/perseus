import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {Hint} from "./hint";
import {KhanmigoIcon} from "./khanmigo-icon";
import {Mistakes} from "./mistakes";
import {print} from "./printer";
import {getHint, showMeHow} from "./tutor";

import type {Step} from "./step";
import type {ShowYourWorkProblem} from "../../perseus-types";
import type {Expression} from "../expression";

type Props = {
    children: React.ReactElement<any>;
    expressionRef: React.MutableRefObject<Expression | null>;
    currStep: Step;
    prevStep: Step;
    problem: ShowYourWorkProblem;
    opened: boolean;
    onClose: () => void;
    onCheckStep: (tutor: boolean) => void;
};

const HintWrapper = ({
    problem,
    prevStep,
}: {
    problem: ShowYourWorkProblem;
    prevStep: Step;
}) => {
    const hint = React.useMemo(() => {
        return getHint(problem, prevStep.value);
    }, [problem, prevStep.value]);

    return <Hint hint={hint} level={0} />;
};

export const HelpPopover = ({
    children,
    expressionRef,
    opened,
    onClose,
    onCheckStep,
    problem,
    prevStep,
    currStep,
}: Props) => {
    let content: React.ReactNode = null;

    if (currStep.status === "wrong") {
        content = (
            <Mistakes
                expressionRef={expressionRef}
                currStep={currStep}
                prevStep={prevStep}
                problem={problem}
                onCheckStep={onCheckStep}
            />
        );
    } else {
        const handleShowMeHow = () => {
            const nextStep = showMeHow(problem, prevStep.value);
            if (expressionRef.current) {
                expressionRef.current.setInputValue("", print(nextStep), () => {
                    onCheckStep(true);
                });
            }
        };

        content = (
            <>
                <View style={{flexDirection: "row"}}>
                    <KhanmigoIcon size={32} style={{marginRight: 4}} />
                    <LabelMedium>See if these hints help.</LabelMedium>
                </View>
                <View style={styles.hintContainer}>
                    <HintWrapper prevStep={prevStep} problem={problem} />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "end",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            position: "relative",
                            top: 4,
                        }}
                    >
                        <KhanmigoIcon size={32} style={{marginRight: 4}} />
                        <LabelMedium>If not</LabelMedium>
                    </View>
                    <Button
                        kind="secondary"
                        size="small"
                        onClick={handleShowMeHow}
                        style={{marginLeft: 8}}
                    >
                        Show me how
                    </Button>
                </View>
            </>
        );
    }

    return (
        <Popover
            opened={opened}
            placement="right"
            onClose={onClose}
            content={
                <PopoverContentCore
                    closeButtonVisible={true}
                    style={styles.popupContent}
                >
                    {content}
                </PopoverContentCore>
            }
        >
            {children}
        </Popover>
    );
};

const styles = StyleSheet.create({
    popupContent: {
        width: 320,
        maxWidth: 320,
    },
    hintContainer: {
        marginBottom: 24,
        // maxHeight: 400,
        // overflowY: "scroll",
    },
});
