import { createSignal, type Component } from "solid-js";


interface Props {
    initValue?: number;
}

export const Counter: Component<Props> = (props) => {

    const [count, setCount] = createSignal(props.initValue || 0);

    return (
        <>
            <h1>Counter</h1>
            <p>Count: {count()}</p>
            <button class="bg-blue-500 p-2 mr-2 rounded" onClick={() => setCount(count() + 1)}>Increment</button>
            <button class="bg-blue-500 p-2 mr-2 rounded" onClick={() => setCount(count() - 1)}>Decrement</button>
        </>
    );
};