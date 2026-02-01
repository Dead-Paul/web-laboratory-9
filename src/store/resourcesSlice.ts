import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Term {
  word: string;
  meanings: any[];
}

interface ResourcesState {
  term: Term | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ResourcesState = {
  term: null,
  isLoading: false,
  error: null,
};

// Fetch term from dictionary API
export const fetchTerm = createAsyncThunk<Term, { word: string; lang: string }>(
  'resources/fetchTerm',
  async ({ word, lang }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`);
      if (!response.ok) return rejectWithValue('Term not found');
      const data = await response.json();
      return data[0];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    clearTerm: (state) => {
      state.term = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerm.pending, (state) => {
        state.isLoading = true;
        state.term = null;
        state.error = null;
      })
      .addCase(fetchTerm.fulfilled, (state, action: PayloadAction<Term>) => {
        state.isLoading = false;
        state.term = action.payload;
      })
      .addCase(fetchTerm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTerm } = resourcesSlice.actions;
export default resourcesSlice.reducer;
