import { Task } from "@/data/class/Task";
import { useTaskContext } from "@/data/contexts/TaskContext";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Checkbox,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useEditableControls,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { SlOptionsVertical } from "react-icons/sl";

interface TaskProps {
  index: number;
  task: Task;
}

export default function TaskComponent(props: TaskProps) {
  const { toggleTask, updateTask, openConfirmDelete } = useTaskContext();

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup
        display={"flex"}
        flexDir={"column"}
        justifyContent="center"
        alignItems={"center"}
        size="sm"
        orientation="vertical"
      >
        <IconButton
          aria-label="check"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <Spacer />
        <IconButton
          aria-label="close"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Icon as={SlOptionsVertical} />}
            variant="ghost"
          />
          <MenuList minW={"min"}>
            <MenuItem icon={<EditIcon />} {...getEditButtonProps()}>
              Editar
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() => openConfirmDelete(props.index)}
            >
              Excluir
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }

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
            <Editable
              ml={2}
              fontSize="lg"
              defaultValue={props.task.text}
              alignItems="center"
              w={"full"}
              flexDir={"row"}
              display={"flex"}
              onSubmit={(newValue: string) => updateTask(props.index, newValue)}
            >
              <EditablePreview
                textDecoration={props.task.done ? "line-through" : "none"}
              />
              <EditableTextarea w={"full"} mr={2} />
              <EditableControls />
            </Editable>
          </Flex>
        </Box>
      )}
    </Draggable>
  );
}
