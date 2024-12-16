import {View} from "@khanacademy/wonder-blocks-core";
import Switch from "@khanacademy/wonder-blocks-switch";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useId} from "react";

import {usePerseusI18n} from "../../components/i18n-context";

export const HideAnswersToggle = (props: {
    areAnswersHidden: boolean;
    onChange: React.ComponentPropsWithoutRef<typeof Switch>["onChange"];
}) => {
    const switchId = useId();
    const labelId = useId();
    const {strings} = usePerseusI18n();
    return (
        <View style={styles.switchWrapper}>
            <Switch
                id={switchId}
                checked={props.areAnswersHidden}
                onChange={props.onChange}
                aria-labelledby={labelId}
            />
            <LabelMedium id={labelId} htmlFor={switchId} tag="label">
                {strings.hideAnswersToggleLabel}
            </LabelMedium>
        </View>
    );
};

const styles = StyleSheet.create({
    switchWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap-reverse",
        alignItems: "center",
        gap: "0.5em",
        marginTop: "1em",
    },
});
