import { Modal } from "shared/ui/Modal/Modal";
import classNames from "classnames";
import { LoginForm } from "../LoginForm/LoginForm";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal = ({
  className,
  isOpen,
  onClose,
  onSuccess,
}: LoginModalProps) => (
  <Modal
    className={classNames("", {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <LoginForm onSuccess={onSuccess} />
  </Modal>
);
