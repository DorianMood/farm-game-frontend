import {ChangeEvent, useState} from "react";

export const useForm = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [character, setCharacter] = useState('Male');
    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const onChangeCharacter=  (value: string) => {
        setCharacter(value);
    };

    return {
        fields: {password, email, username, name, city, character},
        setters: {onChangeUsername, onChangeName, onChangeEmail, onChangePassword, onChangeCity, onChangeCharacter},
    }
};
