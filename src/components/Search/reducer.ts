import { shallowEqual } from 'react-redux';
import {Action, State} from "./types";

export const getInitialState = (state?: null | Partial<State>): State => {
    return {
        value: '',
        data: [],
    };
};

export const reducer = (state: State, update: Action): State => {
    const newState =
        typeof update === 'function' ? { ...state, ...update(state) } : { ...state, ...update };

    return shallowEqual(newState, state) ? state : newState;
};
