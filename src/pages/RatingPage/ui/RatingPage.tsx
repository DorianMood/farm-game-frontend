import classNames from "classnames";
import {Heading} from "shared/ui/Heading/Heading";
import {useEffect, useMemo, useState} from "react";
import {RatingCard} from "shared/ui/RatingCard/RatingCard";
import cls from "./RatingPage.module.scss";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchRatingData} from "entities/Rating/model/thunks.ts";
import {isRatingLoadingSelector, ratingSelector} from "entities/Rating/model/selectors.ts";
import {useSelector} from "react-redux";
import {Loader} from "shared/ui/Loader/Loader.tsx";

interface RatingPageProps {
    className?: string;
}

export const RatingPage = ({className}: RatingPageProps) => {
    const dispatch = useAppDispatch();

    const rating = useSelector(ratingSelector);
    const isLoadingRating = useSelector(isRatingLoadingSelector);

    const [isVisibleAboveDots, setVisibleAboveDots] = useState(false);
    const [isVisibleBelowDots, setVisibleBelowDots] = useState(false);


    useEffect(() => {
        dispatch(fetchRatingData());
    }, []);

    const itemsListAbove = useMemo(
        () =>
            rating?.above?.map((item, index) => {
                if (index === rating?.above.length - 1) {
                    setVisibleAboveDots(((rating?.user?.rank ?? 0) - (item?.rank ?? 0)) !== 1)
                }

                return (
                    <RatingCard
                        key={item.id}
                        coinsCount={item.ballance}
                        name={item.name ?? item.username}
                        city={item.city}
                        isCurrent={false}
                        rank={item?.rank}
                    />
                )
            }),
        [rating]
    );

    const itemsListBelow = useMemo(
        () =>
            rating?.below?.map((item, index) => {

                if (index === 0) {
                    console.log(item?.rank, rating?.user?.rank, ((item?.rank ?? 0) - (rating?.user?.rank ?? 0)) !== 1)
                    setVisibleBelowDots(((item?.rank ?? 0) - (rating?.user?.rank ?? 0)) !== 1)
                }

                return (
                    <RatingCard
                        key={item.id}
                        coinsCount={item.ballance}
                        name={item.name ?? item.username}
                        city={item.city}
                        isCurrent={false}
                        rank={item?.rank}
                    />
                )
            }),
        [rating]
    );

    if (isLoadingRating) {
        return <div className={classNames(cls.RatingLoader, {}, [className])}><Loader/></div>
    }

    return (
        <div className={classNames(cls.Rating, {}, [className])}>
            <Heading level={1} className={cls.ratingHeading}>
                Рейтинг
            </Heading>
            <div className={cls.ratingCardsList}>
                {!!itemsListAbove?.length && (
                    <> {itemsListAbove}
                        {isVisibleAboveDots && <div className={cls.dots}>...</div>}
                    </>
                )}
                <RatingCard
                    key={rating?.user?.id}
                    coinsCount={rating?.user?.ballance ?? 0}
                    name={rating?.user?.name ?? rating?.user?.username ?? ""}
                    city={rating?.user?.city}
                    isCurrent={true}
                    rank={rating?.user?.rank}
                />
                {!!itemsListBelow?.length && (
                    <>
                        {isVisibleBelowDots && <div className={cls.dots}>...</div>}
                        {itemsListBelow}
                    </>
                )}
            </div>
        </div>
    );
};
