import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    favorites: [],
    isFavorite: false
}

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload;
            state.isFavorite = true
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
            state.isFavorite = false
        }
    }
})

export const { setFavorites, removeFromFavorites } = favoriteSlice.actions
export default favoriteSlice.reducer