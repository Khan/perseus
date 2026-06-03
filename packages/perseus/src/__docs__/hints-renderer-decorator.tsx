import * as React from "react";

// Wraps hints in a `bibliotron-exercise` container to reflect hint styling in prod.
export const bibliotronExerciseDecorator = (Story) => (
    <div className="bibliotron-exercise">
        <Story />
    </div>
);
