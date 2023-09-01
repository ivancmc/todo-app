"use client";
import Header from "@/components/Header";
import Search from "@/components/Search";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { TaskProvider } from "@/data/contexts/TaskContext";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

export class Task {
  text: string;
  done: boolean;

  constructor(text: string) {
    this.text = text;
    this.done = false;
  }
}

const TodoApp = () => {
  return (
    <TaskProvider>
      <Center>
        <Card w={["full", "full", "lg"]} h={{ base: "calc(100vh)", md: "2xl" }}>
          <CardHeader w={"inherit"} p={0}>
            <HStack
              w={"inherit"}
              bgColor={useColorModeValue("blue.500", "blue.200")}
              p={3}
              justify={"space-between"}
            >
              <Header />
            </HStack>
            <HStack p={3}>
              <Search />
            </HStack>
          </CardHeader>
          <CardBody
            maxH={{ base: "calc(100vh - 225px)", md: "auto" }}
            overflow={"auto"}
            p={3}
            w={"inherit"}
          >
            <TaskList />
          </CardBody>
          <CardFooter
            w={"inherit"}
            bgColor={useColorModeValue("gray.100", "blackAlpha.400")}
            mt={2}
            bottom={[0, 0, "unset"]}
            position={["fixed", "fixed", "unset"]}
          >
            <TaskInput />
          </CardFooter>
        </Card>
      </Center>
    </TaskProvider>
  );
};

export default TodoApp;
