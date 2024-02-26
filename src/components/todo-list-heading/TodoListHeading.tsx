import { Button, Flex, Tooltip, Typography } from "antd";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function TodoListHeading() {
  const navigate = useNavigate();
  function onAddButtonClick() {
    navigate("/form");
  }
  return (
    <Flex justify="space-between" align="center">
      <Title>My Todo List</Title>
      <Tooltip title="Add todo">
        <Button onClick={onAddButtonClick}>
          <PlusCircle />
        </Button>
      </Tooltip>
    </Flex>
  );
}
