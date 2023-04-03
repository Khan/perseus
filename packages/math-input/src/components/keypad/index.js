//@flow
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Tabbar from "../tabbar/tabbar.js";

import NumericInputPage from "./numeric-input-page.js";
import PreAlgebraPage from "./pre-algebra-page.js";
import TrigonometryPage from "./trigonometry-page.js";

import type {TabbarItemType} from "../tabbar/types.js";

type Props = {|
    onClickKey: (keyConfig: string) => void,
    preAlgebra: boolean,
    trigonometry: boolean,
|};
type State = {
    selectedPage: TabbarItemType,
};

function allPages(props: Props): Array<TabbarItemType> {
    const pages: Array<TabbarItemType> = ["Numbers"];

    if (props.preAlgebra) {
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
    render(): React.Node {
        const {selectedPage} = this.state;
        const {onClickKey} = this.props;

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
