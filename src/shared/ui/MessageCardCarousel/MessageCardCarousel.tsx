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

  const hasNextStep = currentStep < tutorialSteps.length - 1;
  const hasPrevStep = currentStep > 0;

  return (
    <div className={classNames(cls.MessageCardCarousel, {}, [className])}>
      <MessageCard text={tutorialSteps[currentStep].text}/>
      <CloseIcon className={cls["close-icon"]} onClick={onClose} />
      <div className={cls['indicator']}>
        <ArrowPrev className={classNames(cls.arrow, {[cls.active]: hasPrevStep})} onClick={() => hasPrevStep && onChangeStep('prev')}/>
        <Text text={`${currentStep+1} / ${tutorialSteps.length}`}/>
        <ArrowNext className={classNames(cls.arrow, {[cls.active]: hasNextStep})} onClick={() => hasNextStep && onChangeStep('next')}/>
      </div>
    </div>
  );
});
