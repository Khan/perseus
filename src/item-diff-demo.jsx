const {Component} = require("react");
const ItemDiff = require("./diffs/item-diff.jsx");

class ItemDiffDemo extends Component {
    state = {swapped: false};

    swap = () => this.setState({swapped: !this.state.swapped});

    render() {
        const {swapped} = this.state;
        return (
            <div>
                <input type="button" value="Swap it!" onClick={this.swap} />
                <div className="perseus-diff">
                    <ItemDiff
                        before={swapped ? after : before}
                        after={swapped ? before : after}
                    />
                </div>
            </div>
        );
    }
}

/* eslint-disable max-len */
const before = {
    question: {
        content:
            "**What kind of structure is highlighted in green in the diagram shown?**\n \n![](https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png)![](https://ka-perseus-graphie.s3.amazonaws.com/a10ab9f9b66982637bd1cf1e3cfe493562144e15.png)\n\nHow  many apples? [[☃ numeric-input 1]]\nWhat's the structure? [[☃ dropdown 1]]",
        images: {
            "https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png": {
                width: 250,
                height: 150,
            },
            "https://ka-perseus-graphie.s3.amazonaws.com/a10ab9f9b66982637bd1cf1e3cfe493562144e15.png": {
                width: 397,
                height: 397,
            },
        },
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    answers: [
                        {
                            value: 8,
                            status: "correct",
                            message: "",
                            simplify: "required",
                            answerForms: ["integer"],
                            strict: true,
                            maxError: null,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "dropdown 1": {
                type: "dropdown",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    placeholder: "",
                    choices: [
                        {
                            content: "line segment",
                            correct: false,
                        },
                        {
                            content: "line",
                            correct: true,
                        },
                        {
                            content: "ray",
                            correct: false,
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: true,
    },
    hints: [
        {
            content:
                "The highlighted part of the diagram has no starting point and no ending point; it continues forever in both directions, like this: \n\n![](https://ka-perseus-graphie.s3.amazonaws.com/2b6f0a4700f9fd840e5049de8c1f88206134fde1.png)",
            widgets: {},
        },
        {
            content:
                "A straight, one-dimensional structure continuing forever in both directions is called a *line*.",
            widgets: {},
        },
        {
            content: "The structure highlighted in green is a line.",
            widgets: {},
        },
    ],
};

const after = {
    question: {
        content:
            "**What kind of structure is highlighted in dashed green in the diagram shown?**\n \n![](https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png)\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/70b65362dbffa72a371b2829549015149caaba73)\n\nHow  many apples? [[☃ numeric-input 1]]\nWhat's the structure? [[☃ dropdown 1]]",
        images: {
            "https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png": {
                width: 250,
                height: 150,
            },
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/70b65362dbffa72a371b2829549015149caaba73": {
                width: 300,
                height: 300,
            },
        },
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    answers: [
                        {
                            value: 8,
                            status: "correct",
                            message: "",
                            simplify: "required",
                            answerForms: ["integer"],
                            strict: false,
                            maxError: null,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "dropdown 1": {
                type: "dropdown",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    placeholder: "",
                    choices: [
                        {
                            content: "line segment",
                            correct: true,
                        },
                        {
                            content: "line",
                            correct: false,
                        },
                        {
                            content: "ray",
                            correct: false,
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
    },
    hints: [
        {
            content:
                "The highlighted part _of the diagram_ has *no* starting point and *no* ending point; it continues forever in both directions, like this: \n\n![](https://ka-perseus-graphie.s3.amazonaws.com/2b6f0a4700f9fd840e5049de8c1f88206134fde1.png)",
            widgets: {},
        },
        {
            content:
                "A straight, one-dimensional structure continuing forever in both directions is called a *line*.",
            widgets: {},
        },
        {
            content: "The structure highlighted in green is a line.",
            widgets: {},
        },
    ],
};
/* eslint-enable max-len */

module.exports = ItemDiffDemo;
