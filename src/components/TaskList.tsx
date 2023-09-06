import { Task } from "@/data/class/Task";
import { useTaskContext } from "@/data/contexts/TaskContext";
import { List, ListItem, Stack, StackDivider } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided: any) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      p={1}
                    >
                      <TaskComponent index={index} task={task} key={index} />
                    </ListItem>
                  )}
                </Draggable>
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
