import AlertDialogComponent from "@/components/AlertDialog";
import { Task } from "@/data/class/Task";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

interface TaskContextProps {
  searchInput: string;
  tasks: Task[];
  filteredTasks: Task[];
  taskIdSelected: string | null;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  addTask: (taskInput: string) => void;
  updateTask: (id: string, taskInput: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  removeAllTasks: () => void;
  onDragEnd: (result: any) => void;
  openConfirmClear: () => void;
  openConfirmDelete: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextProps>({
  searchInput: "",
  tasks: [],
  filteredTasks: [],
  taskIdSelected: null,
  setSearchInput: () => "",
  addTask: () => {},
  updateTask: () => {},
  toggleTask: () => {},
  removeTask: () => {},
  removeAllTasks: () => {},
  onDragEnd: () => {},
  openConfirmClear: () => {},
  openConfirmDelete: () => {},
  getTaskById: () => undefined,
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
  const [taskIdSelected, setTaskIdSelected] = useState<string | null>(null);
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

  const getTaskById = (id: string) => {
    return tasks?.find((t) => t.id == id);
  };

  const addTask = (taskInput: string) => {
    const newTask = new Task(taskInput);
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    const task = getTaskById(id);
    if (task) {
      task.done ? (task.done = false) : (task.done = true);
      const updatedTasks = [...tasks];
      setTasks(updatedTasks);
    }
  };

  const updateTask = (id: string, taskInput: string) => {
    if (taskInput.trim() !== "") {
      const task = getTaskById(id);
      if (task) {
        task.text = taskInput;
        const updatedTasks = [...tasks];
        setTasks(updatedTasks);
      }
    }
  };

  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    setTaskIdSelected(null);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const openConfirmClear = () => {
    if (tasks.length > 0) {
      setTaskIdSelected(null);
      onOpen();
    }
  };

  const openConfirmDelete = (id: string) => {
    setTaskIdSelected(id);
    onOpen();
  };

  const onConfirmDialog = () => {
    taskIdSelected != null ? removeTask(taskIdSelected) : removeAllTasks();

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
        taskIdSelected,
        setSearchInput,
        addTask,
        updateTask,
        toggleTask,
        removeTask,
        removeAllTasks,
        onDragEnd,
        openConfirmClear,
        openConfirmDelete,
        getTaskById,
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
