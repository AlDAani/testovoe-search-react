import { configureStore, ThunkAction, Action, combineReducers, AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { api } from '../components/Search/api'

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {

  if (isRejectedWithValue(action)) {
    //можем сделать проверку на код ошибки, например, что б разлогинить пользователя, при условии что авторизация на беке
    console.warn({ title: 'Async error!', message: action.error.data });
  }

  return next(action);
};

const combinedReducer = combineReducers({
  counter: counterReducer,
  [api.reducerPath]: api.reducer,
})

 const rootReducers = (
    state: ReturnType<typeof combinedReducer> | undefined,
    action: AnyAction,
) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
          api.middleware,
          rtkQueryErrorLogger
      )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


