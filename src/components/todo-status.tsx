import { state } from "../store/todo";
import { Status } from "../types/todo";

export default function TodoStatus({
  id,
  status,
}: {
  id: string | undefined;
  status: Status | undefined;
}) {
  const handleChangeStatus = (status: Status) => {
    state.todos.set((todos) =>
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
    <select
      className="select flex-1 select-sm select-bordered"
      value={status}
      onChange={(e) => handleChangeStatus(e.target.value as Status)}
    >
      <option value={Status.Initialized}>Initialized</option>
      <option value={Status.Progress}>Progress</option>
      <option value={Status.Done}>Done</option>
    </select>
  );
}
