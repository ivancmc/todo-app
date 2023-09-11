import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const InstallPwaToast: React.FC = () => {
  const toast = useToast();

  useEffect(() => {
    // Verifique se o navegador suporta a instalação de PWAs
    if ("serviceWorker" in navigator && "PushManager" in window) {
      // Verifique se o PWA ainda não está instalado
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        toast({
          title: "Instalar o App",
          description:
            "Adicione este site à sua tela inicial para uma experiência melhor.",
          status: "info", // Você pode personalizar o estilo do Toast conforme necessário
          duration: null, // Defina para null para que o Toast não desapareça automaticamente
          isClosable: true,
          onCloseComplete: () => {
            // Implemente aqui a lógica para instalar o PWA quando o usuário clicar no Toast
            // Normalmente, você abriria a janela de instalação aqui
          },
        });
      }
    }
  }, [toast]);

  return null;
};

export default InstallPwaToast;
