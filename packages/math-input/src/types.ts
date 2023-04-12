import {BorderDirections} from "./consts";

export type Borders = Partial<Array<keyof typeof BorderDirections>>;
