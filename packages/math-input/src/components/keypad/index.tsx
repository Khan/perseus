import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Tabbar from '../tabbar/tabbar';

import NumericInputPage from './numeric-input-page';
import PreAlgebraPage from './pre-algebra-page';
import TrigonometryPage from './trigonometry-page';

import type {TabbarItemType} from '../tabbar/types';

type Props = {
    onClickKey: (keyConfig: string) => void,
    preAlgebra: boolean,
    trigonometry: boolean
};
type State = {
    selectedPage: TabbarItemType
};

const allPages: React.FC<Props> = function(props): React.ReactElement {
    const pages: Array<TabbarItemType> = ["Numbers"];

    if (props.preAlgebra) {
        pages.push("Operators");
    }
    if (props.trigonometry) {
        pages.push("Geometry");
    }
    return pages;
};

export default class PreAlgebraKeypad extends React.Component<Props, State> {
    state: State = {
        selectedPage: "Numbers",
    };
    render(): React.ReactElement {
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
