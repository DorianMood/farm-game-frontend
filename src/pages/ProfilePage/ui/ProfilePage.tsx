import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfilePage.module.scss";

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = ({ className }: ProfilePageProps) => {
  return (
    <div className={classNames(cls.Profile, {}, [className])}>
      Страница в проработке
    </div>
  );
};
