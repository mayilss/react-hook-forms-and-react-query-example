import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Space, Spin } from "antd";
import { Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import statusApi from "../../api/status-api";
import todoApi from "../../api/todo-api";
import Error from "../../components/error/Error";
import Heading from "../../components/heading/Heading";
import Input from "../../components/input/Input";
import helpers from "../../helpers";
import hooks from "../../hooks";
import { ITodo } from "../../models";
import validationSchema from "./validationSchema";

export default function TodoForm() {
  const { id } = useParams();

  const methods = useForm<ITodo>({
    defaultValues: {
      title: "",
      description: "",
      statusId: "1",
    },
    resolver: yupResolver(validationSchema),
  });

  const addTodo = todoApi.useAdd();
  const getTodoById = todoApi.useGetById(id);
  const updateTodo = todoApi.useUpdate();

  const getStatusList = statusApi.useGetList();

  hooks.useSetTodoToForm(getTodoById.data, methods);

  function onSubmit(todo: ITodo) {
    if (id) {
      updateTodo.mutate(todo);
    } else {
      addTodo.mutate(todo);
    }
  }

  if (getTodoById.isFetching) return <Spin />;
  if (getTodoById.isError) return <Error message={getTodoById.error.message} />;
  return (
    <Space direction="vertical" className="container">
      <Heading>
        <Heading.Title>Todo Form</Heading.Title>
        <Heading.Link tooltip="Go back" to="/">
          <Undo2 color="#f9f9f9" />
        </Heading.Link>
      </Heading>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          control={methods.control}
          name="statusId"
          label="Status"
          inputType="select"
          options={helpers.getStatusOptions(getStatusList.data)}
          loading={getStatusList.isPending}
        />
        <Input
          control={methods.control}
          name="title"
          label="Title"
          inputType="input"
        />
        <Input
          control={methods.control}
          name="description"
          label="Description"
          inputType="textarea"
        />
        <Button htmlType="submit" type="primary" loading={addTodo.isPending}>
          Submit
        </Button>
      </form>
    </Space>
  );
}
