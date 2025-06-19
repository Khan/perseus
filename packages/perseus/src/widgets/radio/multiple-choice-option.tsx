import * as React from "react";

import Indicator from "./multiple-choice-indicator";

export interface IndicatorProps {
    children: React.ReactNode | React.ReactNode[];
    indicatorContent: string;
    updateChecked: (isChecked: boolean) => void;
}

const Option = (props: IndicatorProps) => {
    const {children, indicatorContent, updateChecked} = props;
    return (
        <li>
            <Indicator
                checked={false}
                content={indicatorContent}
                shape="square"
                updateChecked={updateChecked}
            />
            {children}
        </li>
    );
};

export default Option;
