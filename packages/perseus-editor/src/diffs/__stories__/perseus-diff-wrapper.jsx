// @flow
import * as React from "react";

const Wrapper = ({children}: {|children: React.Node|}): React.Node => {
    return <div className="perseus-diff">{children}</div>;
};

export default Wrapper;
