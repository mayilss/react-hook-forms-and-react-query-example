import { Space, Spin } from "antd";
import todoApi from "../../api/todo-api";
import Error from "../../components/error/Error";
import TodoList from "../../components/todo-list/TodoList";
import Heading from "../../components/heading/Heading";
import { PlusCircle } from "lucide-react";

export default function HomePage() {
  const { data, isPending, isError, error } = todoApi.useGetList();

  if (isPending) return <Spin />;
  if (isError) return <Error message={error.message} />;
  return (
    <Space direction="vertical" className="container">
      <Heading>
        <Heading.Title>My Todo List</Heading.Title>
        <Heading.Link tooltip="Add Todo" to="form">
          <PlusCircle color="#f9f9f9" />
        </Heading.Link>
      </Heading>
      <TodoList todos={data} />
    </Space>
  );
}
