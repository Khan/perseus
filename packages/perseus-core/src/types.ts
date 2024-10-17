// Types that can be shared between Perseus packages
// ideally without causing circular dependencies

import type {RendererPromptJSON} from "@khanacademy/perseus";

// Used by KeypadContext to pass around a renderer reference
export interface KeypadContextRendererInterface {
    blur(): void;
}

// TODO: this should be typed
type State = any;

// Interfact currently only implemented by
// ServerItemRenderer
export interface RendererInterface {
    getSerializedState(): State;
    restoreSerializedState(state: State, callback?: () => void): void;
    scoreInput(): KEScore;
    blur(): void;
    focus(): boolean | null | undefined;
    getPromptJSON(): RendererPromptJSON;
    props: any;
}

export type KEScore = {
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
};
