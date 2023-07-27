import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

import type {KEScore} from "@khanacademy/perseus-core";

type Props = {
    score: KEScore | null | undefined;
};

export default ({score}: Props): React.ReactElement | null => {
    if (score == null) {
        return null;
    }

    return (
        <>
            <table style={{marginTop: "20px"}}>
                <thead>
                    <tr style={{fontWeight: "bold"}}>
                        <td>Empty</td>
                        <td>Correct</td>
                        <td style={{width: "100%"}}>Message</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{score.empty.toString()}</td>
                        <td>{score.correct.toString()}</td>
                        <td>{score.message}</td>
                    </tr>
                </tbody>
            </table>

            <HeadingSmall style={{marginTop: "10px"}}>Guess</HeadingSmall>
            <ReactJson
                quotesOnKeys={false}
                enableClipboard={false}
                src={score.guess}
            />
            <HeadingSmall style={{marginTop: "10px"}}>State</HeadingSmall>
            <ReactJson
                quotesOnKeys={false}
                enableClipboard={false}
                src={score.state}
            />
        </>
    );
};
