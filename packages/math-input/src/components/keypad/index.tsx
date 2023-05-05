import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Tabbar from "../tabbar/tabbar";

import TrigonometryPage from "./geometry-page/trigonometry-page";
import NumericInputPage from "./numbers-page/numeric-input-page";
import OperatorsPage, {
    OperatorsButtonSets,
} from "./operators-page/operators-page";

import type {TabbarItemType} from "../tabbar/types";

type Props = {
    onClickKey: (keyConfig: string) => void;
    trigonometry?: boolean;
} & OperatorsButtonSets;
type State = {
    selectedPage: TabbarItemType;
};

const allPages = function (props: Props): React.ReactElement {
    const pages: Array<TabbarItemType> = ["Numbers"];

    if (
        props.preAlgebra ||
        props.logarithms ||
        props.relations ||
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
        const {onClickKey} = this.props;

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
                {selectedPage === "Numbers" && (
                    <NumericInputPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Operators" && (
                    <OperatorsPage {...this.props} />
                )}
                {selectedPage === "Geometry" && (
                    <TrigonometryPage onClickKey={onClickKey} />
                )}
            </View>
        );
    }
}
