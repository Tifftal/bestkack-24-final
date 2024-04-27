import { ActionFromReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { notificationSlice, notificationReducer } from 'store/NotificationSlice/NotificationSlice';
import { userSlice, userReducer } from 'store/UserSlice/UserSlice';
import { navigationReducer, navigationSlice } from './NavigateSlice/NavigationSlice';
import { productReducer, productSlice } from './ProductsSlice/ProductsSlice';
import { createReduxHookFactory } from './createReduxHookFactory';

const initialReducers = {
  [navigationSlice.name]: navigationReducer,
  [userSlice.name]: userReducer,
  [notificationSlice.name]: notificationReducer,
  [productSlice.name]: productReducer,
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