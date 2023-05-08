import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

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
} & OperatorsButtonSets &
    NumbersPageOptions;
type State = {
    selectedPage: TabbarItemType;
};

const allPages = function (props: Props): React.ReactElement {
    const pages: Array<TabbarItemType> = ["Numbers"];

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
    // @ts-expect-error [FEI-5003] - TS2739 - Type 'TabbarItemType[]' is missing the following properties from type 'ReactElement<any, string | JSXElementConstructor<any>>': type, props, key
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
                    // @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call.
                    items={availablePages}
                    onSelect={(tabbarItem: TabbarItemType) => {
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
