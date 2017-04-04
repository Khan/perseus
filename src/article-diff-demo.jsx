const {Component} = require('react');
const ArticleDiff = require('./diffs/article-diff.jsx');

class ArticleDiffDemo extends Component {
    state = {swapped: false}

    swap = () => this.setState({swapped: !this.state.swapped});

    render() {
        const {swapped} = this.state;
        return <div>
            <input type="button" value="Swap it!" onClick={this.swap}/>
            <div className="perseus-diff">
                <ArticleDiff
                    before={swapped ? after : before}
                    after={swapped ? before : after}
                />
            </div>
        </div>;
    }
}

/* eslint-disable max-len */
const before = [
    {
        "content": "**What kind of structure is highlighted in green in the diagram shown?**\n \n![](https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png)![](https://ka-perseus-graphie.s3.amazonaws.com/a10ab9f9b66982637bd1cf1e3cfe493562144e15.png)\n\nHow  many apples? [[☃ numeric-input 1]]\n\n[[☃ image 1]]\n\nWhat's the structure? [[☃ dropdown 1]]",
        "images": {
            "https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png": {
                "width": 250,
                "height": 150,
            },
            "https://ka-perseus-graphie.s3.amazonaws.com/a10ab9f9b66982637bd1cf1e3cfe493562144e15.png": {
                "width": 397,
                "height": 397,
            },
        },
        "widgets": {
            "numeric-input 1": {
                "type": "numeric-input",
                "alignment": "default",
                "static": false,
                "graded": true,
                "options": {
                    "static": false,
                    "answers": [
                        {
                            "value": 8,
                            "status": "correct",
                            "message": "",
                            "simplify": "required",
                            "answerForms": [
                                "integer",
                            ],
                            "strict": true,
                            "maxError": 1,
                        },
                    ],
                    "size": "normal",
                    "coefficient": false,
                    "labelText": "",
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
            "image 1": {
                "type": "image",
                "alignment": "float-right",
                "static": false,
                "graded": true,
                "options": {
                    "static": false,
                    "title": "",
                    "range": [
                        [
                            0,
                            10,
                        ],
                        [
                            0,
                            10,
                        ],
                    ],
                    "box": [
                        4288,
                        2848,
                    ],
                    "backgroundImage": {
                        "url": "https://ka-perseus-images.s3.amazonaws.com/f17ea8bfb4944b18ef2a3f61cc5a378a9d0b4900.jpg",
                        "width": 4288,
                        "height": 2848,
                    },
                    "labels": [],
                    "alt": "Freshly baked chocolate chip cookies on a cooling rack. ",
                    "caption": "*You might use stoichiometry skills to double a cookie recipe! Image credit: [Chocolate Chip Cookies](https://commons.wikimedia.org/wiki/File%3AChocolate_Chip_Cookies_-_kimberlykv.jpg) by Kimberley Vardeman on Wikimedia Commons, [CC-BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.en)*",
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
            "dropdown 1": {
                "type": "dropdown",
                "alignment": "default",
                "static": false,
                "graded": true,
                "options": {
                    "static": false,
                    "placeholder": "",
                    "choices": [
                        {
                            "content": "line segment",
                            "correct": false,
                        },
                        {
                            "content": "line",
                            "correct": true,
                        },
                        {
                            "content": "ray",
                            "correct": false,
                        },
                    ],
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
        },
    },
];

const after = [
    {
        "content": "**What kind of structure is highlighted in dashed green in the diagram shown?**\n \n![](https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png)\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/70b65362dbffa72a371b2829549015149caaba73)\n\nHow  many apples? [[☃ numeric-input 1]]\n\n[[☃ image 1]]",
        "images": {
            "https://ka-perseus-graphie.s3.amazonaws.com/07dace481175322baa244b35d112968977d19da3.png": {
                "width": 250,
                "height": 150,
            },
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/70b65362dbffa72a371b2829549015149caaba73": {
                "width": 300,
                "height": 300,
            },
        },
        "widgets": {
            "numeric-input 1": {
                "type": "numeric-input",
                "alignment": "default",
                "static": false,
                "graded": true,
                "options": {
                    "static": false,
                    "answers": [
                        {
                            "value": 8,
                            "status": "correct",
                            "message": "",
                            "simplify": "required",
                            "answerForms": [
                                "integer",
                            ],
                            "strict": false,
                            "errorBounds": {
                                "minError": 0.1,
                                "maxError": 1,
                            },
                        },
                    ],
                    "size": "normal",
                    "coefficient": false,
                    "labelText": "",
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
            "image 1": {
                "type": "image",
                "alignment": "float-right",
                "static": false,
                "graded": true,
                "options": {
                    "static": false,
                    "title": "",
                    "range": [
                        [
                            0,
                            10,
                        ],
                        [
                            0,
                            10,
                        ],
                    ],
                    "box": [
                        4288,
                        2848,
                    ],
                    "backgroundImage": {
                        "url": "https://ka-perseus-images.s3.amazonaws.com/07d9e88e1dfccf69ec79f2eec619b886d81cd949.jpg",
                        "width": 1536,
                        "height": 2048,
                    },
                    "labels": [],
                    "alt": "Strawberry ice cream in a cone. ",
                    "caption": "*You might use stoichiometry skills to double an ice cream recipe! Image credit: [Ice Cream](https://commons.wikimedia.org/wiki/File%3ASoft_Ice_cream.jpg) by Kimberley Vardeman on Wikimedia Commons, [CC-BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.en)*",
                },
                "version": {
                    "major": 0,
                    "minor": 0,
                },
            },
        },
    },
    {
        "content": "A second section",
        "images": {},
        "widgets": {},
    },
];
/* eslint-enable max-len */

module.exports = ArticleDiffDemo;
