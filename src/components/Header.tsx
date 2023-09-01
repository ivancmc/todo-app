import { Button, Image, useColorMode } from "@chakra-ui/react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
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
    </>
  );
}
