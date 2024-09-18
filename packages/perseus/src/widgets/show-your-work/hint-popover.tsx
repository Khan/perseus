import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {Hint} from "./hint";
import {KhanmigoIcon} from "./khanmigo-icon";

import type {Step as SolverStep} from "@math-blocks/solver";

type Props = {
    onShowMeHow: () => void;
    hint: SolverStep;
};

export const HintPopover = ({hint, onShowMeHow}: Props) => {
    return (
        <PopoverContentCore
            closeButtonVisible={true}
            style={styles.popupContent}
        >
            <View style={{flexDirection: "row"}}>
                <KhanmigoIcon style={{marginRight: 4}} />
                <LabelMedium>See if these hints help.</LabelMedium>
            </View>
            <View style={styles.hintContainer}>
                {hint && <Hint hint={hint} level={0} />}
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
                    <KhanmigoIcon style={{marginRight: 4}} />
                    <LabelMedium>If not</LabelMedium>
                </View>
                <Button
                    kind="secondary"
                    size="small"
                    onClick={onShowMeHow}
                    style={{marginLeft: 8}}
                >
                    Show me how
                </Button>
            </View>
        </PopoverContentCore>
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
