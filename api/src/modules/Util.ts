export const minmax = (n : number, min : number, max : number) => 
    Math.min(
        Math.max(
            n,
            min
        ),
        max
    )