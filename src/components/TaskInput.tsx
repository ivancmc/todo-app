import { useTaskContext } from "@/data/contexts/TaskContext";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const TaskInput = () => {
  const { addTask } = useTaskContext();
  const [taskInput, setTaskInput] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      addTask(taskInput);
      setTaskInput("");
    }
  };

  return (
    <InputGroup size={"lg"} bgColor={useColorModeValue("white", "transparent")}>
      <Input
        placeholder="Digite uma tarefa"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <InputRightElement>
        <Button
          colorScheme="blue"
          size="lg"
          roundedLeft={0}
          onClick={handleAddTask}
        >
          +
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default TaskInput;
