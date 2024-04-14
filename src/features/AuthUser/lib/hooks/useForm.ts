import {ChangeEvent, useState} from "react";

export const useForm = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [formErrors, setFormErrors] = useState({});

    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return {
        fields: {password, email, username},
        setters: {onChangeUsername, onChangeEmail, onChangePassword},
        formErrors,
        setFormErrors
    }
};
