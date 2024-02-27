import { Space } from "antd";
import { Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import Heading from "../../components/heading/Heading";
import { Todo } from "../../models";

export default function TodoForm() {
  const methods = useForm<Todo>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      statusId: 1,
    },
  });

  function onSubmit(todo: Todo) {
    console.log(todo);
  }
  return (
    <Space direction="vertical">
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
          options={[]}
        />
      </form>
    </Space>
  );
}
