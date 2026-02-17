import {components} from "@khanacademy/perseus";
import * as React from "react";

import type {Changeable} from "@khanacademy/perseus";

const {ButtonGroup} = components;

type Props = {
    value?: string;
} & Changeable.ChangeableProps;

class ArrowPicker extends React.Component<Props> {
    static defaultProps: {
        value: string;
    } = {
        value: "",
    };

    render(): React.ReactNode {
        return (
            <ButtonGroup
                value={this.props.value}
                allowEmpty={false}
                buttons={[
                    {value: "", content: <span>&mdash;</span>},
                    {value: "->", content: <span>&#x2192;</span>},
                ]}
                onChange={this.props.onChange}
            />
        );
    }
}

export default ArrowPicker;
