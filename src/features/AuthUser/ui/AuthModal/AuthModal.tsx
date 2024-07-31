import {useState} from "react";
import classNames from "classnames";
import {Modal} from "shared/ui/Modal/Modal";
import {Text} from "shared/ui/Text/Text";
import {useNotification} from "shared/lib/hooks/useNotification/useNotification";
import {LoginForm} from "../LoginForm/LoginForm";
import {SignUpForm} from "../SignUpForm/SignUpForm";
import cls from "./AuthModal.module.scss";
import {BackButton} from "shared/ui/BackButton/BackButton.tsx";

interface AuthModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({
  className,
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) => {
  const [isRegistration, setRegistration] = useState(false);

  const {openNotification, notificationComponent} = useNotification('Профиль успешно создан!');

  const onSuccessSignUp = () => {
    setRegistration(false);
    openNotification();
  };

  const handleCloseModal = () => {
    setRegistration(false);
    onClose();
  };

  return (
      <Modal
          className={classNames("", {}, [className])}
          isOpen={isOpen}
      >
        <div className={classNames(cls.AuthModal, {}, [className])}>
          <BackButton onClick={handleCloseModal} className={cls['back-button']}/>
          <Text className={cls.title} title={isRegistration ? "Регистрация" : "Вход в игру"}/>
          <div className={cls.registration}>
            <Text textClassName={cls['no-account']} text={isRegistration ? "Есть аккаунт?" : "Нет аккаунта?"}/>
            <span className={cls.link} onClick={() => {
              setRegistration((isRegistration) => !isRegistration)
            }}>{isRegistration ? 'Вход' : 'Регистрация'}</span>
          </div>
          {isRegistration ? <SignUpForm onSuccess={onSuccessSignUp}/> : <LoginForm onSuccess={onSuccess}/>}
        </div>
        {notificationComponent}
      </Modal>
  )
}
