import { Task } from "@/app/page";
import AlertDialogComponent from "@/components/AlertDialog";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

interface TaskContextProps {
  searchInput: string;
  tasks: Task[];
  filteredTasks: Task[];
  taskSelectedIndex: number | null;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  addTask: (taskInput: string) => void;
  toggleTask: (index: number) => void;
  removeTask: (index: number) => void;
  removeAllTasks: () => void;
  onDragEnd: (result: any) => void;
  openConfirmClear: () => void;
  openConfirmDelete: (index: number) => void;
}

const TaskContext = createContext<TaskContextProps>({
  searchInput: "",
  tasks: [],
  filteredTasks: [],
  taskSelectedIndex: null,
  setSearchInput: () => "",
  addTask: () => {},
  toggleTask: () => {},
  removeTask: () => {},
  removeAllTasks: () => {},
  onDragEnd: () => {},
  openConfirmClear: () => {},
  openConfirmDelete: () => {},
});

export function useTaskContext(): TaskContextProps {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider(props: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [taskSelectedIndex, setTaskSelectedIndex] = useState<number | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    return task.text.toLowerCase().includes(searchInput.toLowerCase());
  });

  const addTask = (taskInput: string) => {
    const newTask = new Task(taskInput);
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done
      ? (updatedTasks[index].done = false)
      : (updatedTasks[index].done = true);
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setTaskSelectedIndex(null);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const openConfirmClear = () => {
    if (tasks.length > 0) {
      setTaskSelectedIndex(null);
      onOpen();
    }
  };

  const openConfirmDelete = (index: number) => {
    setTaskSelectedIndex(index);
    onOpen();
  };

  const onConfirmDialog = () => {
    taskSelectedIndex != null
      ? removeTask(taskSelectedIndex)
      : removeAllTasks();

    onClose();
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <TaskContext.Provider
      value={{
        searchInput,
        tasks,
        filteredTasks,
        taskSelectedIndex,
        setSearchInput,
        addTask,
        toggleTask,
        removeTask,
        removeAllTasks,
        onDragEnd,
        openConfirmClear,
        openConfirmDelete,
      }}
    >
      {props.children}
      <AlertDialogComponent
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirmDialog}
      />
    </TaskContext.Provider>
  );
}

export default TaskContext;
