import {SignUpError} from "../services/signUp/signUp";

export interface SignUpSchema {
    isLoading: boolean;
    error?: SignUpError;
}
