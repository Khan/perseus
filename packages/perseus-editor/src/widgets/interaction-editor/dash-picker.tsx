import {components} from "@khanacademy/perseus";
import * as React from "react";

type Props = {
    value?: string;
    onChange: (value: string) => void;
};

const {ButtonGroup} = components;

class DashPicker extends React.Component<Props> {
    static defaultProps: {
        value: string;
    } = {
        value: "",
    };

    render(): React.ReactNode {
        return (
            <ButtonGroup
                value={this.props.value}
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
