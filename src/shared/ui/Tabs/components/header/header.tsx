import {MouseEvent, useMemo,
} from 'react';
import classNames from "classnames";
import { HeaderProps } from './types';
import styles from './styles.module.scss';

export const Header = ({
    tabs,
    size,
    setActiveTab,
    activeTabIndex,
    dataTestId,
}: HeaderProps) => {
    const headerDataTestId = `${dataTestId}-header`;

    const tabItems = useMemo(
        () => tabs.map(
            ({
                title, className, dataTestId = 'tab-item', onClick,
            }, tabIndex) => {
                const isActiveTab = activeTabIndex === tabIndex;

                const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();

                    setActiveTab(tabIndex);
                    onClick?.(event);
                };

                return (

                    <button
                        key={tabIndex}
                        className={classNames(
                            styles.tab,
                            { [styles.active]: isActiveTab },
                            [className],
                        )}
                        data-test-id={dataTestId}
                        onClick={handleClick}
                    >
                        <p className={styles.title}>{title}</p>
                    </button>

                );
            },
        ),
        [activeTabIndex, size, tabs],
    );

    return (
        <header className={styles.header} data-test-id={headerDataTestId}>
                {tabItems}
        </header>
    );
};
