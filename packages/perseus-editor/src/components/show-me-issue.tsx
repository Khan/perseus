import Switch from "@khanacademy/wonder-blocks-switch";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {A11yContext} from "./a11y-context";

type Props = {
    /**
     * The issue's highlight handle. Absent when the issue has nothing in the
     * preview to point at, which is what makes the toggle unavailable.
     */
    instanceId?: string;
};

const showMeStyle = {
    marginBlockStart: "1em",
    display: "flex",
    alignItems: "center",
};

const ShowMe = ({instanceId}: Props) => {
    const [showMe, setShowMe] = React.useState(false);
    const context = React.useContext(A11yContext);

    // Clear this issue's highlight when it unmounts (e.g. the issue is
    // resolved and disappears from the list) so it doesn't linger.
    React.useEffect(() => {
        return () => {
            if (instanceId != null) {
                context?.setIssueHighlight(instanceId, false);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (instanceId == null || context == null) {
        return (
            <div>
                Unable to find the offending element. Please ask a developer for
                help fixing this.
            </div>
        );
    }

    const handleChange = (checked: boolean) => {
        setShowMe(checked);
        context.setIssueHighlight(instanceId, checked);
    };

    return (
        <BodyText size="small" tag="span" weight="bold" style={showMeStyle}>
            <span style={{marginInlineEnd: "1em"}}>Show Me</span>
            <Switch
                checked={showMe}
                onChange={handleChange}
                aria-label="Show Me"
            />
        </BodyText>
    );
};

export default ShowMe;
