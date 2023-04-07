import * as React from "react";

type Props = {
    children: React.ReactNode;
};

const Wrapper = ({children}: Props): React.ReactElement => {
    return <div className="perseus-diff">{children}</div>;
};

export default Wrapper;
