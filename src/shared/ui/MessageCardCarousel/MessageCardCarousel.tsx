import classNames from "classnames";
import {memo} from "react";
import CloseIcon from "shared/assets/icons/close-44-44.svg?react";
import cls from "./MessageCardCarousel.module.scss";
import {MessageCard} from "../MessageCard/MessageCard.tsx";
import ArrowNext from "shared/assets/icons/arrow-next-9-15.svg?react";
import ArrowPrev from "shared/assets/icons/arrow-prev-9-15.svg?react";
import {Text} from "../Text/Text.tsx";
import {Tutorial} from "entities/Tutorial";

interface MessageCardCarouselProps {
  className?: string;
  tutorialSteps: Tutorial[];
  currentStep: number;
  onChangeStep: (direction: 'next' | 'prev') => void;
  onClose: () => void;
}

export const MessageCardCarousel = memo((props: MessageCardCarouselProps) => {
  const {className, tutorialSteps, currentStep, onChangeStep, onClose} = props;

  return (
    <div className={classNames(cls.MessageCardCarousel, {}, [className])}>
      <MessageCard text={tutorialSteps[currentStep].text}/>
      <CloseIcon className={cls["close-icon"]} onClick={onClose} />
      <div className={cls['indicator']}>
        <ArrowPrev className={cls.arrow} onClick={() => onChangeStep('prev')}/>
        <Text  text={`${currentStep+1} / ${tutorialSteps.length}`}/>
        <ArrowNext className={cls.arrow} onClick={() => onChangeStep('next')}/>
      </div>
    </div>
  );
});
