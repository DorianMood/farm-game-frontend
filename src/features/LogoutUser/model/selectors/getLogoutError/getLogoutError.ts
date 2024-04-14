import { StateSchema } from 'app/providers/StoreProvider';

export const getLogoutError = (state: StateSchema) => state?.logoutForm?.error;
