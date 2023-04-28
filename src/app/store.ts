import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import configDashboardReducer from '../features/configDashboard/configDashboardSlice';
import wizardReducer from '../features/wizard/wizardSlice';
// import logger from 'redux-logger'

export interface DI {
  hello: () => string
}

const di: DI = {
  hello: () => "hello"
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    configDashboard: configDashboardReducer,
    wizard: wizardReducer
  },
  middleware: ( getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: di,
    },
    serializableCheck: false,
  })//.concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
