import { configureStore } from '@reduxjs/toolkit';
import { travelSlice } from './TravelSlice';


export const store = configureStore({
  reducer: {
 travel: travelSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch