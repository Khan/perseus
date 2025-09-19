// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    answerArea: {
        calculator: false,
        options: {
            content: "",
        },
        type: "multiple",
    },
    hints: [
        {
            content:
                "The inverse of a matrix is equal to the adjugate of the matrix divided by the determinant of the matrix.\n\n $ \\textbf A^{-1} = \\frac{1}{det(\\textbf A)}adj(\\textbf A) $",
        },
        {
            content:
                "**Step 1: Find the adjugate**\n\n First, compute the matrix of minors of $\\textbf A$.\n\n $ \\left[\\begin{array}{rrr}\\left|\\begin{array}{rr}1 & 1 \\\\ 1 & 1\\end{array}\\right| & \\left|\\begin{array}{rr}0 & 1 \\\\ 1 & 1\\end{array}\\right| & \\left|\\begin{array}{rr}0 & 1 \\\\ 1 & 1\\end{array}\\right| \\\\ \\left|\\begin{array}{rr}0 & 1 \\\\ 1 & 1\\end{array}\\right| & \\left|\\begin{array}{rr}2 & 1 \\\\ 1 & 1\\end{array}\\right| & \\left|\\begin{array}{rr}2 & 0 \\\\ 1 & 1\\end{array}\\right| \\\\ \\left|\\begin{array}{rr}0 & 1 \\\\ 1 & 1\\end{array}\\right| & \\left|\\begin{array}{rr}2 & 1 \\\\ 0 & 1\\end{array}\\right| & \\left|\\begin{array}{rr}2 & 0 \\\\ 0 & 1\\end{array}\\right|\\end{array}\\right] = \\left[\\begin{array}{rrr}0 & -1 & -1 \\\\ -1 & 1 & 2 \\\\ -1 & 2 & 2\\end{array}\\right] $",
        },
        {
            content:
                "Next, multiply the elements of the matrix of minors by the following pattern: \n\n $\\left[\\begin{array}{rrr}+ & - & + \\\\ - & + & - \\\\ + & - & +\\end{array}\\right]$ This gives us what is called the matrix of cofactors:\n\n $ \\left[\\begin{array}{rrr}0 & 1 & -1 \\\\ 1 & 1 & -2 \\\\ -1 & -2 & 2\\end{array}\\right] $",
        },
        {
            content:
                "Next, transpose the matrix of cofactors to get the adjugate.\n\n $ adj(\\textbf A) = \\left[\\begin{array}{rrr}0 & 1 & -1 \\\\ 1 & 1 & -2 \\\\ -1 & -2 & 2\\end{array}\\right]^T = \\left[\\begin{array}{rrr}\\color{\\#6495ED}{0} & \\color{\\#6495ED}{1} & \\color{\\#6495ED}{-1} \\\\ \\color{\\#6495ED}{1} & \\color{\\#6495ED}{1} & \\color{\\#6495ED}{-2} \\\\ \\color{\\#6495ED}{-1} & \\color{\\#6495ED}{-2} & \\color{\\#6495ED}{2}\\end{array}\\right] $",
        },
        {
            content:
                "**Step 2: Find the determinant**\n\n Compute the determinant of the original matrix.\n\n  $ det(\\textbf A) = \\left|\\begin{array}{rrr}2 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & 1\\end{array}\\right|= \\color{\\#DF0030}{-1} $",
        },
        {
            content:
                "**Step 3: Put it all together**\n\n Now that we have both the determinant and the adjugate, we can compute the inverse.\n\n $ \\textbf A^{-1} = \\frac{1}{\\color{\\#DF0030}{-1}} \\left[\\begin{array}{rrr}\\color{\\#6495ED}{0} & \\color{\\#6495ED}{1} & \\color{\\#6495ED}{-1} \\\\ \\color{\\#6495ED}{1} & \\color{\\#6495ED}{1} & \\color{\\#6495ED}{-2} \\\\ \\color{\\#6495ED}{-1} & \\color{\\#6495ED}{-2} & \\color{\\#6495ED}{2}\\end{array}\\right] $",
        },
        {
            content:
                "$ = \\left[\\begin{array}{rrr}0 & -1 & 1 \\\\ -1 & -1 & 2 \\\\ 1 & 2 & -2\\end{array}\\right]$",
        },
    ],
    question: {
        content:
            "$\\textbf A = \\left[\\begin{array}{rrr}2 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & 1\\end{array}\\right]$\n\n ** What is $\\textbf A^{-1}$? **\n\n[[☃ matrix 1]]",
        widgets: {
            "matrix 1": {
                options: {
                    answers: [
                        [0, -1, 1],
                        [-1, -1, 2],
                        [1, 2, -2],
                    ],
                    matrixBoardSize: [3, 3],
                },
            },
        },
    },
};
