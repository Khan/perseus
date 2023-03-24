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
// @ts-expect-error [FEI-5003] - TS2739 - Type 'TabbarItemType[]' is missing the following properties from type 'ReactElement<any, string | JSXElementConstructor<any>>': type, props, key
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
// @ts-expect-error [FEI-5003] - TS2786 - 'View' cannot be used as a JSX component.
            <View>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'Tabbar' cannot be used as a JSX component. */}
                <Tabbar
// @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call.
                    items={availablePages}
                    onSelect={(tabbarItem: TabbarItemType) => {
                        this.setState({selectedPage: tabbarItem});
                    }}
                />
                {selectedPage === "Numbers" && (
// @ts-expect-error [FEI-5003] - TS2786 - 'NumericInputPage' cannot be used as a JSX component.
                    <NumericInputPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Operators" && (
// @ts-expect-error [FEI-5003] - TS2786 - 'PreAlgebraPage' cannot be used as a JSX component.
                    <PreAlgebraPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Geometry" && (
// @ts-expect-error [FEI-5003] - TS2786 - 'TrigonometryPage' cannot be used as a JSX component.
                    <TrigonometryPage onClickKey={onClickKey} />
                )}
            </View>
        );
    }
}
