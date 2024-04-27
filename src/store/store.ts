import { ActionFromReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { createReduxHookFactory } from './createReduxHookFactory';
import { navigationReducer, navigationSlice } from './NavigateSlice/NavigationSlice';

const initialReducers = {
  [navigationSlice.name]: navigationReducer,
}

export const store = configureStore({
  reducer: {
    ...initialReducers
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type RootActions = ActionFromReducersMapObject<typeof initialReducers>;

export const { useStore, useSelector, useDispatch } = createReduxHookFactory<
  RootState,
  RootActions
>();