import { Status, Todo } from "./types/todo";
import { useObservable } from "@legendapp/state/react";

console.log("rernder outside app");

export default function App() {
  console.log("rernder inside app");
  const todos = useObservable<Todo[]>([]);
  const input = useObservable("");
  const handleAddTodo = () => {
    todos.push({
      id: crypto.randomUUID(),
      status: Status.Initialized,
      text: input.get(),
    });
    input.set("");
    console.log(todos.get());
  };

  const handleRemoveTodo = (id: string) => {
    todos.set((todos) => todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id: string, status: Status) => {
    todos.set((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status,
          };
        }
        return todo;
      })
    );
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
          <input
            value={input.use()}
            onChange={(ev) => input.set(ev.target.value)}
            className="input input-bordered w-full"
          />
          <button onClick={handleAddTodo} className="btn btn-primary">
            Add
          </button>
        </section>

        <section className="mt-8">
          <div className="grid grid-cols-1 gap-2">
            {todos.use().map((todo) => (
              <article
                className={`card card-bordered ${
                  todo.status === Status.Progress
                    ? "border-warning"
                    : todo.status === Status.Done
                    ? "border-error"
                    : "border-primary"
                }`}
                key={todo.id}
              >
                <div className="card-body p-4">
                  {todo.text}

                  <div className="card-actions flex gap-2">
                    <select
                      className="select flex-1 select-sm select-bordered"
                      value={todo.status}
                      onChange={(e) =>
                        handleUpdateTodo(todo.id, e.target.value as Status)
                      }
                    >
                      <option value={Status.Initialized}>Initialized</option>
                      <option value={Status.Progress}>Progress</option>
                      <option value={Status.Done}>Done</option>
                    </select>

                    <button
                      onClick={() => handleRemoveTodo(todo.id)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
