import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

function InstallPwaToast() {
  const toast = useToast();
  const id = "install-toast";

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      let deferredPrompt: any = null;
      let installRejected: boolean = false;

      window.addEventListener("beforeinstallprompt", (event: Event) => {
        event.preventDefault();

        deferredPrompt = event;

        const installPwa = () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult: any) => {
              if (choiceResult.outcome === "accepted") {
                toast({
                  title: "PWA Instalado",
                  description: "O aplicativo foi instalado com sucesso!",
                  status: "success",
                  duration: 5000, // Defina a duração do Toast como desejado
                  isClosable: true,
                });
              } else {
                installRejected = true;
                toast({
                  title: "Instalação Cancelada",
                  description: "Você cancelou a instalação do PWA.",
                  status: "info",
                  duration: 5000, // Defina a duração do Toast como desejado
                  isClosable: true,
                });
              }
            });

            deferredPrompt = null;
          }
        };

        if (!toast.isActive(id) && !installRejected) {
          toast({
            id,
            title: "Instalar o App",
            description:
              "Adicione este site à sua tela inicial para uma melhor experiência.",
            status: "info",
            duration: null,
            isClosable: true,
            onCloseComplete: installPwa,
          });
        }
      });
    }
  }, [toast]);

  return null;
}

export default InstallPwaToast;
