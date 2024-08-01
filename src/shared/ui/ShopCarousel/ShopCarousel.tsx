import {memo, ReactNode, useEffect, useState} from "react";
import NextArrowIcon from "shared/assets/icons/next-carousel-button.svg?react";
import PrevArrowIcon from "shared/assets/icons/prev-carousel-button.svg?react";
import ReactSimplyCarousel from "react-simply-carousel";
import cls from "./ShopCarousel.module.scss";

interface ShopCardProps {
    resetActiveIndex?: number;
    children: ReactNode[];
}

export const ShopCarousel = memo(({resetActiveIndex, children}: ShopCardProps) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    useEffect(() => {
        setActiveSlideIndex(0);
    }, [resetActiveIndex]);

    return (
        <div className={cls.ShopCarousel}>
            <ReactSimplyCarousel
                containerProps={{
                    style: {
                        justifyContent: "space-between",
                    }
                }}
                disableSwipeByTouch={false}
                swipeTreshold={60}
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                preventScrollOnSwipe={false}
                itemsToScroll={1}
                hideNavIfAllVisible={true}
                forwardBtnProps={{
                    style: {
                        position: 'absolute',
                        top: '-60px',
                        right: '0',
                        alignSelf: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    },
                    children: <NextArrowIcon/>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        position: 'absolute',
                        top: '-60px',
                        right: '48px',
                        alignSelf: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    },
                    children: <PrevArrowIcon/>,
                }}
                responsiveProps={[
                    {
                        itemsToScroll: 1,
                        maxWidth: 768,
                    },
                ]}
                infinite={false}
                speed={400}
            >
                {children}
            </ReactSimplyCarousel>
        </div>)
});
