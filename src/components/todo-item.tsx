import { state } from "../store/todo";
import { Status, Todo } from "../types/todo";
import { Reactive } from "@legendapp/state/react";

export default function TodoItem({ todo }: { todo: Todo | undefined }) {
  return (
    <Reactive.article
      $className={
        todo?.status === Status.Progress
          ? "border-warning card card-bordered"
          : todo?.status === Status.Done
          ? "border-error card card-bordered"
          : "card card-bordered"
      }
    >
      <div className="card-body p-4">
        {todo?.text}

        <div className="card-actions flex gap-2">
          <select
            className="select flex-1 select-sm select-bordered"
            value={todo?.status}
            onChange={(e) =>
              state.todos.set((todos) =>
                todos.map((todo) => {
                  if (todo.id === todo.id) {
                    return {
                      ...todo,
                      status: e.target.value as Status,
                    };
                  }
                  return todo;
                })
              )
            }
          >
            <option value={Status.Initialized}>Initialized</option>
            <option value={Status.Progress}>Progress</option>
            <option value={Status.Done}>Done</option>
          </select>

          <button
            onClick={() =>
              state.todos.set((todos) =>
                todos.filter((todo) => todo.id !== todo.id)
              )
            }
            className="btn btn-error btn-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </Reactive.article>
  );
}
