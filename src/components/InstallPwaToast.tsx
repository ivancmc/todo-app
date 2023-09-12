import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

// Defina um tipo para o evento beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt(): void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function InstallPwaToast() {
  const toast = useToast();

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      let deferredPrompt: BeforeInstallPromptEvent | null = null;

      window.addEventListener("beforeinstallprompt", (e: Event) => {
        e.preventDefault();

        deferredPrompt = e as BeforeInstallPromptEvent;

        const installPwa = () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === "accepted") {
                toast({
                  title: "PWA Instalado",
                  description: "O aplicativo foi instalado com sucesso!",
                  status: "success",
                  duration: 5000, // Defina a duração do Toast como desejado
                  isClosable: true,
                });
              } else {
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

        const installButton = document.createElement("button");
        installButton.innerText = "Instalar PWA";
        installButton.addEventListener("click", installPwa);

        toast({
          title: "Instalar o PWA",
          description:
            "Adicione este site à sua tela inicial para uma melhor experiência.",
          status: "info",
          duration: null,
          isClosable: true,
          render: () => (
            <button
              onClick={installPwa}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Instalar PWA
            </button>
          ),
        });
      });
    }
  }, [toast]);

  return null;
}

export default InstallPwaToast;
