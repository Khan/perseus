/* eslint-disable static-service/require-fixture */
// @flow

import * as React from "react";

import ButtonGroup from "../../../perseus-all-package/components/button-group.jsx";

import type {ChangeableProps} from "../../../perseus-all-package/mixins/changeable.jsx";

type Props = {|
    value?: string,
    ...ChangeableProps,
|};

class DashPicker extends React.Component<Props> {
    static defaultProps: {|value: string|} = {
        value: "",
    };

    render(): React.Node {
        return (
            <ButtonGroup
                value={this.props.value}
                allowEmpty={false}
                buttons={[
                    {value: "", content: <span>&mdash;</span>},
                    {value: "-", content: <span>&ndash;&ndash;&ndash;</span>},
                    {
                        value: "- ",
                        content: <span>&ndash;&nbsp;&nbsp;&ndash;</span>,
                    },
                    {
                        value: ".",
                        content: <span>&middot;&middot;&middot;&middot;</span>,
                    },
                    {
                        value: ". ",
                        content: <span>&middot; &middot; &middot;</span>,
                    },
                ]}
                onChange={this.props.onChange}
            />
        );
    }
}

export default DashPicker;
