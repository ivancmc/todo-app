import { Task } from "@/app/page";
import { useTaskContext } from "@/data/contexts/TaskContext";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

interface TaskProps {
  index: number;
  task: Task;
}

export default function TaskComponent(props: TaskProps) {
  const { toggleTask, openConfirmDelete } = useTaskContext();

  return (
    <Draggable
      key={props.index}
      draggableId={props.index.toString()}
      index={props.index}
    >
      {(provided: any) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          p={1}
        >
          <Flex alignItems="center">
            <Checkbox
              isChecked={props.task.done}
              onChange={() => toggleTask(props.index)}
              size={"lg"}
            />
            <Text
              ml={2}
              textDecoration={props.task.done ? "line-through" : "none"}
              fontSize={"lg"}
            >
              {props.task.text}
            </Text>
            <Spacer />
            <Button
              size={"md"}
              colorScheme="red"
              variant="outline"
              w={"fit-content"}
              onClick={() => openConfirmDelete(props.index)}
            >
              <Icon as={FaTrash} />
            </Button>
          </Flex>
        </Box>
      )}
    </Draggable>
  );
}
