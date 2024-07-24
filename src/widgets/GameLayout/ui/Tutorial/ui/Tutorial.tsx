import classNames from "classnames";
import FarmerGirl from "shared/assets/images/farmer-girl.png";
import cls from "./Tutorial.module.scss";
import {MessageCardCarousel} from "shared/ui/MessageCardCarousel/MessageCardCarousel.tsx";
import {tutorialActions, tutorialSelector} from "entities/Tutorial";
import {useSelector} from "react-redux";
import {
    currentTutorialSelector,
    currentTutorialStepIndexSelector
} from "entities/Tutorial/model/selectors.ts";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {useEffect} from "react";

interface TutorialProps {
    className?: string;
}

export const Tutorial = ({className}: TutorialProps) => {
    const dispatch = useAppDispatch();
    const tutorialSteps = useSelector(tutorialSelector);
    const currentTutorialIndex = useSelector(currentTutorialStepIndexSelector);
    const currentTutorial = useSelector(currentTutorialSelector);
    const currentPage = useSelector(currentTutorialSelector);

    useEffect(() => {
        if (currentPage === undefined) {
            sessionStorage.removeItem('activeTutorial')
        }
    }, [currentPage]);

    const handleCloseClick = () => {
        dispatch(tutorialActions.closeTutorial())
    }

    const handleChangeStep = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            dispatch(tutorialActions.setCurrentStepIndex((currentTutorialIndex + 1) % tutorialSteps?.length));
        } else {
            dispatch(tutorialActions.setCurrentStepIndex((currentTutorialIndex - 1) % tutorialSteps?.length));
        }
    }

    if (currentTutorial === undefined) {
        return null
    }

    return (
        <div className={cls["tutorial"]}>
            <div className={classNames(cls.Tutorial, {}, [className])}>
                <MessageCardCarousel
                    tutorialSteps={tutorialSteps}
                    onChangeStep={handleChangeStep}
                    currentStep={currentTutorialIndex}
                    onClose={handleCloseClick}
                />
                <img src={FarmerGirl} alt="farmer-girl-helper"/>
            </div>
        </div>
    );
};
