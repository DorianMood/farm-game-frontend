import {ChangeEvent, memo, useEffect, useState} from 'react';
import classNames from "classnames";
import cls from "./ProductsCounter.module.scss";
import cn from "classnames";


interface ProductsCounterProps {
    maxProductCount: number;
    onChange: (value: number) => void;
    className?: string;
}

export const ProductsCounter = memo((props: ProductsCounterProps) => {
    const {className, maxProductCount, onChange} = props;

    const [counter, setCounter] = useState(1);

    const handleChangeCounter = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!value || value < 1) {
            setCounter(1)
            return
        }
        if (value < 100 && value <= maxProductCount) {
            setCounter(value)
        }
    };

    const handleButtonClick = (type: 'up' | 'down') => {
        type === 'up'
            ? setCounter(prev => prev + 1)
            : setCounter(prev => prev - 1)
    }

    useEffect(() => {
        onChange(counter);
    }, [counter]);

    return (
        <div className={classNames(cls.ProductsCounter, {}, [className])}>
            <button
                className={cn(cls.button, {[cls.disabled]: counter === 1})}
                onClick={() => handleButtonClick('down')}
                disabled={counter === 1}
            >-</button>
            <input
                className={cls.input}
                type="number"
                value={counter}
                onChange={handleChangeCounter}
            />
            <button
                className={cn(cls.button, {[cls.disabled]: counter === 99 || counter === maxProductCount })}
                onClick={() => handleButtonClick('up')}
                disabled={counter === 99 || counter === maxProductCount}
            >+</button>
        </div>
    );
});
