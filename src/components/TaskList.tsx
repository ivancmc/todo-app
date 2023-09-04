import { Task } from "@/data/class/Task";
import { useTaskContext } from "@/data/contexts/TaskContext";
import { List, Stack, StackDivider } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskComponent from "./Task";

const TaskList = () => {
  const { filteredTasks, onDragEnd } = useTaskContext();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided: any) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            <Stack divider={<StackDivider />} spacing="4">
              {filteredTasks.map((task: Task, index: number) => (
                <TaskComponent index={index} task={task} key={index} />
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
