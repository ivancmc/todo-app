"use client";
import Layout from "@/components/Layout";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
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
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  List,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

const TodoApp = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

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
      setTasks([...tasks, taskInput]);
      setTaskInput("");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTasks[index].startsWith("✅")
      ? updatedTasks[index].substring(2)
      : `✅ ${updatedTasks[index]}`;
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    return task.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <Layout>
      <Center>
        <Card
          align={"center"}
          shadow={{ base: "none", md: "var(--card-shadow)" }}
          w={["full", "full", "lg"]}
          h={{ base: "auto", md: "2xl" }}
        >
          <CardHeader w={"inherit"} p={0}>
            <Heading
              w={"inherit"}
              textAlign={"center"}
              bgColor={"blue.500"}
              color={"white"}
              p={3}
            >
              Lista de Tarefas
            </Heading>
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
                  <Icon
                    as={FaTrash}
                    color="gray"
                    onClick={() => removeAllTasks()}
                  />
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
                                  isChecked={task.startsWith("✅")}
                                  onChange={() => toggleTask(index)}
                                />
                                <Text
                                  ml={2}
                                  textDecoration={
                                    task.startsWith("✅")
                                      ? "line-through"
                                      : "none"
                                  }
                                >
                                  {task}
                                </Text>
                                <Spacer />
                                <Icon
                                  as={FaTrash}
                                  color="red"
                                  onClick={() => removeTask(index)}
                                />
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
            bgColor={"gray.100"}
            mt={2}
            bottom={[0, 0, "unset"]}
            position={["fixed", "fixed", "unset"]}
          >
            <InputGroup size={"lg"} bgColor={"white"}>
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
      </Center>
    </Layout>
  );
};

export default TodoApp;
