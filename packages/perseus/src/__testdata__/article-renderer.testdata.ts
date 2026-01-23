import {
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const singleSectionArticle: PerseusRenderer = {
    content:
        "[[☃ image 2]]\n\n**Part A:** Return to the main characters from your three favorite films. \n\n- What was one important choice they had to make where the stakes were **high**?\n\n-  What were the **stakes**?\n\n- Can you identify them as internal, external or philosophical?\n\n**Part B:** Think about a difficult choice you had to make in your own life.  What was at stake? \n\n**Part C:** Return to one of the obstacles your character might face from the previous exercise. Now think of the **choice** this obstacle forces them to make. Answer the following:\n\n- What are the possible stakes of this choice?\n\n- Can you come up with an internal, external or philosophical stake which applies to this choice? \n",
    images: {},
    widgets: {
        "image 2": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [1258, 703],
                backgroundImage: {
                    url: "https://ka-perseus-images.s3.amazonaws.com/b08029bc1786fbe54468a2ddc96aaa20be7a663a.png",
                    width: 1258,
                    height: 703,
                },
                labels: [],
                alt: 'A scene from Pixar\'s film "Toy Story 3" where the characters are swimming in a sea of trash and look very afraid.',
                caption:
                    'A scene from Pixar\'s film "Toy Story 3" where the characters are swimming in a sea of trash and look very afraid."',
            },
            version: {major: 0, minor: 0},
        },
    },
};

export const articleSectionWithExpression: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 1]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
        widgets: {
            "expression 1": generateExpressionWidget({
                options: generateExpressionOptions({
                    answerForms: [
                        generateExpressionAnswerForm({
                            considered: "correct",
                            form: true,
                            value: "16+88i",
                        }),
                    ],
                }),
            }),
        },
    });

export const multiSectionArticle: PerseusRenderer[] = [
    {
        content:
            "## What is a matrix?\n\nA matrix is a rectangular array of numbers arranged in rows and columns.\n\nMatrices can be useful for organizing and manipulating data. They can also be used as a tool to help solve systems of equations.",
        images: {},
        widgets: {},
    },
    {
        content:
            "## How do we multiply a matrix by a scalar?\n\nTo multiply a matrix by a scalar, we multiply each entry in the matrix by the scalar. For example, if \n\n$A = \\begin{bmatrix} \n2 & 3 \\\\\n1 & 4 \\\\\n\\end{bmatrix}$\n\nand we want to multiply $A$ by $2$, we can multiply each entry by $2$ to get:\n\n$2A = \\begin{bmatrix} \n4 & 6 \\\\\n2 & 8 \\\\\n\\end{bmatrix}$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## How do we add or subtract two matrices?\n\nTo add or subtract two matrices, we add or subtract corresponding entries. So if \n\n$A = \\begin{bmatrix} \n2 & 3 \\\\\n1 & 4 \\\\\n\\end{bmatrix}$ \n\nand \n\n$B = \\begin{bmatrix} \n5 & 2 \\\\\n3 & 1 \\\\\n\\end{bmatrix}$,\n\nthen \n\n$A+B = \\begin{bmatrix} \n7 & 5 \\\\\n4 & 5 \\\\\n\\end{bmatrix}$\n\nand \n\n$A-B = \\begin{bmatrix} \n-3 & 1 \\\\\n-2 & 3 \\\\\n\\end{bmatrix}$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## How do we multiply two matrices together?\n\nThis one's a bit trickier. To multiply two matrices together, we take the dot product of the rows from the first matrix with the columns from the second matrix. The result is a new matrix. For example, if \n\n$A = \\begin{bmatrix} \n2 & 3 \\\\\n1 & 4 \\\\\n\\end{bmatrix}$ \n\nand \n\n$B = \\begin{bmatrix} \n5 & 2 \\\\\n3 & 1 \\\\\n\\end{bmatrix}$,\n\nthen \n\n$AB = \\begin{bmatrix} \n2\\cdot5+3\\cdot3 & 2\\cdot2+3\\cdot1 \\\\\n1\\cdot5+4\\cdot3 & 1\\cdot2+4\\cdot1 \\\\\n\\end{bmatrix} = \\begin{bmatrix} \n19 & 7 \\\\\n17 & 6 \\\\\n\\end{bmatrix}.$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## What can we do with the inverse of a matrix?\n\nFinding the inverse of a matrix can be useful for solving linear systems of equations. If $A$ is the matrix representing the system of equations, and $b$ is the vector of solutions, then $Ax=b$. If we can find the inverse of $A$, we can multiply both sides of the equation by it to isolate $x$:\n\n$A^{-1}Ax=A^{-1}b \\Rightarrow x=A^{-1}b.$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## Where are matrices used in the real world?\n\nMatrices have tons of real-world applications! They can be used in computer graphics to perform transformations on images, in physics to model physical systems, and in statistics to analyze data, just to name a few.",
        images: {},
        widgets: {},
    },
];

export const multiSectionArticleWithExpression: PerseusRenderer[] = [
    generateTestPerseusRenderer({
        content:
            "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 1]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
        widgets: {
            "expression 1": generateExpressionWidget({
                options: generateExpressionOptions({
                    answerForms: [
                        {
                            considered: "correct",
                            form: true,
                            simplify: false,
                            value: "16+88i",
                        },
                    ],
                }),
            }),
        },
    }),
    generateTestPerseusRenderer({
        content:
            "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 2]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
        widgets: {
            "expression 2": generateExpressionWidget({
                options: generateExpressionOptions({
                    answerForms: [
                        {
                            considered: "correct",
                            form: true,
                            simplify: false,
                            value: "16+88i",
                        },
                    ],
                }),
            }),
        },
    }),
    generateTestPerseusRenderer({
        content:
            "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 3]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
        widgets: {
            "expression 3": generateExpressionWidget({
                options: generateExpressionOptions({
                    answerForms: [
                        {
                            considered: "correct",
                            form: true,
                            simplify: false,
                            value: "16+88i",
                        },
                    ],
                }),
            }),
        },
    }),
];
