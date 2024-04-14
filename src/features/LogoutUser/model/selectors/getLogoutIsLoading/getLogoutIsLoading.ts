import { StateSchema } from 'app/providers/StoreProvider';

export const getLogoutIsLoading = (state: StateSchema) => state?.logoutForm?.isLoading || false;
