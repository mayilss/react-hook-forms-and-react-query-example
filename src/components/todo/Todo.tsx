import { Alert, Button, Divider, Flex, Space, Typography } from "antd";
import { Status } from "../../config/enums";
import helpers from "../../helpers";
import { Todo } from "../../models";
import { Trash2 } from "lucide-react";
import todoApi from "../../api/todo-api";

const { Text } = Typography;
const { getStatusColor } = helpers;

type TodoProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoProps) {
  const removeMutation = todoApi.useRemoveTodo();

  function onRemoveButtonClick() {
    removeMutation.mutate(todo.id);
  }
  return (
    <li>
      <Flex align="center" gap="8px">
        <Space>
          <Alert
            type={getStatusColor(todo.statusId)}
            message={Status[todo.statusId]}
          />
          <Text>{todo.title}</Text>
        </Space>
        <Button onClick={onRemoveButtonClick}>
          <Trash2 color="#E65A58" />
        </Button>
      </Flex>
      <Divider />
    </li>
  );
}
