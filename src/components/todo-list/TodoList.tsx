import { Space, Typography } from "antd";
import TodoItem from "../../components/todo/Todo";
import { Todo } from "../../models";

const { Title } = Typography;

type TodoListProps = {
  todos: Todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  return (
    <Space direction="vertical">
      <Title>My Todo List</Title>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </Space>
  );
}
