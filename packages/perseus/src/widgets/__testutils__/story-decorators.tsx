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

const articleContent1 =
    "Prophase (sometimes divided into prophase and prometaphase):";
const articleContent2 =
    "Chromosomes: In prophase, the chromosomes condense, forming the characteristic “X” shape that is often shown in diagrams. Each “X” is a duplicated chromosome. The two sides of the “X” are called sister chromatids, and they are attached at a point called the centromere. Even though the chromosome has been copied at this point of the cell cycle, as long as the two copies (sister chromatids) are attached, they are considered a single chromosome.";
const articleContent3 =
    "The nucleolus (a structure inside the nucleus where ribosomes are made) disappears during prophase. The mitotic spindle begins to form during prophase, starting at regions called centrosomes. These regions contain the material needed for building the spindle, and also function to regulate the spindle throughout mitosis.";

export const mobileArticleFloatLeftDecorator = (Story) => (
    <div className="framework-perseus perseus-mobile perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-float-left">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);

export const mobileArticleFloatRightDecorator = (Story) => (
    <div className="framework-perseus perseus-mobile perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-float-right">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);

export const articleFloatLeftDecorator = (Story) => (
    <div className="framework-perseus perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-float-left">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);

export const articleFloatRightDecorator = (Story) => (
    <div className="framework-perseus perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-float-right">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);
