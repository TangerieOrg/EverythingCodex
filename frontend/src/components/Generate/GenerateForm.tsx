import { GenerateStore, useGenerateStore } from "@modules/GenerateStore";

export default function GenerateForm() {
    const { actions, value } = useGenerateStore();

    const setKey = <K extends keyof GenerateStore["value"]>(k : K) => (ev : any) => {
        if (ev.target.value === undefined || ev.target.value.trim().length === 0) actions.delete(k);
        else actions.set(k, ev.target.value)
    }
    return <div class="w-full grid grid-cols-1 gap-y-4">
        <div>
            <label>Title</label>
            <input
                type="text"
                placeholder="Title"
                value={value.title ?? ""}
                className="form-input input-themed light mt-2 block w-full"
                onChange={setKey("title")}
            />
        </div>
        <div>
            <label>Format</label>
            <input
                type="text"
                placeholder="Format"
                value={value.format ?? ""}
                className="form-input input-themed light mt-2 block w-full"
                onChange={setKey("format")}
            />
        </div>
        <div>
            <label>Category</label>
            <input
                type="text"
                placeholder="Category"
                value={value.category ?? ""}
                className="form-input input-themed light mt-2 block w-full"
                onChange={setKey("category")}
            />
        </div>
        <div>
            <label>Summary</label>
            <textarea 
                placeholder="Summary"
                value={value.summary ?? ""}
                className="form-textarea input-themed light mt-2 block w-full min-h-[10rem]"
                onChange={setKey("summary")}
            />
        </div>
        <button
            class="text-gray-600 mt-2 hover:underline text-left ml-1"
            onClick={() => {
                actions.reset();
            }}
        >
            Clear
        </button>
    </div>
}