import {Dependencies, ItemRenderer} from "@khanacademy/perseus";
import * as React from "react";

const testItem = {
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    _multi: null,
    answer: null,
    hints: [],
    itemDataVersion: {major: 0, minor: 1},
    question: {
        content:
            "Catherine created a chart and a bar graph to show how many dogs of each breed the animal shelter placed into good homes last year. \n\nDog breed  | Number of dogs \n:- | :-: \nBulldog | $32$ \nGreyhound | $72$ \nMastiff | $56$ \nCollie | $40$ \n\n**Label each bar on the bar graph.**\n\n[[☃ label-image 1]]\n\n\n\n",
        images: {
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2f60b533892fe6cb9351f704ffdada8ae4bc655c":
                {height: 365, width: 503},
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/75f937c6ea133d655dd9f698a58182efd6cc85d4":
                {height: 293, width: 331},
        },
        widgets: {
            "label-image 1": {
                alignment: "default",
                graded: true,
                static: false,
                type: "label-image",
                version: {major: 0, minor: 0},
                options: {
                    choices: ["Bulldog", "Greyhound", "Mastiff", "Collie"],
                    hideChoicesFromInstructions: true,
                    imageAlt:
                        "A bar graph with four bar lines shows the horizontal axis labeled Dog breed and the vertical axis labeled Number of dogs. The vertical axis is labeled from the bottom of the axis to the top of the axis as follows: 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, and 80. The horizontal axis has, from left to right, four unlabeled bar lines as follows: the first unlabeled bar line extends to 56, the second unlabeled bar line extends to 72, the third unlabeled bar line extends to 40, and the fourth unlabeled bar line extends to 32.",
                    imageHeight: 293,
                    imageUrl:
                        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/64ace45942546183c3dc842cb0e9e4f64a312727",
                    imageWidth: 331,
                    markers: [
                        {
                            answers: ["Bulldog"],
                            label: "The fourth unlabeled bar line.",
                            x: 87.3,
                            y: 90.2,
                        },
                        {
                            answers: ["Collie"],
                            label: "The third unlabeled bar line.",
                            x: 67.7,
                            y: 90.5,
                        },
                        {
                            answers: ["Greyhound"],
                            label: "The second unlabeled bar line.",
                            x: 47.7,
                            y: 90.2,
                        },
                        {
                            answers: ["Mastiff"],
                            label: "The first unlabeled bar line.",
                            x: 27.8,
                            y: 90.5,
                        },
                    ],
                    multipleAnswers: false,
                    static: false,
                },
            },
        },
    },
};

const apiOptions = {};

const LogForTesting = {
    log: () => {},
    error: () => {},
};

export const testDependencies = {
    // JIPT
    JIPT: {
        useJIPT: false,
    },
    graphieMovablesJiptLabels: {
        addLabel: (label, useMath) => {},
    },
    svgImageJiptLabels: {
        addLabel: (label, useMath) => {},
    },
    rendererTranslationComponents: {
        addComponent: (renderer) => -1,
        removeComponentAtIndex: (index) => {},
    },

    // KaTeX
    getKaTeX: () => Promise.resolve(katex),
    getRenderA11yString: () => Promise.resolve(renderA11yString),
    loadMathjax: () => Promise.resolve(),
    // The KaTeX used in the 'should replace deprecated alignment tags in inline
    // math' test uses the `align` environment. This results in `array` nodes in
    // the parsed KaTeX node tree. When the Tex component tries to build an a11y
    // string for it, KaTeX throws an error because render-a11y-string.js doesn't
    // support `array` nodes. It then logs the error it to the server. However,
    // there is throttling code in the logKaTeXError() function which only reports
    // the error 1% of the time... so this causes _very_ rare test failures.
    // Mocking this here so that we don't fail because of this issue.
    logKaTeXError: (expression, error) => Promise.resolve({}),

    KatexProvider: ({children}) => (
        <span className="mock-KatexProvider">{children}</span>
    ),
    shouldUseFutureKaTeX: (flag) => {},
    TeX: ({children}) => <span className="mock-TeX">{children}</span>,

    staticUrl: (str) => {
        // We define the interface such that flow can infer calls properly.
        // However, it means that return types are hard to match here in
        // the implementation.
        // $FlowIgnore[incompatible-type]
        return `mockStaticUrl(${str})`;
    },

    // video widget
    useVideo: (id, kind) => {
        // Used by video-transcript-link.jsx.fixture.js
        if (id === "YoutubeId" && kind === "YOUTUBE_ID") {
            return {
                status: "success",
                data: {
                    video: {
                        id: "YoutubeVideo",
                        contentId: "contentId",
                        youtubeId: "YoutubeId",
                        title: "Youtube Video Title",
                        __typename: "Video",
                    },
                },
            };
        }
        if (id === "slug-video-id" && kind === "READABLE_ID") {
            return {
                status: "success",
                data: {
                    video: {
                        title: "Slug Video Title",
                        id: "VideoId",
                        youtubeId: "YoutubeId",
                        contentId: "contentId",
                        __typename: "Video",
                    },
                },
            };
        }

        return {
            status: "loading",
        };
    },

    InitialRequestUrl: {
        origin: "origin-test-interface",
        host: "host-test-interface",
        protocol: "protocol-test-interface",
    },

    isDevServer: false,
    kaLocale: "en",
    isMobile: false,

    Log: LogForTesting,
};

export function Playground(props) {
    const ref = React.useRef(null);
    Dependencies.setDependencies(testDependencies);

    return (
        <div
            style={{
                display: "flex",
                width: 800,
            }}
        >
            <div
                style={{
                    backgroundColor: "red",
                    flex: 1,
                }}
            >
                <ItemRenderer
                    ref={ref}
                    problemNum={0}
                    apiOptions={apiOptions}
                    item={testItem}
                    savedState={null}
                />
                <div id="workarea" />
                <div id="hintsarea" />
            </div>
            <div
                style={{
                    backgroundColor: "Green",
                    flex: 1,
                }}
            >
                Form for content
            </div>
        </div>
    );
}
