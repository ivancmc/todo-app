import { Task } from "@/app/page";
import { useTaskContext } from "@/data/contexts/TaskContext";
import { List, Stack, StackDivider } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskComponent from "./Task";

const TaskList = () => {
  const {
    filteredTasks,
    toggleTask,
    removeTask,
    onDragEnd,
    openConfirmDelete,
  } = useTaskContext();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided: any) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            <Stack divider={<StackDivider />} spacing="4">
              {filteredTasks.map((task: Task, index: number) => (
                <TaskComponent index={index} task={task} key={index} />
                // <Draggable
                //   key={index}
                //   draggableId={index.toString()}
                //   index={index}
                // >
                //   {(provided: any) => (
                //     <Box
                //       ref={provided.innerRef}
                //       {...provided.draggableProps}
                //       {...provided.dragHandleProps}
                //       p={1}
                //     >
                //       <Flex alignItems="center">
                //         <Checkbox
                //           isChecked={task.done}
                //           onChange={() => toggleTask(index)}
                //           size={"lg"}
                //         />
                //         <Text
                //           ml={2}
                //           textDecoration={task.done ? "line-through" : "none"}
                //           fontSize={"lg"}
                //         >
                //           {task.text}
                //         </Text>
                //         <Spacer />
                //         <Button
                //           size={"md"}
                //           colorScheme="red"
                //           variant="outline"
                //           w={"fit-content"}
                //           onClick={() => openConfirmDelete(index)}
                //         >
                //           <Icon as={FaTrash} />
                //         </Button>
                //       </Flex>
                //     </Box>
                //   )}
                // </Draggable>
              ))}
            </Stack>
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
