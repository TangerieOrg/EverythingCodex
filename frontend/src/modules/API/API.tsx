const API_ROOT: string = process.env.API_ROOT as string;

export const getUrl = (url: string) => `${API_ROOT}${url}`

const decoder = new TextDecoder()


export function createResponseReader(onChunk: (chunk: string) => any, onFinish?: () => any) {
    return (response: Response) => {
        const reader = response.body!.getReader();

        return new ReadableStream({
            start(controller) {
                return pump();
                function pump(): any {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            onFinish?.();
                            return;
                        }

                        onChunk(decoder.decode(value))

                        controller.enqueue(value);
                        return pump();
                    })
                }
            },
        })
    }
}

// export type APIContextType = {

// }

// const APIContext = createSafeContext<APIContextType>();

// export const APIProvider = ({ children } : ChildrenProps) => {
//     const value = useMemo(() => ({

//     }), []);

//     return <APIContext.Provider value={value}>{children}</APIContext.Provider>
// }

// export const useAPI = () => useSafeContext(APIContext);



