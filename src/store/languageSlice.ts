import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  lang: string;
}

const initialState: LanguageState = {
  lang: 'en', // default English
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
