import { state } from "../store/todo";
import { Status, Todo } from "../types/todo";
import { Reactive } from "@legendapp/state/react";
import TodoStatus from "./todo-status";

export default function TodoItem({ todo }: { todo: Todo | undefined }) {
  const handleRemoveTodo = () => {
    state.todos.set((todos) => todos.filter((t) => t.id !== todo?.id));
  };
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
          <TodoStatus id={todo?.id} status={todo?.status} />

          <button onClick={handleRemoveTodo} className="btn btn-error btn-sm">
            Remove
          </button>
        </div>
      </div>
    </Reactive.article>
  );
}
