import {useState} from "react";

export const useCoinsSound = () => {
    const [isOnCoinsSound, setOnCoinsSound] = useState(false);

    const play = () => {
        setOnCoinsSound(true)
        setTimeout(() => {
            setOnCoinsSound(false)
        }, 3000)
    }

    return {
        isOnCoinsSound,
        play
    }
}