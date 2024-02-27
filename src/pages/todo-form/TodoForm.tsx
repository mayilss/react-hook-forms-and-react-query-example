import { Button, Space } from "antd";
import { Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import statusApi from "../../api/status-api";
import todoApi from "../../api/todo-api";
import Input from "../../components/form/Input";
import Heading from "../../components/heading/Heading";
import { ITodo } from "../../models";
import helpers from "../../helpers";
import { useNavigate } from "react-router-dom";

const { getStatusOptions } = helpers;

export default function TodoForm() {
  const navigate = useNavigate();
  const methods = useForm<ITodo>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      statusId: "1",
    },
  });

  const addTodo = todoApi.useAdd();
  const getStatusList = statusApi.useGetList();

  function onSubmit(todo: ITodo) {
    addTodo.mutate(todo, {
      onSuccess: () => {
        methods.reset();
        navigate("/");
      },
    });
  }

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
          type="select"
          options={getStatusOptions(getStatusList.data)}
          loading={getStatusList.isPending}
        />
        <Input
          control={methods.control}
          name="title"
          label="Title"
          type="input"
        />
        <Input
          control={methods.control}
          name="description"
          label="Description"
          type="textarea"
        />
        <Button htmlType="submit" type="primary" loading={addTodo.isPending}>
          Submit
        </Button>
      </form>
    </Space>
  );
}
