import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type headerState = {
  burgerIsVisible: boolean;
};

const initialState: headerState = {
  burgerIsVisible: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setBurgerVisible(state, action: PayloadAction<boolean>) {
      state.burgerIsVisible = action.payload;
    },
  },
});

export const { setBurgerVisible } = headerSlice.actions;
export default headerSlice.reducer;
