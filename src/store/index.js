import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slice/contactSlice"
import favoritesSlice from "./slice/favoritesSlice";

const store = configureStore({
    reducer: {
        contacts: contactSlice,
        favorites: favoritesSlice
    }
})
export default store;