// Types that can be shared between Perseus packages
// ideally without causing circular dependencies

// TODO: this should be typed
type State = any;

// Interfact currently only implemented by
// ServerItemRenderer and used by KeypadContext
// to pass around a renderer reference
export interface RendererInterface {
    getSerializedState(): State;
    restoreSerializedState(state: State, callback?: () => void): void;
    scoreInput(): KEScore;
    blur(): void;
    focus(): boolean | null | undefined;
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
