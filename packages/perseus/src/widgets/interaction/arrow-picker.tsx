import * as React from "react";

import ButtonGroup from "../../components/button-group";

import type {ChangeableProps} from "../../mixins/changeable";

type Props = {
    value?: string;
} & ChangeableProps;

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
                    /*
                TODO(eater): fix khan-exercises so these are supported
                {value: "<-", content: <span>&#x2190;</span>},
                {value: "<->", content: <span>&#x2194;</span>}
                */
                ]}
                onChange={this.props.onChange}
            />
        );
    }
}

export default ArrowPicker;
