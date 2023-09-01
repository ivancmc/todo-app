import { useTaskContext } from "@/data/contexts/TaskContext";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

export default function Search() {
  const { searchInput, setSearchInput, openConfirmClear } = useTaskContext();

  return (
    <>
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
          onClick={openConfirmClear}
        >
          <Icon as={FaTrash} />
        </Button>
      </Tooltip>
    </>
  );
}
