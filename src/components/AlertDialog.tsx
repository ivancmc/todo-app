import { useTaskContext } from "@/data/contexts/TaskContext";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertDialogComponent(props: AlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const { tasks, taskSelectedIndex } = useTaskContext();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {(() => {
              if (taskSelectedIndex != null) {
                return <>Excluir tarefa</>;
              } else {
                return <>Excluir tarefas</>;
              }
            })()}
          </AlertDialogHeader>

          <AlertDialogBody>
            {(() => {
              if (taskSelectedIndex != null) {
                return (
                  <>
                    Tem certeza que deseja excluir a tarefa &quot;
                    {tasks[taskSelectedIndex]?.text}&quot;?
                  </>
                );
              } else {
                return <>Tem certeza que deseja limpar tudo?</>;
              }
            })()}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Não
            </Button>
            <Button colorScheme="red" onClick={props.onConfirm} ml={3}>
              Sim
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
