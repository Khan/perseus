// @flow
/* Component for rendering a letter icon in radio choice */

import Color from "@khanacademy/wonder-blocks-color";
import * as React from "react";

import {getChoiceLetter} from "../util.js";

import LibraryChoiceIcon from "./library-choice-icon.jsx";

type ChoiceIconProps = {|
    pos: number,
    checked: boolean,
    crossedOut: boolean,
    focused: boolean,
    hovered: boolean,
    pressed: boolean,
    correct: boolean,
    showCorrectness: boolean,
    multipleSelect: boolean,
    reviewMode: boolean,
    previouslyAnswered: boolean,
    // TODO(mdr): The CrossOutButton needs a transparent-background ChoiceIcon,
    //     so I've added this prop. I'm not sure why we have backgrounds in the
    //     general case, though? When does the choice container have a
    //     non-white background, aside from SAT, which uses a different icon?
    transparentBackground?: boolean,

    primaryProductColor?: string,
|};

function ChoiceIcon(props: ChoiceIconProps): React.Node {
    const {
        pos,
        reviewMode,
        checked,
        crossedOut,
        correct,
        multipleSelect,
        showCorrectness,
        focused,
        hovered,
        pressed,
        primaryProductColor = Color.blue,
        previouslyAnswered,
        transparentBackground,
    } = props;

    const letter = getChoiceLetter(pos);

    return (
        <LibraryChoiceIcon
            letter={letter}
            reviewMode={reviewMode}
            checked={checked}
            crossedOut={crossedOut}
            focused={focused}
            hovered={hovered}
            pressed={pressed}
            correct={correct}
            showCorrectness={showCorrectness}
            primaryProductColor={primaryProductColor}
            previouslyAnswered={previouslyAnswered}
            transparentBackground={transparentBackground}
            multipleSelect={multipleSelect}
        />
    );
}

export default ChoiceIcon;
