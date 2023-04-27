import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Tabbar from "../tabbar/tabbar";

import NumericInputPage from "./numeric-input-page";
import PreAlgebraPage from "./pre-algebra-page";
import TrigonometryPage from "./trigonometry-page";

import type {TabbarItemType} from "../tabbar/types";

type Props = {
    onClickKey: (keyConfig: string) => void;
    preAlgebra: boolean;
    trigonometry: boolean;
};

const Keypad = (props: Props) => {
    const [selectedPage, setSelectedPage] =
        React.useState<TabbarItemType>("Numbers");

    const {onClickKey} = props;

    const availablePages: Array<TabbarItemType> = ["Numbers"];
    if (props.preAlgebra) {
        availablePages.push("Operators");
    }
    if (props.trigonometry) {
        availablePages.push("Geometry");
    }

    return (
        <View>
            <Tabbar
                items={availablePages}
                onSelect={(tabbarItem: TabbarItemType) => {
                    setSelectedPage(tabbarItem);
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
};

export default Keypad;
