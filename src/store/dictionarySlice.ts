import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTerm = createAsyncThunk(
  'dictionary/fetchTerm',
  async ({ term, lang }: { term: string; lang: string }) => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${term}`
    );
    if (!res.ok) throw new Error('Term not found');
    return await res.json();
  }
);

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    termData: null as any,
    history: [] as string[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTerm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.termData = action.payload[0];
        state.history.unshift(action.payload[0].word);
      })
      .addCase(fetchTerm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Error';
      });
  },
});

export default dictionarySlice.reducer;
