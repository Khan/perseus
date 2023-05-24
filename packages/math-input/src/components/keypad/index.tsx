import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Key from "../../data/keys";
import {ClickKeyCallback} from "../../types";
import Tabbar from "../tabbar/tabbar";
import {TabbarItemType} from "../tabbar/types";

import ExtrasPage from "./extras-page";
import GeometryPage from "./geometry-page";
import NumbersPage from "./numbers-page";
import {NumbersPageOptions} from "./numbers-page/types";
import OperatorsPage from "./operators-page";
import {OperatorsButtonSets} from "./operators-page/types";

export type Props = {
    onClickKey: ClickKeyCallback;
    trigonometry?: boolean;
    extraKeys: ReadonlyArray<Key>;
} & OperatorsButtonSets &
    NumbersPageOptions;

type State = {
    selectedPage: TabbarItemType;
};

type DefaultProps = {
    extraKeys: Props["extraKeys"];
};

function allPages(props: Props): ReadonlyArray<TabbarItemType> {
    const pages: Array<TabbarItemType> = ["Numbers"];

    if (props.extraKeys?.length) {
        pages.push("Extras");
    }

    if (
        // OperatorsButtonSets
        props.preAlgebra ||
        props.logarithms ||
        props.basicRelations ||
        props.advancedRelations
    ) {
        pages.push("Operators");
    }

    if (props.trigonometry) {
        pages.push("Geometry");
    }

    return pages;
}

export default class Keypad extends React.Component<Props, State> {
    state: State = {
        selectedPage: "Numbers",
    };

    static defaultProps: DefaultProps = {
        extraKeys: [],
    };

    render(): React.ReactNode {
        const {selectedPage} = this.state;

        const availablePages = allPages(this.props);

        return (
            <View>
                <Tabbar
                    items={availablePages}
                    selectedItem={selectedPage}
                    onSelectItem={(tabbarItem: TabbarItemType) => {
                        this.setState({selectedPage: tabbarItem});
                    }}
                    style={styles.tabbar}
                />
                {selectedPage === "Numbers" && <NumbersPage {...this.props} />}
                {selectedPage === "Extras" && <ExtrasPage {...this.props} />}
                {selectedPage === "Operators" && (
                    <OperatorsPage {...this.props} />
                )}
                {selectedPage === "Geometry" && (
                    <GeometryPage {...this.props} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabbar: {
        background: Color.white,
    },
});
