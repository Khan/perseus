import * as React from "react";

export const mobileDecorator = (Story) => (
    <div className="framework-perseus perseus-mobile">
        <Story />
    </div>
);

export const articleDecorator = (Story) => (
    <div className="framework-perseus perseus-article">
        <Story />
    </div>
);

export const mobileArticleDecorator = (Story) => (
    <div className="framework-perseus perseus-mobile perseus-article">
        <Story />
    </div>
);

export const rtlDecorator = (Story) => (
    <div style={{direction: "rtl"}}>
        <Story />
    </div>
);
