import * as React from "react";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

export type ItemEditorContextType = {
    question: PerseusRenderer;
    onEditorChange: (newProps: any) => void;
};

const defaultItemEditorContext: ItemEditorContextType = {
    question: {content: "", widgets: {}, images: {}},
    onEditorChange: () => {},
};

export const ItemEditorContext = React.createContext<ItemEditorContextType>(
    defaultItemEditorContext,
);

export default function useItemEditorContext(): ItemEditorContextType {
    return React.useContext(ItemEditorContext);
}
