import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Key from "../../data/keys";
import Tabbar from "../tabbar/tabbar";

import GeometryPage from "./geometry-page";
import NumbersPage from "./numbers-page";
import {NumbersPageOptions} from "./numbers-page/types";
import OperatorsPage from "./operators-page";
import {OperatorsButtonSets} from "./operators-page/types";

import type {TabbarItemType} from "../tabbar/types";

export type Props = {
    onClickKey: (keyConfig: string) => void;
    trigonometry?: boolean;
    extraKeys?: ReadonlyArray<Key>;
} & OperatorsButtonSets &
    NumbersPageOptions;
type State = {
    selectedPage: TabbarItemType;
};

const allPages = function (props: Props): ReadonlyArray<TabbarItemType> {
    const pages: Array<TabbarItemType> = ["Numbers"];

    if (props.extraKeys?.length) {
        pages.push("Extra");
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
};

export default class Keypad extends React.Component<Props, State> {
    state: State = {
        selectedPage: "Numbers",
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
                />
                {selectedPage === "Numbers" && <NumbersPage {...this.props} />}
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
