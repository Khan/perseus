import type Key from "../../data/keys";

export interface MathQuillInterface {
    L: -1;
    R: 1;

    /**
     * Creates an editable MathQuill initialized with the contents of the HTML
     * element and returns a MathField object.
     *
     * If the given element is already an editable math field, this will return
     * a new editable MathField object with the same `.id`. If the element is a
     * different type of MathQuill, this will return `null`.
     */
    MathField: (
        mount: HTMLDivElement | HTMLSpanElement,
        config: MathFieldConfig,
    ) => MathFieldInterface;
}

type MathQuillDirection = MathQuillInterface["L"] | MathQuillInterface["R"];

export type MathFieldConfig = {
    /**
     * If spaceBehavesLikeTab is true the keystrokes {Shift-,}Spacebar will
     * behave like {Shift-,}Tab escaping from the current block (as opposed
     * to the default behavior of inserting a Space character).
     */
    spaceBehavesLikeTab?: boolean;

    /**
     * This allows you to change the way the left and right keys move the
     * cursor when there are items of different height, like fractions.
     *
     * By default, the Left and Right keys move the cursor through all
     * possible cursor positions in a particular order: right into a
     * fraction puts the cursor at the left end of the numerator, right out
     * of the numerator puts the cursor at the left end of the denominator,
     * and right out of the denominator puts the cursor to the right of the
     * fraction. Symmetrically, left into a fraction puts the cursor at the
     * right end of the denominator, etc.
     *
     * If instead you want right to always visually go right, and left to always go
     * visually left, you can set leftRightIntoCmdGoes to 'up' or 'down' so that
     * left and right go up or down (respectively) into commands. For example, 'up'
     * means that left into a fraction goes up into the numerator and right out of
     * the numerator skips the denominator and puts the cursor to the right of the
     * fraction. This behavior can be seen in the Desmos calculator. If this
     * property is set to 'down' instead, the numerator is harder to navigate to,
     * like in the Mac OS X built-in app Grapher.
     */
    leftRightIntoCmdGoes?: "up" | "down";

    /**
     * If restrictMismatchedBrackets is true then you can type [a,b) and
     * (a,b], but if you try typing [x} or \langle x|, you'll get [{x}] or
     * \langle|x|\rangle instead. This lets you type (|x|+1) normally;
     * otherwise, you'd get \left( \right| x \left| + 1 \right).
     */
    restrictMismatchedBrackets?: boolean;

    /**
     * If sumStartsWithNEquals is true then when you type \sum, \prod, or
     * \coprod, the lower limit starts out with n=, e.g. you get the LaTeX
     * \sum_{n=}^{ }, rather than empty by default.
     */
    sumStartsWithNEquals?: boolean;

    /**
     * supSubsRequireOperand disables typing of superscripts and subscripts
     * when there's nothing to the left of the cursor to be exponentiated
     * or subscripted. Prevents the especially confusing typo x^^2, which
     * looks much like x^2.
     */
    supSubsRequireOperand?: boolean;

    /**
     * charsThatBreakOutOfSupSub takes a string of the chars that when
     * typed, "break out" of superscripts and subscripts.
     *
     * Normally, to get out of a superscript or subscript, a user has to
     * navigate out of it with the directional keys, a mouse click, tab, or
     * Space if spaceBehavesLikeTab is true. For example, typing x^2n+y
     * normally results in the LaTeX x^{2n+y}. If you wanted to get the
     * LaTeX x^{2n}+y, the user would have to manually move the cursor out
     * of the exponent.
     *
     * If this option was set to '+-', + and - would "break out" of the
     * exponent. This doesn't apply to the first character in a superscript
     * or subscript, so typing x^-6 still results in x^{-6}. The downside
     * to setting this option is that in order to type x^{n+m}, a
     * workaround like typing x^(n+m and then deleting the ( is required.
     */
    charsThatBreakOutOfSupSub?: string;

    /**
     * :shrug: Undocumented except for being shown in an example for
     * configuration options.
     */
    autoSubscriptNumerals?: boolean;

    /**
     * autoCommands defines the set of commands automatically rendered by
     * just typing the letters without typing a backslash first.
     *
     * This takes a string formatted as a space-delimited list of LaTeX
     * commands. Each LaTeX command must be at least letters only with a
     * minimum length of 2 characters.
     *
     * For example, with autoCommands set to 'pi theta', the word 'pi'
     * automatically converts to the pi symbol and the word 'theta'
     * automatically converts to the theta symbol.
     */
    autoCommands?: string;

    /**
     * autoOperatorNames overrides the set of operator names that
     * automatically become non-italicized when typing the letters without
     * typing a backslash first, like sin, log, etc.
     *
     * This defaults to the LaTeX built-in operator names (Section 3.17 of
     * the Short Math Guide) with additional trig operators like sech,
     * arcsec, arsinh, etc. If you want some of these italicized after
     * setting this property, you will have to add them to the list.
     *
     * Just like autoCommands above, this takes a string formatted as a
     * space-delimited list of LaTeX commands.
     */
    autoOperatorNames?: string;

    /**
     * maxDepth specifies the maximum number of nested MathBlocks. When
     * maxDepth is set to 1, the user can type simple math symbols directly
     * into the editor but not into nested MathBlocks, e.g. the numerator
     * and denominator of a fraction.
     *
     * Nested content in latex rendered during initialization or pasted
     * into mathquill is truncated to avoid violating maxDepth. When
     * maxDepth is not set, no depth limit is applied by default.
     */
    maxDepth?: number;

    /**
     * substituteTextarea is a function that creates a focusable DOM
     * element that is called when setting up a math field. Overwriting
     * this may be useful for hacks like suppressing built-in virtual
     * keyboards. It defaults to <textarea autocorrect=off .../>.
     *
     * For example, Desmos substitutes <span tabindex=0></span> on iOS to
     * suppress the built-in virtual keyboard in favor of a custom math
     * keypad that calls the MathQuill API. Unfortunately there's no
     * universal check for a virtual keyboard or way to detect a
     * touchscreen, and even if you could, a touchscreen ≠ virtual keyboard
     * (Windows 8 and ChromeOS devices have both physical keyboards and
     * touchscreens and iOS and Android devices can have Bluetooth
     * keyboards). Desmos currently sniffs the user agent for iOS, so
     * Bluetooth keyboards just don't work in Desmos on iOS. The tradeoffs
     * are up to you.
     */
    substituteTextarea?: () => HTMLElement | undefined;

    /**
     * Handlers are called after a specified event. They are called
     * directly on the handlers object passed in, preserving the this value
     */
    handlers?: {
        edit?: (mathField: MathFieldInterface) => void;
        enter?: (mathField: MathFieldInterface) => void;

        moveOutOf?: (
            direction: MathQuillDirection,
            mathField: MathFieldInterface,
        ) => void;
        upOutOf?: (mathField: MathFieldInterface) => void;
        downOutOf?: (mathField: MathFieldInterface) => void;

        deleteOutOf?: (
            direction: MathQuillDirection,
            mathField: MathFieldInterface,
        ) => void;
        selectOutOf?: (
            direction: MathQuillDirection,
            mathField: MathFieldInterface,
        ) => void;
    };
};

/**
 * Editable math fields have all of the above methods in addition to
 * the ones listed here.
 * https://docs.mathquill.com/en/latest/Api_Methods/
 */
export interface MathFieldInterface {
    /**
     * Any element that has been turned into a MathQuill instance can be
     * reverted.
     */
    revert: () => void;

    /**
     * MathQuill uses computed dimensions, so if they change (because an
     * element was mathquill-ified before it was in the visible HTML DOM, or
     * the font size changed), then you'll need to tell MathQuill to recomput
     */
    reflow: () => void;

    /** Returns the root HTML element. */
    el: () => HTMLElement;

    /**
     * Puts the focus on the editable field.
     * http://docs.mathquill.com/en/latest/Api_Methods/#focus
     */
    focus: () => MathFieldInterface;

    /**
     * Removes focus from the editable field.
     * http://docs.mathquill.com/en/latest/Api_Methods/#blur
     */
    blur: () => MathFieldInterface;

    /**
     * Write the given LaTeX at the current cursor position. If the
     * cursor does not have focus, writes to last position the cursor
     * occupied in the editable field.
     *
     * ```
     * // writes ' - 1' to mathField at the cursor position
     * mathField.write(' - 1');
     * ```
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#writelatex_string
     */
    write: (latex_string: string) => MathFieldInterface;

    /**
     * Enter a LaTeX command at the current cursor position or with the
     * current selection. If the cursor does not have focus, it writes it
     * to last position the cursor occupied in the editable field.
     *
     * ```
     * // writes a square root command at the cursor position
     * mathField.cmd('\\sqrt');
     * ```
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#cmdlatex_string
     */
    cmd: (latex_string: string) => MathFieldInterface;

    /**
     * Selects the contents (just like on textareas and on inputs).
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#select
     */
    select: () => void;

    /**
     * Clears the selection.
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#clearselection
     */
    clearSelection: () => void;

    /**
     * Move the cursor to the left end of the editable field. horthand
     * for .moveToDirEnd(L)
     */
    moveToLeftEnd: () => void;

    /**
     * Move the cursor to the right end of the editable field. horthand
     * for .moveToDirEnd(R)
     */
    moveToRightEnd: () => void;

    /**
     * Moves the cursor to the end of the mathfield in the direction
     * specified. The direction can be one of MQ.L or MQ.R. These are
     * constants, where MQ.L === -MQ.R and vice versa. This function
     * may be easier to use than moveToLeftEnd or moveToRightEnd if
     * used in the moveOutOf handler.
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#movetodirenddirection
     */
    moveToDirEnd: (direction: MathQuillDirection) => void;

    /**
     * Simulates keystrokes given a string like "Ctrl-Home Del", a
     * whitespace-delimited list of key inputs with optional prefixes.
     *
     * ```
     * mathField.keystroke('Shift-Left'); // Selects character before the current cursor position
     * ```
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#keystrokekeys
     */
    keystroke: (keys: string) => MathFieldInterface;

    /**
     * Simulates typing text, one character at a time from where the
     * cursor currently is. This is supposed to be identical to what
     * would happen if a user were typing the text in.
     *
     * Types part of the demo from mathquill.com without delays between keystrokes
     * ```
     * mathField.typedText('x=-b\\pm \\sqrt b^2 -4ac');
     * ```
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#typedtexttext
     */
    typedText: (text: string) => MathFieldInterface;

    /**
     * When called withot any pramaters, gets the contents as LaTeX
     * When passed a string, sets the contents as LaTeX
     *
     * https://docs.mathquill.com/en/latest/Api_Methods/#latex
     */
    latex: (input?: string) => string;

    /** Changes the configuration of just this math field. */
    config: (new_config: MathFieldConfig) => void;

    /**
     * KA Custom helper in our MathQuill fork check to see if cursor is on
     * right end
     */
    cursorAtRightEnd: () => boolean;

    /**
     * KA Custom helper in our MathQuill fork check to see if cursor is on left
     * end
     */
    cursorAtLeftEnd: () => boolean;

    /**
     * This isn't part of the MathQuill public API
     * I don't know what it is and it feels wrong using it
     *
     * @deprecated This is internal and shouldn't be used.
     */
    __controller: any;
}

export enum MathFieldActionType {
    WRITE = "write",
    CMD = "cmd",
    KEYSTROKE = "keystroke",
    MQ_END = 0,
}

/**
 * The MathQuill MathField Cursor
 * it's not part of the public API for MathQuill,
 * we reach into the internals to get it
 */
export type MathFieldCursor = any;

export type MathFieldUpdaterCallback = (
    mathField: MathFieldInterface,
    key: Key,
) => void;
