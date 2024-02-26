import { Space, Spin } from "antd";
import todoApi from "../../api/todo-api";
import Error from "../../components/error/Error";
import TodoList from "../../components/todo-list/TodoList";

export default function HomePage() {
  const { data, isPending, isError, error } = todoApi.useGetTodos();

  if (isPending) return <Spin />;
  if (isError) return <Error message={error.message} />;
  return (
    <Space direction="vertical">
      <TodoList todos={data} />
    </Space>
  );
}
