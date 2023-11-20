import { createSlice } from '@reduxjs/toolkit';

import { SLICES, STATISTICS_SLICE } from 'common';

import { RootState } from 'store';

export const statisticsSlice = createSlice({
  name: SLICES.STATISTICS,
  initialState: STATISTICS_SLICE,
  reducers: {
    setStatistics: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setStatistics } = statisticsSlice.actions;
export const selectStatistics = (state: RootState) => state.statisticsReducer;

export default statisticsSlice.reducer;
