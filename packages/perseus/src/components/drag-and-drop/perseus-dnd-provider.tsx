/* eslint-disable no-console */
import {DragDropProvider} from "@dnd-kit/react";
import * as React from "react";

type Props = {
    children: React.ReactNode;
};

export const PerseusDndProvider = (props: Props) => {
    return (
        <DragDropProvider
            onDragStart={({operation}) => {
                console.log("Started dragging", operation.source?.id);
            }}
            onDragMove={({operation}) => {
                const {position} = operation;
                console.log("Current position:", position);
            }}
            onDragOver={({operation}) => {
                const {source, target} = operation;
                console.log(`${source?.id} is over ${target?.id}`);
            }}
            onDragEnd={({operation}) => {
                const {source, target} = operation;
                if (target) {
                    console.log(`Dropped ${source?.id} onto ${target.id}`);
                }
            }}
        >
            {props.children}
        </DragDropProvider>
    );
};
