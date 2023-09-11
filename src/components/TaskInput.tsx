import { useTaskContext } from "@/data/contexts/TaskContext";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const TaskInput = () => {
  const { addTask } = useTaskContext();
  const [taskInput, setTaskInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialRef = useRef(null);

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      addTask(taskInput);
      setTaskInput("");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="teal"
        aria-label="Add"
        icon={<AddIcon />}
        size={"lg"}
        h={"60px"}
        w={"60px"}
        onClick={() => setIsModalOpen(true)}
        top={["unset", "unset", "calc(var(--chakra-sizes-2xl) - 5em)"]}
        left={["unset", "unset", "calc(50vw + 8em)"]}
        bottom={[10, 10, "unset"]}
        right={[8, 8, "unset"]}
        position={["fixed", "fixed", "fixed"]}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              ref={initialRef}
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddTask}>
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskInput;
