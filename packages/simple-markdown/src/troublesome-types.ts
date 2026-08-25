export type Capture =
    | (Array<string> & {
          index: number;
      })
    | (Array<string> & {
          index?: number;
      });

export interface State {
    key?: string | number | undefined;
    inline?: boolean | null | undefined;
    [key: string]: any;
}

export type MatchFunction = {
    regex?: RegExp;
} & ((
    source: string,
    state: State,
    prevCapture: string,
) => Capture | null | undefined);
