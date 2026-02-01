import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlossaryState {
  searchHistory: string[];
}

const initialState: GlossaryState = {
  searchHistory: [],
};

const glossarySlice = createSlice({
  name: 'glossary',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<string>) => {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.unshift(action.payload);
        if (state.searchHistory.length > 10) state.searchHistory.pop();
      }
    },
  },
});

export const { addToHistory } = glossarySlice.actions;
export default glossarySlice.reducer;
