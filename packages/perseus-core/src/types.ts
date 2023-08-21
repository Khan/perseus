// Types that can be shared between Perseus packages
// ideally without causing circular dependencies

// Interface currently only implemented by
// ServerItemRenderer and used by KeypadContext
// to pass around a renderer reference
export interface KeypadContextRendererInterface {
    blur(): void;
}

export type KEScore = {
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
};
