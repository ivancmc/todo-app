"use client";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  List,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

class Task {
  text: string;
  done: boolean;

  constructor(text: string) {
    this.text = text;
    this.done = false;
  }
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [taskIndex, setTaskIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = new Task(taskInput);
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done
      ? (updatedTasks[index].done = false)
      : (updatedTasks[index].done = true);
    setTasks(updatedTasks);
  };

  const openConfirmClear = () => {
    if (tasks.length > 0) {
      setTaskIndex(null);
      onOpen();
    }
  };

  const removeAllTasks = () => {
    setTasks([]);
    onClose();
  };

  const openConfirmDelete = (index: number) => {
    setTaskIndex(index);
    onOpen();
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setTaskIndex(null);
    onClose();
  };

  const filteredTasks = tasks.filter((task) => {
    return task.text.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <Center>
      <Card w={["full", "full", "lg"]} h={{ base: "calc(100vh)", md: "2xl" }}>
        <CardHeader w={"inherit"} p={0}>
          <HStack
            w={"inherit"}
            bgColor={useColorModeValue("blue.500", "blue.200")}
            p={3}
            justify={"space-between"}
          >
            {/* <Heading color={useColorModeValue("white", "black")}>
              Lista de Tarefas
            </Heading> */}
            <Image
              src={colorMode === "light" ? "/logo-white.png" : "/logo.png"}
              alt="Logo"
              height={"35px"}
            />
            <Button
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              _focus={{ boxShadow: "none" }}
              w="fit-content"
              colorScheme="blackAlpha"
            >
              {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
            </Button>
          </HStack>
          <HStack p={3}>
            <InputGroup size={"lg"}>
              <Input
                size="lg"
                placeholder="Buscar tarefas"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <InputRightElement>
                {searchInput != "" ? (
                  <CloseIcon
                    color={"gray.400"}
                    cursor={"pointer"}
                    onClick={() => setSearchInput("")}
                  />
                ) : (
                  <Search2Icon color={"gray.400"} />
                )}
              </InputRightElement>
            </InputGroup>
            <Tooltip label="Limpar tudo">
              <Button
                size={"lg"}
                colorScheme="gray"
                variant="outline"
                w={"50px"}
              >
                <Icon as={FaTrash} onClick={() => openConfirmClear()} />
              </Button>
            </Tooltip>
          </HStack>
        </CardHeader>
        <CardBody
          maxH={{ base: "calc(100vh - 225px)", md: "auto" }}
          overflow={"auto"}
          p={3}
          w={"inherit"}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided: any) => (
                <List ref={provided.innerRef} {...provided.droppableProps}>
                  <Stack divider={<StackDivider />} spacing="4">
                    {filteredTasks.map((task, index) => (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
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
                                isChecked={task.done}
                                onChange={() => toggleTask(index)}
                                size={"lg"}
                              />
                              <Text
                                ml={2}
                                textDecoration={
                                  task.done ? "line-through" : "none"
                                }
                                fontSize={"lg"}
                              >
                                {task.text}
                              </Text>
                              <Spacer />
                              <Button
                                size={"md"}
                                colorScheme="red"
                                variant="outline"
                                w={"fit-content"}
                                onClick={() => openConfirmDelete(index)}
                              >
                                <Icon as={FaTrash} />
                              </Button>
                            </Flex>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  </Stack>
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </CardBody>
        <CardFooter
          w={"inherit"}
          bgColor={useColorModeValue("gray.100", "blackAlpha.400")}
          mt={2}
          bottom={[0, 0, "unset"]}
          position={["fixed", "fixed", "unset"]}
        >
          <InputGroup
            size={"lg"}
            bgColor={useColorModeValue("white", "transparent")}
          >
            <Input
              placeholder="Digite uma tarefa"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <InputRightElement>
              <Button
                colorScheme="blue"
                size="lg"
                roundedLeft={0}
                onClick={addTask}
              >
                +
              </Button>
            </InputRightElement>
          </InputGroup>
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {(() => {
                if (taskIndex != null) {
                  return <>Excluir tarefa</>;
                } else {
                  return <>Excluir tarefas</>;
                }
              })()}
            </AlertDialogHeader>

            <AlertDialogBody>
              {(() => {
                if (taskIndex != null) {
                  return (
                    <>
                      Tem certeza que deseja excluir a tarefa &quot;
                      {tasks[taskIndex]?.text}&quot;?
                    </>
                  );
                } else {
                  return <>Tem certeza que deseja limpar tudo?</>;
                }
              })()}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Não
              </Button>
              <Button
                colorScheme="red"
                onClick={() =>
                  taskIndex != null ? removeTask(taskIndex) : removeAllTasks()
                }
                ml={3}
              >
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
};

export default TodoApp;
