import { getInitialState } from './reducer';
import { Action, State } from './types';

export const setTextValue = (value: string): Action => ({ value });

export const reset = (): Action => getInitialState();

export const resetData = (): Action => ({
    data: [],
});

export const searchDataSuccess = (data: State['data']): Action => ({
    data,
});
