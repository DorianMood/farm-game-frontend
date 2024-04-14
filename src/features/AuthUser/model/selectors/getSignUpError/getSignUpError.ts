import { StateSchema } from 'app/providers/StoreProvider';

export const getSignUpError = (state: StateSchema) => state?.signUpForm?.error;
