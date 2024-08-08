import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import type {Coord, PerseusGraphType} from "@khanacademy/perseus";

type Props = {
    startCoords: [Coord, Coord, Coord];
    onChange: (startCoords: PerseusGraphType["startCoords"]) => void;
};

const StartCoordsAngle = (props: Props) => {
    const {startCoords} = props;
    return (
        <View>
            WIP
            <br /> Start coords:
            {startCoords.map((coord, index) => {
                return (
                    <View key={index}>
                        {`Point ${index + 1}: (${coord[0]}, ${coord[1]})`}
                    </View>
                );
            })}
        </View>
    );
};

export default StartCoordsAngle;
