import { configureStore } from '@reduxjs/toolkit';

import { statisticsReducer } from './slice';

const store = configureStore({
  reducer: {
    statisticsReducer: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
