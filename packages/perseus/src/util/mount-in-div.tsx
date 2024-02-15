import * as React from "react";
import {useLayoutEffect, useRef} from "react";

type Props = {
    element: HTMLElement;
};

export function MountInDiv(props: Props): React.ReactElement {
    const {element} = props;
    const containerRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (containerRef.current != null) {
            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(element);
        }
    }, [containerRef, element]);
    return <div ref={containerRef} />;
}
