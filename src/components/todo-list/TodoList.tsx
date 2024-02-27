import TodoItem from "../../components/todo/Todo";
import { ITodo } from "../../models";

type TodoListProps = {
  todos: ITodo[];
};

export default function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
