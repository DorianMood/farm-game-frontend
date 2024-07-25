import classNames from "classnames";
import { Modal } from "shared/ui/Modal/Modal";
import { LogoutForm } from "../LogoutForm/LogoutForm";
import cls from "./LogoutModal.module.scss";

interface LogoutModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LogoutModal = ({
  className,
  isOpen,
  onClose,
  onSuccess,
}: LogoutModalProps) => (
  <Modal
    className={classNames("", {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
  >
    <div className={classNames(cls.LogoutModal, {}, [className])}>
      <LogoutForm onSuccess={onSuccess} />
    </div>
  </Modal>
);
