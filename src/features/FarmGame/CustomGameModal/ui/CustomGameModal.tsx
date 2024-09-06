import { useEffect } from "react";
import CloseIcon from "shared/assets/icons/close-44-44.svg?react";
import { Modal } from "shared/ui/Modal/Modal.tsx";
import cls from "./CustomGameModal.module.scss";

interface Props {
  onClose: (actionName: "success" | "failed" | "close") => void;
  opened: boolean;
  url: string;
  origin: string;
}

export const CustomGameModal = ({ onClose, opened, url, origin }: Props) => {
  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
      if (event.origin !== origin) return;

      try {
        const data = JSON.parse(event.data);

        if (data.action) {
          onClose(data.action);
        }
      } catch {
        console.log("Ошибка парсинга iframe");
      }
    };

    window.addEventListener("message", handleMessageEvent);

    return () => window.removeEventListener("message", handleMessageEvent);
  }, [onClose, origin]);

  return (
    <Modal isOpen={opened} disableScroll={true}>
      <div className={cls.root}>
        <p className={cls.text}>Переверните устройство</p>
        <CloseIcon
          className={cls["close-icon"]}
          onClick={() => {
            onClose("close");
          }}
        />
        <iframe className={cls.game} src={url} frameBorder="0" />
      </div>
    </Modal>
  );
};
