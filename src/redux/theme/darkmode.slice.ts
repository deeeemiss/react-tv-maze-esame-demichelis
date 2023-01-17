import { createSlice } from "@reduxjs/toolkit";

export type ThemeSlice = {
  themeColor: boolean;
};

export const initialState: ThemeSlice = {
  themeColor: true,
};

export const ThemeSlices = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeColor = !state.themeColor;
    },
  },
});

export const { toggleTheme } = ThemeSlices.actions;
export default ThemeSlices.reducer;
