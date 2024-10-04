import {memo, useState} from 'react';
import classNames from "classnames";
import cls from "./RadioButtons.module.scss";
import cn from "classnames";

interface RadioButtonsProps {
    label: string;
    items: { name: string, id: string }[];
    onChange: (name: string) => void;
    className?: string;
}

export const RadioButtons = memo((props: RadioButtonsProps) => {
    const {className, label, items, onChange} = props;

    const [activeItem, setActiveItem] = useState(0);
    const handleChange = (index: number) => {
        setActiveItem(index);
        onChange(items[index].id)
    }

    return (
        <div className={classNames(cls.RadioButtons, {}, [className])}>
            <p className={cls.label}>{label}</p>
            <div className={cls['radio-items']}>
                {items.map((item, index) => {
                    return (
                        <div
                            onClick={() => handleChange(index)}
                            className={cn(cls['radio-item'], {
                                [cls['first-element']]: index === 0,
                                [cls['last-element']]: index === items.length - 1,
                                [cls['checked']]: index === activeItem,
                            })}
                        >
                            {item.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
});
