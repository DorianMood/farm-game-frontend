import classNames from "classnames";
import {ButtonHTMLAttributes, memo, ReactNode} from "react";
import cls from "./ModalButton.module.scss";

export enum ModalButtonTheme {
  OUTLINE = "outline",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ModalButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ModalButtonTheme;
  square?: boolean;
  size?: ModalButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const ModalButton = memo((props: ModalButtonProps) => {
  const {
    className,
    children,
    onClick,
    theme = ModalButtonTheme.BACKGROUND,
    square,
    disabled,
    size = ModalButtonSize.M,
    ...otherProps
  } = props;

  return (
    <button
      type="button"
      className={classNames(
        cls.ModalButton,
        {
          [cls[theme]]: true,
          [cls.square]: square,
          [cls[size]]: true,
          [cls.disabled]: disabled,
        },
        [className]
      )}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
});
