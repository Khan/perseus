import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import Switch from "@khanacademy/wonder-blocks-switch";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";

export const HideAnswersToggle = (props: {
    areAnswersHidden: boolean;
    onChange: React.ComponentPropsWithoutRef<typeof Switch>["onChange"];
}) => {
    // TODO(WB-1812, somewhatabstract): Migrate to Id or useId
    // eslint-disable-next-line no-restricted-syntax
    const idFactory = useUniqueIdWithMock();
    const switchId = idFactory.get("hide-answers-toggle");
    const labelId = idFactory.get("hide-answers-label");
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
