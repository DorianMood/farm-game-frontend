import { StateSchema } from 'app/providers/StoreProvider';

export const getSignUpIsLoading = (state: StateSchema) => state?.signUpForm?.isLoading || false;
