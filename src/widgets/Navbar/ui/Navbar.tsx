import classNames from "classnames";
import {memo, useCallback, useState} from "react";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {AuthModal} from "features/AuthUser";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "entities/User";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(userSelector);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    // TODO: logout
  }, [dispatch]);

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {"Выйти"}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {"Войти"}
      </Button>
      {isAuthModal && (
        <AuthModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
          onSuccess={onCloseModal}
        />
      )}
    </div>
  );
});
