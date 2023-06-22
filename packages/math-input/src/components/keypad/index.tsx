import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Key from "../../data/keys";
import {ClickKeyCallback} from "../../types";
import {CursorContext} from "../input/cursor-contexts";
import Tabbar from "../tabbar/tabbar";
import {TabbarItemType} from "../tabbar/types";

import ExtrasPage from "./keypad-pages/extras-page";
import GeometryPage from "./keypad-pages/geometry-page";
import NumbersPage from "./keypad-pages/numbers-page";
import OperatorsPage from "./keypad-pages/operators-page";
import SharedKeys from "./shared-keys";

export type Props = {
    onClickKey: ClickKeyCallback;
    cursorContext?: CursorContext;
    trigonometry?: boolean;
    extraKeys: ReadonlyArray<Key>;
    multiplicationDot?: boolean;
    divisionKey?: boolean;
    preAlgebra?: boolean;
    logarithms?: boolean;
    basicRelations?: boolean;
    advancedRelations?: boolean;
};

const defaultProps = {
    extraKeys: [],
};

function allPages(props: Props): ReadonlyArray<TabbarItemType> {
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

    if (props.extraKeys?.length) {
        pages.push("Extras");
    }

    return pages;
}

export default function Keypad(props: Props) {
    const [selectedPage, setSelectedPage] =
        React.useState<TabbarItemType>("Numbers");

    const availablePages = allPages(props);

    const {
        onClickKey,
        cursorContext,
        extraKeys,
        multiplicationDot,
        divisionKey,
        preAlgebra,
        logarithms,
        basicRelations,
        advancedRelations,
    } = props;

    return (
        <View>
            <Tabbar
                items={availablePages}
                selectedItem={selectedPage}
                onSelectItem={(tabbarItem: TabbarItemType) => {
                    setSelectedPage(tabbarItem);
                }}
                style={styles.tabbar}
            />

            <View style={styles.grid}>
                {selectedPage === "Numbers" && (
                    <NumbersPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Extras" && (
                    <ExtrasPage onClickKey={onClickKey} extraKeys={extraKeys} />
                )}
                {selectedPage === "Operators" && (
                    <OperatorsPage
                        onClickKey={onClickKey}
                        preAlgebra={preAlgebra}
                        logarithms={logarithms}
                        basicRelations={basicRelations}
                        advancedRelations={advancedRelations}
                    />
                )}
                {selectedPage === "Geometry" && (
                    <GeometryPage onClickKey={onClickKey} />
                )}
                <SharedKeys
                    onClickKey={onClickKey}
                    cursorContext={cursorContext}
                    multiplicationDot={multiplicationDot}
                    divisionKey={divisionKey}
                />
            </View>
        </View>
    );
}

Keypad.defaultProps = defaultProps;

const styles = StyleSheet.create({
    tabbar: {
        background: Color.white,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        backgroundColor: "#DBDCDD",
        maxHeight: 200,
        maxWidth: 300,
    },
});
