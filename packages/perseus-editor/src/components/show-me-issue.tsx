import Switch from "@khanacademy/wonder-blocks-switch";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {A11yContext} from "./a11y-context";

type Props = {
    issueId: string;
    previewId?: string;
};

const showMeStyle = {
    marginTop: "1em",
    display: "flex",
    alignItems: "center",
};

const ShowMe = ({issueId, previewId}: Props) => {
    const [showMe, setShowMe] = React.useState(false);
    const context = React.useContext(A11yContext);

    // Clear this issue's highlight when it unmounts (e.g. the issue is
    // resolved and disappears from the list) so it doesn't linger.
    React.useEffect(() => {
        return () => {
            context?.setIssueHighlight(issueId, null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (previewId == null || context == null) {
        return (
            <div>
                Unable to find the offending element. Please ask a developer for
                help fixing this.
            </div>
        );
    }

    const handleChange = (checked: boolean) => {
        setShowMe(checked);
        context.setIssueHighlight(issueId, checked ? previewId : null);
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
