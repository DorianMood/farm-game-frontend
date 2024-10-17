import classNames from "classnames";
import {memo, useState} from "react";
import cls from "./SoundButton.module.scss";
import backgroundSound from "shared/assets/sounds/background.mp3";
import SoundOn from "shared/assets/icons/sound-on.svg?react";
import SoundOff from "shared/assets/icons/sound-off.svg?react";
import {Sound} from "../Sound/Sound.tsx";

interface SoundButtonProps {
  className?: string;
  title?: string;
  text?: string;
}

export const SoundButton = memo((props: SoundButtonProps) => {
  const {
    className,
  } = props;


  const [isOn, setOn] = useState(false);

  const handleClick = () => {
    setOn(prev => !prev)
  }

  return (
      <div
          className={classNames(
              cls.SoundButton,
              {
                [cls['on']]: isOn,
              },
              [className]
          )}
          onClick={handleClick}
      >
        {isOn ? <SoundOn/> : <SoundOff/>}
        <Sound src={backgroundSound} isOn={isOn} isLoop={true}/>
      </div>
  );
});
