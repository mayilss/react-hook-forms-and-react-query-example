import { Button, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import statusApi from "../../api/status-api";
import todoApi from "../../api/todo-api";
import Input from "../../components/form/Input";
import Heading from "../../components/heading/Heading";
import { ITodo } from "../../models";

export default function TodoForm() {
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

  function getStatusOptions() {
    let options: DefaultOptionType[] = [];
    if (getStatusList.data) {
      options = getStatusList.data.map((status) => ({
        label: status.name,
        value: String(status.id),
      }));
    }
    return options;
  }

  function onSubmit(todo: ITodo) {
    addTodo.mutate(todo, {
      onSuccess: () => {
        methods.reset();
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
        <Input
          control={methods.control}
          name="statusId"
          label="Status"
          type="select"
          options={getStatusOptions()}
          loading={getStatusList.isPending}
        />
        <Button htmlType="submit" type="primary" loading={addTodo.isPending}>
          Submit
        </Button>
      </form>
    </Space>
  );
}
