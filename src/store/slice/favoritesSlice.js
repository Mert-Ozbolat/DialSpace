import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
    pending: false,
    error: null
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        setPending: (state, action) => {
            state.pending = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setFavorites, setPending, setError } = favoritesSlice.actions;

export default favoritesSlice.reducer;
