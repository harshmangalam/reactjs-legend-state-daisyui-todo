import TodoItem from "./components/todo-item";
import { state } from "./store/todo";
import { Status } from "./types/todo";
import { For, Reactive, useObservable } from "@legendapp/state/react";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";

enableReactComponents();

export default function App() {
  const input = useObservable("");
  const handleAddTodo = () => {
    state.todos.push({
      id: crypto.randomUUID(),
      status: Status.Initialized,
      text: input.get(),
    });
    input.set("");
  };

  return (
    <div className="min-h-screen h-full bg-base-100 py-8">
      <div className="max-w-xl mx-auto">
        <section className="flex flex-col gap-y-2 items-center  text-center">
          <h1 className="font-bold text-3xl">Todo</h1>
          <p className="text-xl">
            Todo web app build with React | Vite | Legend State | Tailwindcss |
            Daisyui
          </p>
        </section>

        <section className="mt-8 flex items-center gap-2">
          <Reactive.input
            autoFocus
            placeholder="Start typing..."
            $value={input}
            className="input input-bordered w-full"
          />
          <button onClick={handleAddTodo} className="btn btn-primary">
            Add
          </button>
        </section>

        <section className="mt-8">
          <div className="grid grid-cols-1 gap-2">
            <For each={state.todos}>
              {(todo) => <TodoItem todo={todo.get()} />}
            </For>
          </div>
        </section>
      </div>
    </div>
  );
}
