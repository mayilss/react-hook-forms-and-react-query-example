import { Space } from "antd";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
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
    <Space>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          control={methods.control}
          name="title"
          label="Title"
          type="input"
        />
      </form>
    </Space>
  );
}
