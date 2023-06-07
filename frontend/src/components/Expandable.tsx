import { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
    open : boolean;
    children?: ComponentChildren;
    class?: string;
}

export default function Expandable({ open, children, ...props } : Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if(open) {
            setHeight(divRef.current!.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [open]);

    return <div class={`overflow-y-hidden transition-[height] ${props.class}`} ref={divRef} style={{ height }}>
        {children}
    </div>
}