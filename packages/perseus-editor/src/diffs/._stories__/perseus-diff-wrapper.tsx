import * as React from "react";

const Wrapper: React.FC<{
    children: React.ReactNode;
}> = ({children}): React.ReactElement => {
    return <div className="perseus-diff">{children}</div>;
};

export default Wrapper;
