import { Alert, Divider, Flex, Typography } from "antd";
import { Status } from "../../config/enums";
import helpers from "../../helpers";
import { Todo } from "../../models";

const { Text } = Typography;
const { getStatusColor } = helpers;

type TodoProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoProps) {
  return (
    <li key={todo.id}>
      <Flex align="center" gap="8px">
        <Alert
          type={getStatusColor(todo.statusId)}
          message={Status[todo.statusId]}
        />
        <Text>{todo.title}</Text>
      </Flex>
      <Divider />
    </li>
  );
}
