import React, {useEffect} from "react";

interface SoundProps {
    isOn: boolean;
    isLoop: boolean;
    src: string;
}
export const Sound = ({isOn, isLoop, src}: SoundProps) => {

    const audioRef = React.useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3
        }
    }, []);

    useEffect(() => {
        if (isOn) {
            audioRef.current?.play()
        } else {
            audioRef.current?.pause();
        }
    }, [isOn]);

    return <audio ref={audioRef} src={src} loop={isLoop} />
}