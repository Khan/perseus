// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "Congratulations on all you've learned about systems of equations!\n\nOur strategic supplement version of algebra 1 is for students who are getting classroom instruction in algebra and only using Khan Academy for a short time each week. We only included select exercises, videos, and articles to help you focus your limited time.\n\nIn case you would like a fuller experience, here is a taste of a skill you can learn in our full algebra 1 course.",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [
        {
            replace: false,
            content:
                "##Scaling equations to solve systems of equations with elimination\n\n###What is it, and why is it useful?\n\nThe elimination strategy is a popular method for mathematicians who like working with integers. When the coefficients of a variable are already opposites,  we can just add the equations to get a new equation without that variable. Otherwise, we may want to multiply both sides of one equation (or both) by a constant so that we do get opposite coefficients.\n\n###Practice\n\nIf you haven't practiced [Systems of equations with elimination](/e/systems_of_equations_with_elimination_0.5?getready=pre) yet, we suggest you do that first.\n\n\n\n[[☃ graded-group-set 2]]\n\nFor more practice, go to [Systems of equations with elimination challenge](/e/systems_of_equations_with_elimination?getready=post).",
            images: {},
            widgets: {
                "graded-group-set 2": {
                    type: "graded-group-set",
                    alignment: "default",
                    static: false,
                    graded: true,
                    options: {
                        gradedGroups: [
                            {
                                title: "Problem 1.1",
                                content:
                                    "**Solve the system of equations.**\n\n$\\begin{align}\n&-5x-3y +9 =0\n\\\\\\\\\n&4x-18y-14=0\n\\end{align}$\n\n$x=$ [[☃ numeric-input 1]]\n\n$y=$ [[☃ numeric-input 2]]",
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
                                                    value: 2,
                                                    status: "correct",
                                                    message: "",
                                                    simplify: "required",
                                                    strict: false,
                                                    maxError: null,
                                                },
                                            ],
                                            size: "small",
                                            coefficient: false,
                                            labelText: "value of x",
                                            multipleNumberInput: false,
                                            rightAlign: false,
                                        },
                                        version: {
                                            major: 0,
                                            minor: 0,
                                        },
                                    },
                                    "numeric-input 2": {
                                        type: "numeric-input",
                                        alignment: "default",
                                        static: false,
                                        graded: true,
                                        options: {
                                            static: false,
                                            answers: [
                                                {
                                                    value: -0.3333333333333333,
                                                    status: "correct",
                                                    message: "",
                                                    simplify: "required",
                                                    strict: false,
                                                    maxError: null,
                                                    answerForms: [
                                                        "proper",
                                                        "improper",
                                                    ],
                                                },
                                            ],
                                            size: "small",
                                            coefficient: false,
                                            labelText: "value of y",
                                            multipleNumberInput: false,
                                            rightAlign: false,
                                        },
                                        version: {
                                            major: 0,
                                            minor: 0,
                                        },
                                    },
                                },
                                images: {},
                                hint: {
                                    content:
                                        "Let's solve the system by using the *elimination method.* In order to eliminate one of the variables, we need to manipulate the equations so that variable has coefficients of the same size but opposite signs in each equation.\n\nLet's take a look at the system:\n\n$\\begin{align}\n&-5x-3y + 9=0\n\\\\\\\\\n&4x-18y-14=0\n\\end{align}$\n\nThe coefficient of $y$ in the second equation, $-18$, is exactly $6$ times the coefficient of $y$ in the first equation, $-3$. Therefore, we can multiply the first equation by $\\purpleD{-6}$ in order to eliminate $y$.\n\n$\\begin{align} \\purpleD{-6}\\cdot(-5x)-(\\purpleD{-6})\\cdot3y+(\\purpleD{-6})\\cdot 9&=(\\purpleD{-6})\\cdot0\\\\\\\\\n30x+18y-54&=0\\end{align}$\n\nNow we can eliminate $y$ as follows:\n\n$\\begin{align} {30x}+\\maroonD{18y} -54&=0 \\\\\\\\\n\\underline{{}\\tealE{+}\n\\left({4x}-\\maroonD{18y}-14\\right)}&=\\underline{{}\\tealE{+}0}\\\\\n34x-0 -68&=0\\end{align}$\n\nWhen we solve the resulting equation we obtain that $x = 2$. Then, we can substitute this into one of the original equations and solve for $y$ to obtain $y=-\\dfrac{1}{3}$.\n\nThis is the solution of the system:\n\n$\\begin{align}\n&x=2\n\\\\\\\\\n&y=-\\dfrac{1}{3}\n\\end{align}$",
                                    widgets: {},
                                },
                                widgetEnabled: true,
                                immutableWidgets: false,
                            },
                            {
                                title: "Problem 1.2",
                                content:
                                    "**Solve the system of equations.**\n\n$\\begin{align}\n&9x-5y = -55\n\\\\\\\\\n&-7x+8y=51\n\\end{align}$\n\n$x=$ [[☃ numeric-input 1]]\n\n$y=$ [[☃ numeric-input 2]]",
                                widgets: {
                                    "numeric-input 1": {
                                        type: "numeric-input",
                                        version: {
                                            major: 0,
                                            minor: 0,
                                        },
                                        graded: true,
                                        alignment: "default",
                                        static: false,
                                        options: {
                                            static: false,
                                            answers: [
                                                {
                                                    value: -5,
                                                    status: "correct",
                                                    message: "",
                                                    simplify: "required",
                                                    strict: false,
                                                    maxError: null,
                                                },
                                            ],
                                            size: "small",
                                            coefficient: false,
                                            labelText: "value of x",
                                            multipleNumberInput: false,
                                            rightAlign: false,
                                        },
                                    },
                                    "numeric-input 2": {
                                        type: "numeric-input",
                                        version: {
                                            major: 0,
                                            minor: 0,
                                        },
                                        graded: true,
                                        alignment: "default",
                                        static: false,
                                        options: {
                                            static: false,
                                            answers: [
                                                {
                                                    value: 2,
                                                    status: "correct",
                                                    message: "",
                                                    simplify: "required",
                                                    strict: false,
                                                    maxError: null,
                                                },
                                            ],
                                            size: "small",
                                            coefficient: false,
                                            labelText: "value of y",
                                            multipleNumberInput: false,
                                            rightAlign: false,
                                        },
                                    },
                                },
                                images: {},
                                hint: {
                                    content:
                                        "Let's solve the system by using the *elimination method.* In order to eliminate one of the variables, we need to manipulate the equations so that variable has coefficients of the same size but opposite signs in each equation.\n\nLet's take a look at the system:\n\n$\\begin{align}\n&9x-5y = -55\n\\\\\\\\\n&-7x+8y=51\n\\end{align}$\n\nSince the coefficients of either variable aren't multiples of each other, we must multiply both equations in order to eliminate a variable of our choice. Let's eliminate $y$.\n\nSince the *least common multiple* of the coefficients of $y$ in the two equations is $-40$, we can *multiply* the first equation by $\\purpleD{8}$ and the second equation by $\\tealE{5}$ in order to eliminate $y$.\n\n$ \\begin{align}\\purpleD{8}\\cdot9x-\\purpleD{8}\\cdot5y&=\\purpleD{8}\\cdot(-55)\\\\\\\\\n72x-40y&=-440\\end{align}$\n\n$ \\begin{align} \\tealE{5}\\cdot(-7x)+\\tealE{5}\\cdot8y&=\\tealE{5}\\cdot 51\\\\\\\\\n-35x+40y&=255\\end{align}$\n\nNow we can eliminate $y$ as follows:\n\n$\\begin{align} {72x}-\\maroonD{40y} &= -440 \\\\\\\\\n\\underline{{}\\blueE{+}\n{-35x}+\\maroonD{40y}}&=\\underline{{}\\blueE{+}255}\\\\\\\\\n37x-0 &=-185\\end{align}$\n\nWhen we solve the resulting equation we obtain that $x = -5$. Then, we can substitute this into one of the original equations and solve for $y$ to obtain $y=2$.",
                                    widgets: {},
                                },
                                widgetEnabled: true,
                                immutableWidgets: false,
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
        {
            replace: false,
            content:
                "##Why wasn't this exercise part of the strategic supplement course?\n\nIt is possible to solve any system of linear equations using the substitution method as long as you're comfortable working with fractions in your equations.",
            images: {},
            widgets: {},
        },
    ],
};
