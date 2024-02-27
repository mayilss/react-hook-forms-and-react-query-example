import { Space } from "antd";
import TodoItem from "../../components/todo/Todo";
import { Todo } from "../../models";

type TodoListProps = {
  todos: Todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  return (
    <Space direction="vertical">
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </Space>
  );
}
