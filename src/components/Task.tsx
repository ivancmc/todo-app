import { Task } from "@/data/class/Task";
import { useTaskContext } from "@/data/contexts/TaskContext";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

interface TaskProps {
  task: Task;
}

export default function TaskComponent(props: TaskProps) {
  const { toggleTask, updateTask, openConfirmDelete } = useTaskContext();
  const [taskUpdated, setTaskUpdated] = useState(props.task.text);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialRef = useRef(null);

  const openModal = () => {
    setTaskUpdated(props.task.text);
    setIsModalOpen(true);
  };

  const handleUpdateTask = () => {
    updateTask(props.task.id, taskUpdated);
    setIsModalOpen(false);
    setTaskUpdated("");
  };

  return (
    <Flex alignItems="center">
      <Checkbox
        isChecked={props.task.done}
        onChange={() => toggleTask(props.task.id)}
        size={"lg"}
      />
      <Text
        ml={2}
        textDecoration={props.task.done ? "line-through" : "none"}
        fontSize={"lg"}
        wordBreak={"break-word"}
      >
        {props.task.text}
      </Text>
      <Spacer />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon as={SlOptionsVertical} />}
          variant="ghost"
        />
        <MenuList minW={"min"}>
          <MenuItem fontSize={"lg"} icon={<EditIcon />} onClick={openModal}>
            Editar
          </MenuItem>
          <MenuItem
            fontSize={"lg"}
            icon={<DeleteIcon />}
            onClick={() => openConfirmDelete(props.task.id)}
          >
            Excluir
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              ref={initialRef}
              value={taskUpdated}
              onChange={(e) => setTaskUpdated(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleUpdateTask}>
              Atualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
