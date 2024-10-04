import {RadioButtons} from "shared/ui/RadioButtons/RadioButtons.tsx";
import {items} from "./items.ts";

export interface CharacterRadioButtonProps {
    onChange: (value: string) => void;
}
export const CharacterRadioButton = ({onChange}: CharacterRadioButtonProps) => {
   return <RadioButtons
       label={'Выберите пол'}
       items={items}
       onChange={onChange}
   />
}