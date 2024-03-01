import { Alert, Button, Divider, Flex, Space, Typography } from "antd";
import { PenBoxIcon, Trash2 } from "lucide-react";
import todoApi from "../../api/todo-api";
import { Status } from "../../config/enums";
import helpers from "../../helpers";
import { ITodo } from "../../models";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { getStatusColor } = helpers;

type TodoProps = {
  todo: ITodo;
};

export default function TodoItem({ todo }: TodoProps) {
  const navigate = useNavigate();
  const removeMutation = todoApi.useRemove();

  function onRemoveButtonClick() {
    removeMutation.mutate(todo.id);
  }
  function onEditButtonClick() {
    navigate(`/form/${todo.id}`);
  }
  return (
    <li>
      <Flex align="center" gap="8px" justify="space-between">
        <Space>
          <Alert
            type={getStatusColor(Number(todo.statusId))}
            message={Status[Number(todo.statusId)]}
          />
          <Text>{todo.title}</Text>
        </Space>
        <Flex gap="8px">
          <Button onClick={onEditButtonClick} className="action-button">
            <PenBoxIcon color="#d0b526" />
          </Button>
          <Button onClick={onRemoveButtonClick} className="action-button">
            <Trash2 color="#E65A58" />
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </li>
  );
}
