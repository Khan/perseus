/**
 * A wrapper around info-tip/info-tip.jsx that can be rendered on the
 * server without causing a checksum mismatch on the client.
 * (RCSS generates classnames with a randomSuffix, which ensures that any
 * two sets of generated classnames will not match.)
 */

import * as React from "react";

import InfoTipBase from "./info-tip-base";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type Props = PropsFor<typeof InfoTipBase>;

type State = {
    didMount: boolean;
};

class InfoTip extends React.Component<Props, State> {
    state: State = {
        didMount: false,
    };

    componentDidMount() {
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({didMount: true});
        /* eslint-enable react/no-did-mount-set-state */
    }

    render(): React.ReactNode {
        if (this.state.didMount) {
            return <InfoTipBase {...this.props} />;
        }
        return <div />;
    }
}

export default InfoTip;
