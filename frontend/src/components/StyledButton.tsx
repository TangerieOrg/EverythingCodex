import { JSX } from "preact";

const styles = {
    Purple: "border-purple-600 text-purple-600 hover:bg-purple-600"
}

interface Props extends ChildrenProps {
    class?: string;
    style: keyof typeof styles;
}

export default function StyledButton({children, style, ...props} : Props & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "style">) {
    return <button 
        {...props}
        class={`px-6 py-3 rounded-lg border-2 hover:text-white transition ${styles[style]} ${props.class}`}
    >
        {children}
    </button>
}