import { ComponentChildren } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

interface Props {
    open : boolean;
    children?: ComponentChildren;
    class?: string;
    openClass?: string;
    closedClass?: string;
}

export default function Expandable({ open, children, openClass = "", closedClass = "", ...props } : Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<string | number>(0);

    useEffect(() => {
        if(open) {
            setHeight(divRef.current!.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [open]);

    useEffect(() => {
        if(!open || !divRef.current) return;
        const resizeObserver = new ResizeObserver(el => {
            setHeight(el[0].contentRect.height)
        })
        resizeObserver.observe(divRef.current);
        return () => resizeObserver.disconnect();
    }, [height, open]);

    

    return <div class={`overflow-y-hidden transition-[height] ${props.class ?? ""} ${open ? openClass : closedClass}`}  style={{ height }}>
        <div ref={divRef}>
            {children}
        </div>
    </div>
}


// export default function Expandable({ open, children, ...props } : Props) {
//     const divRef = useRef<HTMLDivElement | null>(null);
//     const [height, setHeight] = useState<string | number>(0);

//     const onTransitionEnd = useCallback(() => {
//         if(open) setHeight('auto');
//     }, [height]);

//     useEffect(() => {
//         if(open) {
//             setHeight(divRef.current!.scrollHeight);
//         } else {
//             setHeight(divRef.current!.scrollHeight);
//             setTimeout(() => {
//                 setHeight(0);
//             }, 10)
//         }
//     }, [open]);

    

//     return <div class={`overflow-y-hidden transition-[height] ${props.class ?? ""}`} ref={divRef} style={{ height }} onTransitionEnd={onTransitionEnd}>
//         {children}
//     </div>
// }