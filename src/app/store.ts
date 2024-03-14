import { configureStore } from '@reduxjs/toolkit';
import userSearchReducer from '../features/userSearch/userSearchSlice';
import repositoriesReducer from '../features/repositories/repositoriesSlice';

export const store = configureStore({
  reducer: {
    userSearch: userSearchReducer,
    repositories: repositoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
