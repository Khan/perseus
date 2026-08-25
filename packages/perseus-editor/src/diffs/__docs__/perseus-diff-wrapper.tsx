import * as React from "react";

interface Props {
    children: React.ReactNode;
}

const Wrapper = ({children}: Props): React.ReactElement => {
    return <div className="perseus-diff">{children}</div>;
};

export default Wrapper;
