import * as React from "react";

import {RendererWithDebugUI} from "../../../../../../testing/renderer-with-debug-ui";
import {ApiOptions} from "../../../perseus-api";
import {
    segmentWithLockedFunction,
    segmentWithLockedFunctionAndAsymmetricRange,
} from "../interactive-graph.testdata";

export default {
    title: "Perseus/Widgets/Interactive Graph/Locked Functions",
};

const defaultApiOptions = ApiOptions.defaults;

type StoryArgs = Record<any, any>;

export const DefaultSettings = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction()}
    />
);

export const StyledSettings = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("x^2", {
            color: "green",
            strokeStyle: "dashed",
        })}
    />
);

export const FunctionOfY = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("y^2", {
            directionalAxis: "y",
        })}
    />
);

export const FunctionOfYAsymmetricRange = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunctionAndAsymmetricRange("y/2", {
            directionalAxis: "y",
        })}
    />
);

export const DomainRestrictedMin = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("sin(x)", {
            domain: [-5, Infinity],
        })}
    />
);

export const DomainRestrictedMax = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("sin(x)", {
            domain: [-Infinity, 5],
        })}
    />
);

export const DomainRestrictedBoth = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("sin(x)", {
            domain: [-5, 5],
        })}
    />
);

export const Quadratic = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("x^2 + 2x + 3")}
    />
);

export const QubicPolynomial = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("(1/3)x^3 - 2x^2 + 3x - 4")}
    />
);

export const Tangent = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("tan(x)")}
    />
);

export const ArcTangent = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("arctan(x)")}
    />
);

export const Logarithmic = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("log(x)")}
    />
);

export const Exponent = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("e^x")}
    />
);

export const AbsoluteValue = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        {...defaultApiOptions}
        question={segmentWithLockedFunction("abs(x)")}
    />
);
