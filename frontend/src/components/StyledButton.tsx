import { JSX } from "preact";

const styles = {
    Purple: "border-purple-600 text-purple-600 hover:bg-purple-600",
    Green: "border-green-600 text-green-600 hover:bg-green-600",
    Blue: "border-blue-600 text-blue-600 hover:bg-blue-600",
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