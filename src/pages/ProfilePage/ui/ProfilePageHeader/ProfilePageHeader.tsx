import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui/Text/Text";
import cls from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title="Профиль" />
    </div>
  );
};
