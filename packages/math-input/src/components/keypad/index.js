//@flow
import * as React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Clickable from "@khanacademy/wonder-blocks-clickable";

import Tabbar from "../tabbar/tabbar";
import NumericInputPage from "./numeric-input-page";
import PreAlgebraPage from "./pre-algebra-page";
import TrigonometryPage from "./trigonometry-page";

import type {Node} from "React";
import type {TabbarItemType} from "../tabbar/item";

type Props = {|
    onClickKey: (keyConfig: string) => void,
    preAlgebra: boolean,
    trigonometry: boolean,
|};
type State = {
    selectedPage: TabbarItemType,
};

function allPages(props: Props): Array<TabbarItemType> {
    var pages: Array<TabbarItemType> = ["Numbers"];

    if (props.preAlgebra) {
        pages.push("Operators");
    }
    if (props.trigonometry) {
        pages.push("Geometry");
    }
    return pages;
}

export default class PreAlgebraKeypad extends React.Component<Props, State> {
    state: State = {
        selectedPage: "Numbers",
    };
    render(): React.Node {
        const {selectedPage} = this.state;
        const {onClickKey, preAlgebra} = this.props;

        const availablePages = allPages(this.props);

        return (
            <View>
                <Tabbar
                    items={availablePages}
                    onSelect={(tabbarItem: TabbarItemType) => {
                        this.setState({selectedPage: tabbarItem});
                    }}
                />
                {selectedPage === "Numbers" && (
                    <NumericInputPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Operators" && (
                    <PreAlgebraPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Geometry" && (
                    <TrigonometryPage onClickKey={onClickKey} />
                )}
            </View>
        );
    }
}
