import {Modal} from "shared/ui/Modal/Modal.tsx";
import Back from "shared/assets/images/farm/back.svg?react";
import {DragEvent, MouseEvent, useEffect, useState} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchSurveyData} from "entities/Survey/model/thunks.ts";
import {useSelector} from "react-redux";
import {surveySelector} from "entities/Survey";
import classNames from "classnames";
import cls from "./SurveyModal.module.scss";
import {surveyIsLoadingSelector} from "entities/Survey/model/selectors.ts";
import {TimerButton} from "shared/ui/TimerButton/TimerButton.tsx";

interface Props {
    opened: boolean;
    taskId: string;
    onClose: () => void;
    onSubmit: (completed: boolean) => void;
}

interface InnerQuestion {
    question: string;
    answer: string;
    index: number;
    state: "correct" | "incorrect" | "empty";
}

interface InnerAnswer {
    answer: string;
    index: number;
}

export const SurveyModal = ({onClose, opened, taskId, onSubmit}: Props) => {
    const dispatch = useAppDispatch();
    const survey = useSelector(surveySelector);
    const isLoadingSurvey = useSelector(surveyIsLoadingSelector);

    useEffect(() => {
        dispatch(fetchSurveyData(taskId));
    }, [dispatch]);

    const [questions, setQuestions] = useState<InnerQuestion[]>();
    const [answers, setAnswers] = useState<InnerAnswer[]>();
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>();

    useEffect(() => {
        if (!opened) {
            setSelectedAnswerIndex(undefined);
            setQuestions(questions => questions?.map((item) => {
                return {
                    ...item,
                    state: 'empty'
                }
            }));

        }
    }, [opened]);

    useEffect(() => {
        const questions = survey?.questions.map((question) => question.question);
        const answers = survey?.questions.map((question) => question.answer);

        setQuestions(
            questions?.map<InnerQuestion>((item, index) => ({
                question: item,
                answer: answers![index],
                index,
                state: "empty",
            })),
        );

        setAnswers(
            answers?.map<InnerAnswer>((item, index) => ({
                answer: item,
                index,
            })),
        );
    }, [survey]);

    const handleQuestionClick = (event: MouseEvent<HTMLDivElement>) => {
        if (selectedAnswerIndex === undefined) {
            return;
        }

        const index = event.currentTarget.getAttribute("data-index");
        if (index && selectedAnswerIndex === +index) {
            setQuestions((questions) =>
                questions?.map((question, i) => ({
                    ...question,
                    state: i === +index ? "correct" : question.state,
                })),
            );
        } else {
        }

        setSelectedAnswerIndex(undefined);
    };

    const handleAnswerClick = (event: MouseEvent<HTMLDivElement>) => {
        const index = event.currentTarget.getAttribute("data-index");

        if (index) {
            setSelectedAnswerIndex(+index);
        }
    };

    useEffect(() => {
        const allCorrect = questions?.every((item) => item.state === "correct");

        if (allCorrect) {
            onSubmit(true);
            return;
        }
    }, [questions]);

    const handleDragStart = (event: DragEvent<HTMLSpanElement>) => {
        const index = event.currentTarget.getAttribute("data-index");

        if (index) {
            setSelectedAnswerIndex(+index);
        }
    };

    const handleDragEnd = () => {
        setSelectedAnswerIndex(undefined);
    };

    const handleDrop = (event: DragEvent<HTMLSpanElement>) => {
        if (selectedAnswerIndex === undefined) {
            return;
        }

        const index = event.currentTarget.getAttribute("data-index");
        if (index !== null) {
            setQuestions((questions) =>
                questions?.map((question, i) => ({
                    ...question,
                    state:
                        i === +index
                            ? selectedAnswerIndex === +index
                                ? "correct"
                                : "incorrect"
                            : question.state,
                })),
            );
        }

        setSelectedAnswerIndex(undefined);
    };

    if (isLoadingSurvey || !questions?.length || !answers?.length) {
        return null
    }

    return (
        <Modal isOpen={opened} className={cls['survey-modal']} disableScroll={true}>
            <div className={cls.root}>
                <div className={cls.header}>
                    <div onClick={onClose}>
                        <Back/>
                    </div>
                    <p className={cls.title}>Я финансовый гений!</p>
                    <TimerButton
                        opened={opened}
                        onSubmit={onSubmit}
                    />
                </div>

                <div className={cls.content}>
                    <p className={cls.description}>Соедини термины с их правильными определениями:</p>

                    {survey?.questions && (
                        <>
                            <div className={cls.answers}>
                                {answers?.map((answer, index) => (
                                    <span
                                        className={classNames(cls["answers-badge"], {
                                            [cls["answers-badge__light-green"]]:
                                            questions?.[index].state === "correct",
                                            [cls["answers-badge__light-red"]]:
                                            questions?.[index].state === "incorrect",
                                        })}
                                        onClick={handleAnswerClick}
                                        data-index={index}
                                        key={`${answer.answer}-${answer.index}`}
                                        draggable
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                    >
                    {answer.answer}
                  </span>
                                ))}
                            </div>
                            <div className={cls.questions}>
                                {questions?.map((question, index) => (
                                    <div className={cls.item} key={question.question}>
                    <span className={cls["question-text"]}>
                      {question.question}
                    </span>
                                        <span
                                            className={classNames(cls["answers-badge"], {
                                                [cls["answers-badge__green"]]:
                                                question.state === "correct",
                                                [cls["answers-badge__red"]]:
                                                question.state === "incorrect",
                                                [cls["answers-badge__empty"]]:
                                                question.state === "empty",
                                            })}
                                            data-index={index}
                                            onClick={handleQuestionClick}
                                            onDrop={handleDrop}
                                            onDragOver={(event) => event.preventDefault()}
                                        >
                      {question.answer}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};
