import classNames from "classnames";
import {memo} from "react";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

interface TextProps {
  className?: string;
  textClassName?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    textClassName,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
  } = props;

  return (
    <div
      className={classNames(
        cls.Text,
        {
          [cls[theme]]: true,
          [cls[align]]: true,
        },
        [className]
      )}
    >
      {title && <p className={classNames(cls.title, {}, [textClassName])}>{title}</p>}
      {text && <p className={classNames(cls.text, {}, [textClassName])}>{text}</p>}
    </div>
  );
});
