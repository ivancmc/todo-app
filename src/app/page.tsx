"use client";
import Header from "@/components/Header";
import Search from "@/components/Search";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { TaskProvider } from "@/data/contexts/TaskContext";
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import InstallPwaToast from "../components/InstallPwaToast";

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
          <CardBody overflow={"auto"} p={3} w={"inherit"}>
            <TaskList />
            <TaskInput />
          </CardBody>
        </Card>
      </Center>
    </TaskProvider>
  );
};

InstallPwaToast;

export default TodoApp;
